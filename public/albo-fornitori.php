<?php
declare(strict_types=1);

require __DIR__ . '/mailer-helpers.php';

requirePost();
checkHoneypot();

$ragioneSociale = cleanField($_POST['ragioneSociale'] ?? '');
$formaGiuridica = cleanField($_POST['formaGiuridica'] ?? '');
$partitaIva = cleanField($_POST['partitaIva'] ?? '');
$sedeLegale = cleanField($_POST['sedeLegale'] ?? '');
$pec = cleanField($_POST['pec'] ?? '');
$email = cleanField($_POST['email'] ?? '');
$telefono = cleanField($_POST['telefono'] ?? '');
$referente = cleanField($_POST['referente'] ?? '');
$categoria = cleanField($_POST['categoria'] ?? '');
$descrizione = trim($_POST['descrizione'] ?? '');
$dichiarazione = !empty($_POST['dichiarazione'] ?? '');
$privacy = !empty($_POST['privacy'] ?? '');

if (
    $ragioneSociale === '' || $formaGiuridica === '' || $partitaIva === '' ||
    $sedeLegale === '' || $email === '' || $referente === '' || $categoria === ''
) {
    respond(false, 'Compila tutti i campi obbligatori.', 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Indirizzo email non valido.', 422);
}

if (!$dichiarazione || !$privacy) {
    respond(false, 'Devi confermare le dichiarazioni richieste per procedere.', 422);
}

tryInsertSubmission('albo_fornitori_submissions', [
    'ragione_sociale' => $ragioneSociale,
    'forma_giuridica' => $formaGiuridica,
    'partita_iva' => $partitaIva,
    'sede_legale' => $sedeLegale,
    'pec' => $pec !== '' ? $pec : null,
    'email' => $email,
    'telefono' => $telefono !== '' ? $telefono : null,
    'referente' => $referente,
    'categoria' => $categoria,
    'descrizione' => $descrizione !== '' ? $descrizione : null,
]);

$sent = sendNotificationMail(
    'Nuova iscrizione Albo Fornitori — ' . $ragioneSociale,
    [
        'Ragione sociale' => $ragioneSociale,
        'Forma giuridica' => $formaGiuridica,
        'Partita IVA / Codice Fiscale' => $partitaIva,
        'Sede legale' => $sedeLegale,
        'PEC' => $pec !== '' ? $pec : '(non indicata)',
        'Email' => $email,
        'Telefono' => $telefono !== '' ? $telefono : '(non indicato)',
        'Referente / Legale rappresentante' => $referente,
        'Categoria merceologica' => $categoria,
        "\nDescrizione attività" => "\n" . ($descrizione !== '' ? $descrizione : '(non indicata)'),
    ],
    $ragioneSociale,
    $email,
);

if ($sent) {
    respond(true, 'Richiesta di iscrizione inviata correttamente.');
}

respond(false, 'Invio non riuscito. Riprova più tardi o scrivi direttamente a direzione@enviriahub.it.', 500);
