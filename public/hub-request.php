<?php
declare(strict_types=1);

require __DIR__ . '/mailer-helpers.php';

requirePost();
checkHoneypot();

$name = cleanField($_POST['name'] ?? '');
$email = cleanField($_POST['email'] ?? '');
$organization = cleanField($_POST['organization'] ?? '');
$requestType = cleanField($_POST['requestType'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $requestType === '' || $message === '') {
    respond(false, 'Compila tutti i campi obbligatori.', 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Indirizzo email non valido.', 422);
}

tryInsertSubmission('hub_requests', [
    'name' => $name,
    'email' => $email,
    'organization' => $organization !== '' ? $organization : null,
    'request_type' => $requestType,
    'message' => $message,
]);

$sent = sendNotificationMail(
    'Richiesta di accesso al Hub — ' . $name,
    [
        'Nome' => $name,
        'Email' => $email,
        'Ente/organizzazione' => $organization !== '' ? $organization : '(non indicato)',
        'Tipo di richiesta' => $requestType,
        "\nMessaggio" => "\n" . $message,
    ],
    $name,
    $email,
);

if ($sent) {
    respond(true, 'Richiesta inviata correttamente.');
}

respond(false, 'Invio non riuscito. Riprova più tardi o scrivi direttamente a direzione@enviriahub.it.', 500);
