<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function respond(bool $success, string $message, int $status = 200): void
{
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Metodo non consentito.', 405);
}

// Honeypot: campo nascosto che un utente umano non compila mai.
if (!empty($_POST['website'] ?? '')) {
    respond(true, 'Richiesta ricevuta.');
}

function cleanField(string $value): string
{
    $value = trim($value);
    // Rimuove ritorni a capo per evitare header injection nelle email.
    return preg_replace('/[\r\n]+/', ' ', $value);
}

$name = cleanField($_POST['name'] ?? '');
$email = cleanField($_POST['email'] ?? '');
$organization = cleanField($_POST['organization'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    respond(false, 'Compila tutti i campi obbligatori.', 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Indirizzo email non valido.', 422);
}

$to = 'direzione@enviriahub.it';
$subject = 'Nuova richiesta dal sito ENVIRIA — ' . $name;

$bodyLines = [
    'Nuova richiesta di contatto dal sito enviriahub.it',
    '',
    'Nome: ' . $name,
    'Email: ' . $email,
    'Ente/organizzazione: ' . ($organization !== '' ? $organization : '(non indicato)'),
    '',
    'Messaggio:',
    $message,
];
$body = implode("\n", $bodyLines);

$fromDomain = 'enviriahub.it';
$headers = [
    'From: ENVIRIA Website <noreply@' . $fromDomain . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    respond(true, 'Richiesta inviata correttamente.');
}

respond(false, 'Invio non riuscito. Riprova più tardi o scrivi direttamente a ' . $to . '.', 500);
