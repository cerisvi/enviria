-- Migrazione da eseguire SOLO SE avevi già importato schema.sql (o la
-- migrazione 001) in precedenza. Se non hai ancora importato nulla,
-- ignora questo file: schema.sql è già aggiornato con questa colonna.
--
-- Cosa fa: aggiunge la colonna per il secondo documento richiesto
-- nell'Albo Fornitori (il "Company Profile", oltre alla visura camerale).
--
-- Da eseguire in phpMyAdmin, scheda "SQL", sul tuo database.

ALTER TABLE albo_fornitori_submissions
  ADD COLUMN company_profile_path VARCHAR(255) NULL AFTER documento_path;
