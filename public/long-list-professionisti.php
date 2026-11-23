<?php
declare(strict_types=1);

require __DIR__ . '/mailer-helpers.php';

requirePost();
checkHoneypot();

$nome = cleanField($_POST['nome'] ?? '');
$codiceFiscale = cleanField($_POST['codiceFiscale'] ?? '');
$email = cleanField($_POST['email'] ?? '');
$pec = cleanField($_POST['pec'] ?? '');
$telefono = cleanField($_POST['telefono'] ?? '');
$albo = cleanField($_POST['albo'] ?? '');
$areaCompetenza = cleanField($_POST['areaCompetenza'] ?? '');
$anniEsperienza = cleanField($_POST['anniEsperienza'] ?? '');
$cvLink = cleanField($_POST['cvLink'] ?? '');
$sintesi = trim($_POST['sintesi'] ?? '');
$dichiarazione = !empty($_POST['dichiarazione'] ?? '');
$privacy = !empty($_POST['privacy'] ?? '');

if (
    $nome === '' || $codiceFiscale === '' || $pec === '' || $email === '' ||
    $areaCompetenza === '' || $sintesi === ''
) {
    respond(false, 'Compila tutti i campi obbligatori (inclusa la PEC).', 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Indirizzo email non valido.', 422);
}

if (!filter_var($pec, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Indirizzo PEC non valido.', 422);
}

if (!$dichiarazione || !$privacy) {
    respond(false, 'Devi confermare le dichiarazioni richieste per procedere.', 422);
}

$upload = handleDocumentUpload('cv', 'long-list');
if ($upload['error'] !== null) {
    respond(false, $upload['error'], 422);
}

tryInsertSubmission('long_list_submissions', [
    'nome' => $nome,
    'codice_fiscale' => $codiceFiscale,
    'email' => $email,
    'pec' => $pec,
    'telefono' => $telefono !== '' ? $telefono : null,
    'albo' => $albo !== '' ? $albo : null,
    'area_competenza' => $areaCompetenza,
    'anni_esperienza' => $anniEsperienza !== '' ? $anniEsperienza : null,
    'cv_link' => $cvLink !== '' ? $cvLink : null,
    'cv_path' => $upload['path'],
    'sintesi' => $sintesi,
]);

$sent = sendNotificationMail(
    'Nuova iscrizione Long List Professionisti — ' . $nome,
    [
        'Nome e cognome' => $nome,
        'Codice Fiscale' => $codiceFiscale,
        'Email' => $email,
        'PEC' => $pec,
        'Telefono' => $telefono !== '' ? $telefono : '(non indicato)',
        'Albo professionale / titolo di studio' => $albo !== '' ? $albo : '(non indicato)',
        'Area di competenza' => $areaCompetenza,
        'Anni di esperienza' => $anniEsperienza !== '' ? $anniEsperienza : '(non indicati)',
        'Link LinkedIn / portfolio' => $cvLink !== '' ? $cvLink : '(non indicato)',
        'CV allegato' => 'https://enviriahub.it' . $upload['path'],
        "\nSintesi esperienze" => "\n" . $sintesi,
    ],
    $nome,
    $email,
);

if ($sent) {
    respond(true, 'Richiesta di iscrizione inviata correttamente.');
}

respond(false, 'Invio non riuscito. Riprova più tardi o scrivi direttamente a direzione@enviriahub.it.', 500);
