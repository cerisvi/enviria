<?php
declare(strict_types=1);

require __DIR__ . '/mailer-helpers.php';

requirePost();
checkHoneypot();

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

$sent = sendNotificationMail(
    'Nuova richiesta dal sito ENVIRIA — ' . $name,
    [
        'Nome' => $name,
        'Email' => $email,
        'Ente/organizzazione' => $organization !== '' ? $organization : '(non indicato)',
        "\nMessaggio" => "\n" . $message,
    ],
    $name,
    $email,
);

if ($sent) {
    respond(true, 'Richiesta inviata correttamente.');
}

respond(false, 'Invio non riuscito. Riprova più tardi o scrivi direttamente a direzione@enviriahub.it.', 500);
