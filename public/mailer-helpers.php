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
function checkHoneypot(string $field = 'website'): void
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

/**
 * @param array<string, string> $fields Coppie etichetta => valore da elencare nel corpo email.
 */
function sendNotificationMail(string $subject, array $fields, string $replyToName, string $replyToEmail): bool
{
    $to = 'direzione@enviriahub.it';
    $fromDomain = 'enviriahub.it';

    $bodyLines = [];
    foreach ($fields as $label => $value) {
        $bodyLines[] = $label . ': ' . $value;
    }
    $body = implode("\n", $bodyLines);

    $headers = [
        'From: ENVIRIA Website <noreply@' . $fromDomain . '>',
        'Reply-To: ' . $replyToName . ' <' . $replyToEmail . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
    ];

    return mail($to, $subject, $body, implode("\r\n", $headers));
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
