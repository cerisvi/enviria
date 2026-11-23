-- Migrazione da eseguire SOLO SE avevi già importato schema.sql (o le
-- migrazioni precedenti) in precedenza. Se non hai ancora importato
-- nulla, ignora questo file: schema.sql è già aggiornato.
--
-- Cosa fa: crea la tabella per le figure chiave della Governance (foto,
-- competenze, CV), gestibili dal pannello e collegate all'organigramma
-- in Chi Siamo.
--
-- Da eseguire in phpMyAdmin, scheda "SQL", sul tuo database.

CREATE TABLE IF NOT EXISTS governance_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  role VARCHAR(255) NOT NULL,
  name VARCHAR(255) NULL,
  photo_path VARCHAR(255) NULL,
  bio TEXT NULL,
  cv_path VARCHAR(255) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO governance_members (slug, role, name, photo_path, bio, cv_path, sort_order) VALUES
  ('responsabile-scientifico', 'Responsabile Scientifico', NULL, NULL, NULL, NULL, 1),
  ('responsabile-amministrativo', 'Responsabile Amministrativo', NULL, NULL, NULL, NULL, 2),
  ('comitato-tecnico-scientifico', 'Comitato Tecnico Scientifico', NULL, NULL, NULL, NULL, 3);
