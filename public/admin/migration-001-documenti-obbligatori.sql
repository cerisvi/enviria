-- Migrazione da eseguire SOLO SE avevi già importato schema.sql in precedenza
-- (cioè se il database esiste già). Se non hai ancora importato nulla,
-- ignora questo file: schema.sql è già aggiornato con queste colonne.
--
-- Cosa fa: rende la PEC obbligatoria e aggiunge le colonne per i documenti
-- caricati (visura camerale per l'Albo Fornitori, CV per la Long List).
--
-- Da eseguire in phpMyAdmin, scheda "SQL", sul tuo database.

ALTER TABLE albo_fornitori_submissions
  MODIFY pec VARCHAR(255) NOT NULL,
  ADD COLUMN documento_path VARCHAR(255) NULL AFTER descrizione;

ALTER TABLE long_list_submissions
  MODIFY pec VARCHAR(255) NOT NULL,
  ADD COLUMN cv_path VARCHAR(255) NULL AFTER cv_link;
