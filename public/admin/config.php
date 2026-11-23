<?php
declare(strict_types=1);

// ============================================================
// CONFIGURAZIONE DATABASE — da compilare con i dati reali
// ============================================================
// Su Shellrent: pannello di gestione hosting → sezione "Database MySQL"
// (crea un database se non esiste ancora, oppure usa quello incluso nel
// piano). Lì trovi Host, Nome database, Utente e Password da copiare qui
// sotto. Non condividere mai questo file pubblicamente.

// ============================================================
// CONFIGURAZIONE EMAIL (SMTP autenticato) — da compilare con i dati reali
// ============================================================
// La funzione PHP mail() da sola spesso non consegna i messaggi in modo
// affidabile sugli hosting condivisi. Le notifiche vengono quindi inviate
// tramite una connessione SMTP autenticata con la casella email reale.
// Parametri Shellrent standard (per caselle con SSL): vedi
// https://guide.shellrent.com/docs/email/configuration/parametri-di-configurazione-della-posta-elettronica
// smtp_host è già compilato (smtp.<tuodominio>); inserisci solo la password
// della casella smtp_user qui sotto.

return [
    'db_host' => 'localhost',
    'db_name' => 'INSERISCI_NOME_DATABASE',
    'db_user' => 'INSERISCI_UTENTE_DATABASE',
    'db_pass' => 'INSERISCI_PASSWORD_DATABASE',

    'smtp_host' => 'smtp.enviriahub.it',
    'smtp_port' => 465,
    'smtp_user' => 'direzione@enviriahub.it',
    'smtp_pass' => 'INSERISCI_PASSWORD_CASELLA_EMAIL',
];
