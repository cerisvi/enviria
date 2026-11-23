<?php
declare(strict_types=1);

// Funzioni condivise dai moduli PHP del sito (contatti, richiesta Hub,
// iscrizione Albo Fornitori, iscrizione Long List Professionisti).

header('Content-Type: application/json; charset=utf-8');

function respond(bool $success, string $message, int $status = 200): void
{
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

function requirePost(): void
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        respond(false, 'Metodo non consentito.', 405);
    }
}

// Honeypot: campo nascosto che un utente umano non compila mai.
function checkHoneypot(string $field = 'hpcheck'): void
{
    if (!empty($_POST[$field] ?? '')) {
        respond(true, 'Richiesta ricevuta.');
    }
}

function cleanField(string $value): string
{
    $value = trim($value);
    // Rimuove ritorni a capo per evitare header injection nelle email.
    return preg_replace('/[\r\n]+/', ' ', $value);
}

function mimeEncodeHeader(string $text): string
{
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

/**
 * Invia una email tramite connessione SMTP autenticata (porta 465,
 * SSL/TLS), usando le credenziali in public/admin/config.php.
 *
 * Usiamo una connessione SMTP autenticata, anziché la funzione PHP
 * mail(), perché su molti hosting condivisi mail() restituisce "successo"
 * anche quando il messaggio non viene mai consegnato (nessun errore
 * visibile, nessuna email nello spam): è un fallimento silenzioso che
 * mail() non permette di diagnosticare né evitare. Una connessione SMTP
 * autenticata con una casella realmente esistente del dominio è il
 * metodo più affidabile sugli hosting condivisi.
 */
function smtpSend(string $to, string $subject, string $body, string $fromName, string $replyToName, string $replyToEmail): bool
{
    $configFile = __DIR__ . '/admin/config.php';
    if (!file_exists($configFile)) {
        return false;
    }

    $config = require $configFile;
    $host = $config['smtp_host'] ?? '';
    $port = (int) ($config['smtp_port'] ?? 465);
    $user = $config['smtp_user'] ?? '';
    $pass = $config['smtp_pass'] ?? '';

    $logFile = __DIR__ . '/admin/smtp-debug.log';
    $log = function (string $line) use ($logFile): void {
        @file_put_contents($logFile, date('c') . ' - ' . $line . "\n", FILE_APPEND);
    };

    if ($host === '' || $user === '' || $pass === '') {
        $log('Configurazione SMTP incompleta (host/user/pass mancanti in config.php).');
        return false;
    }

    $socket = @stream_socket_client(
        'ssl://' . $host . ':' . $port,
        $errno,
        $errstr,
        10,
        STREAM_CLIENT_CONNECT,
    );
    if ($socket === false) {
        $log("Connessione a ssl://{$host}:{$port} fallita — errno={$errno} errstr={$errstr}");
        return false;
    }
    stream_set_timeout($socket, 10);

    $expect = function (string $expectedCode) use ($socket, $log, $to): bool {
        $line = '';
        do {
            $line = fgets($socket, 515);
            if ($line === false) {
                $log('Nessuna risposta dal server (timeout o connessione chiusa).');
                return false;
            }
        } while (isset($line[3]) && $line[3] === '-');
        $ok = str_starts_with($line, $expectedCode);
        if (!$ok) {
            $log("Risposta inattesa: atteso {$expectedCode}, ricevuto \"" . trim($line) . '"');
        }
        return $ok;
    };
    $send = function (string $line) use ($socket): void {
        fwrite($socket, $line . "\r\n");
    };

    $steps = [
        [null, '220', 'greeting'],
        ['EHLO ' . (parse_url('http://' . $host, PHP_URL_HOST) ?: $host), '250', 'EHLO'],
        ['AUTH LOGIN', '334', 'AUTH LOGIN'],
        [base64_encode($user), '334', 'invio username'],
        [base64_encode($pass), '235', 'invio password'],
        ['MAIL FROM:<' . $user . '>', '250', 'MAIL FROM'],
        ['RCPT TO:<' . $to . '>', '250', 'RCPT TO'],
        ['DATA', '354', 'DATA'],
    ];

    $ok = true;
    foreach ($steps as [$line, $expectedCode, $stepName]) {
        if ($line !== null) {
            $send($line);
        }
        if (!$expect($expectedCode)) {
            $log("Fallito allo step: {$stepName}");
            $ok = false;
            break;
        }
    }

    if ($ok) {
        $headers = [
            'From: ' . mimeEncodeHeader($fromName) . ' <' . $user . '>',
            'Reply-To: ' . mimeEncodeHeader($replyToName) . ' <' . $replyToEmail . '>',
            'To: <' . $to . '>',
            'Subject: ' . mimeEncodeHeader($subject),
            'Date: ' . date('r'),
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
        ];
        // Dot-stuffing: una riga che inizia con "." va raddoppiata, altrimenti
        // il server SMTP la interpreterebbe come terminatore del messaggio.
        $escapedBody = preg_replace('/^\./m', '..', $body);
        $send(implode("\r\n", $headers) . "\r\n\r\n" . $escapedBody . "\r\n.");
        $ok = $expect('250');
    }

    $send('QUIT');
    fclose($socket);

    return $ok;
}

/**
 * @param array<string, string> $fields Coppie etichetta => valore da elencare nel corpo email.
 */
function sendNotificationMail(string $subject, array $fields, string $replyToName, string $replyToEmail): bool
{
    $to = 'direzione@enviriahub.it';

    $bodyLines = [];
    foreach ($fields as $label => $value) {
        $bodyLines[] = $label . ': ' . $value;
    }
    $body = implode("\n", $bodyLines);

    return smtpSend($to, $subject, $body, 'ENVIRIA Website', $replyToName, $replyToEmail);
}

/**
 * Gestisce il caricamento di un documento (visura camerale, CV, ecc.)
 * allegato a un modulo pubblico. Salva il file in una sottocartella di
 * public/admin/uploads/ e restituisce il percorso pubblico da memorizzare,
 * oppure un messaggio d'errore se qualcosa non va.
 *
 * @return array{path: ?string, error: ?string}
 */
function handleDocumentUpload(string $fieldName, string $subfolder): array
{
    $file = $_FILES[$fieldName] ?? null;

    if (!$file || ($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return ['path' => null, 'error' => 'Carica il documento richiesto.'];
    }

    if ($file['error'] !== UPLOAD_ERR_OK) {
        return ['path' => null, 'error' => 'Caricamento del file non riuscito. Riprova.'];
    }

    $maxBytes = 8 * 1024 * 1024; // 8 MB
    if ($file['size'] > $maxBytes) {
        return ['path' => null, 'error' => 'Il file supera la dimensione massima consentita (8 MB).'];
    }

    $allowedExt = ['pdf', 'doc', 'docx'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $allowedExt, true)) {
        return ['path' => null, 'error' => 'Formato file non supportato (usa PDF, DOC o DOCX).'];
    }

    $uploadDir = __DIR__ . '/admin/uploads/' . $subfolder;
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $filename = $subfolder . '-' . time() . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
    if (!move_uploaded_file($file['tmp_name'], $uploadDir . '/' . $filename)) {
        return ['path' => null, 'error' => 'Impossibile salvare il file. Riprova.'];
    }

    return ['path' => '/admin/uploads/' . $subfolder . '/' . $filename, 'error' => null];
}

/**
 * Salva la richiesta anche nel database del pannello di gestione, se il
 * database è stato configurato (public/admin/config.php compilato e
 * schema.sql importato). Se il database non è ancora pronto, la richiesta
 * viene comunque inviata via email: questa funzione fallisce in silenzio
 * per non bloccare l'invio del modulo.
 *
 * @param array<string, mixed> $columns Coppie nome_colonna => valore.
 */
function tryInsertSubmission(string $table, array $columns): void
{
    $dbFile = __DIR__ . '/admin/db.php';
    if (!file_exists($dbFile)) {
        return;
    }

    try {
        require_once $dbFile;
        $pdo = getDb();
        $cols = array_keys($columns);
        $placeholders = implode(',', array_fill(0, count($cols), '?'));
        $sql = 'INSERT INTO ' . $table . ' (' . implode(',', $cols) . ') VALUES (' . $placeholders . ')';
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array_values($columns));
    } catch (Throwable $e) {
        // Database non ancora configurato o non raggiungibile: la richiesta
        // è comunque arrivata via email, quindi non interrompiamo nulla.
    }
}
