-- Schema del pannello di gestione ENVIRIA — da importare UNA SOLA VOLTA
-- nel database MySQL di Shellrent (tramite phpMyAdmin).
-- Dopo l'importazione, compila public/admin/config.php con le credenziali
-- del database e crea l'utente admin con public/admin/setup.php (vedi istruzioni).

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS login_attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ip_address VARCHAR(64) NOT NULL,
  attempted_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS partner_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS partners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  logo_path VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (category_id) REFERENCES partner_categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  news_date DATE NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT NULL,
  excerpt TEXT NOT NULL,
  body LONGTEXT NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  image_alt VARCHAR(255) NOT NULL,
  gallery_json TEXT NULL,
  links_json TEXT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS avvisi_personale (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  avviso_date DATE NOT NULL,
  body TEXT NOT NULL,
  link VARCHAR(255) NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS albo_fornitori_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ragione_sociale VARCHAR(255) NOT NULL,
  forma_giuridica VARCHAR(100) NOT NULL,
  partita_iva VARCHAR(50) NOT NULL,
  sede_legale VARCHAR(255) NOT NULL,
  pec VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(50) NULL,
  referente VARCHAR(255) NOT NULL,
  categoria VARCHAR(255) NOT NULL,
  descrizione TEXT NULL,
  documento_path VARCHAR(255) NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'nuovo',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS long_list_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  codice_fiscale VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  pec VARCHAR(255) NOT NULL,
  telefono VARCHAR(50) NULL,
  albo VARCHAR(255) NULL,
  area_competenza VARCHAR(255) NOT NULL,
  anni_esperienza VARCHAR(50) NULL,
  cv_link VARCHAR(255) NULL,
  cv_path VARCHAR(255) NULL,
  sintesi TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'nuovo',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS hub_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  organization VARCHAR(255) NULL,
  request_type VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'nuovo',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- DATI INIZIALI (quelli già pubblicati sul sito oggi)
-- ============================================================

INSERT INTO partner_categories (id, title, sort_order) VALUES
  (1, 'Partner istituzionali', 1),
  (2, 'Partner di ricerca', 2),
  (3, 'Partner imprese', 3);

INSERT INTO partners (category_id, name, logo_path, url, sort_order) VALUES
  (1, 'ISPRA — Istituto Superiore per la Protezione e la Ricerca Ambientale', '/admin/uploads/partners/05-ispra.webp', 'https://www.isprambiente.gov.it/it', 1),
  (1, 'Dipartimento dell’Ambiente — Regione Siciliana', '/admin/uploads/partners/06-dipartimento-ambiente.webp', 'https://www.regione.sicilia.it/istituzioni/regione/strutture-regionali/assessorato-territorio-ambiente/dipartimento-ambiente', 2),
  (1, 'ARPA Sicilia — Agenzia Regionale per la Protezione Ambientale', '/admin/uploads/partners/07-arpa-sicilia.webp', 'https://www.arpa.sicilia.it/', 3),
  (1, 'Ordine dei Dottori Agronomi e dei Dottori Forestali di Ragusa', '/admin/uploads/partners/08-ordine-agronomi-ragusa.webp', 'https://www.agronomiragusa.it/', 4),
  (1, 'Parco dell’Etna', '/admin/uploads/partners/09-parco-etna.webp', 'https://parcoetna.it/', 5),
  (1, 'Enoteca Regionale della Sicilia — sede del Sud Est', '/admin/uploads/partners/10-enoteca-regionale-sicilia.webp', 'https://www.enotecasicilia.it/', 6),
  (1, 'GAL Valli del Golfo', '/admin/uploads/partners/11-gal-valli-del-golfo.webp', 'https://www.galvallidelgolfo.com/', 7),
  (2, 'CERISVI', '/admin/uploads/partners/02-cerisvi.webp', 'https://cerisvi.it/', 1),
  (2, 'Università degli Studi di Enna “Kore”', '/admin/uploads/partners/12-unikore.webp', 'https://uke.it/homepage-it', 2),
  (2, 'CSEI Catania — Centro Studi di Economia applicata all’ingegneria', '/admin/uploads/partners/13-csei-catania.webp', 'https://cseicatania.com/home', 3),
  (2, 'GHGMI Italy — Greenhouse Gas Management Institute', '/admin/uploads/partners/14-ghgmi-italy.webp', 'https://ghginstitute.org/', 4),
  (2, 'Fondazione Metes', '/admin/uploads/partners/15-fondazione-metes.webp', 'https://www.fondazionemetes.it/', 5),
  (2, 'Fondazione SOSTAIN Sicilia', '/admin/uploads/partners/16-fondazione-sostain.webp', 'https://www.fondazionesostainsicilia.it/', 6),
  (3, 'Europrosvi', '/admin/uploads/partners/01-europrosvi.webp', 'https://www.europrosvi.it/', 1),
  (3, 'AREA — Sistemi di Innovazione', '/admin/uploads/partners/03-area.webp', 'https://areainnovazione.it/', 2),
  (3, 'Smart Hub', '/admin/uploads/partners/04-smart-hub.webp', 'https://www.smarthubitalia.it/', 3),
  (3, 'Softec S.p.A.', '/admin/uploads/partners/17-softec.webp', 'https://www.softecspa.com/', 4),
  (3, 'Business Integration Partners S.p.A.', '/admin/uploads/partners/18-bip.webp', 'https://www.bip-group.com/', 5),
  (3, 'Deepsensing S.r.l.', '/admin/uploads/partners/19-deepsensing.webp', 'https://deepsensing.it/', 6),
  (3, 'ICT Cube S.r.l.', '/admin/uploads/partners/20-ict-cube.webp', 'https://www.dronipro.it/', 7),
  (3, 'SB Engineering S.r.l.', '/admin/uploads/partners/21-sb-engineering.webp', 'https://www.sbengineering.tech/', 8),
  (3, 'Consorzio di Tutela dei Vini Cerasuolo di Vittoria DOCG e Vittoria DOC', '/admin/uploads/partners/22-consorzio-cerasuolo.webp', 'https://www.cerasuolovittoria.it/', 9);

INSERT INTO news (news_date, title, subtitle, excerpt, body, image_path, image_alt, gallery_json, links_json) VALUES
(
  '2026-10-02',
  'ENVIRIA partecipa a HEYSUN 2026',
  NULL,
  'ENVIRIA ha partecipato alla terza edizione di HEYSUN – Expo della Transizione Energetica, in programma a SiciliaFiera, un appuntamento dedicato alle energie rinnovabili e all’innovazione.',
  'Catania, 1 ottobre 2026 – ENVIRIA partecipa alla terza edizione di HEYSUN – Expo della Transizione Energetica, in programma dal 30 settembre al 2 ottobre a SiciliaFiera.\n\nLa presenza di ENVIRIA si inserisce in un importante appuntamento dedicato alle energie rinnovabili, all’innovazione e alla transizione energetica, che riunisce imprese, istituzioni, università, enti di ricerca e operatori del settore.\n\nAttraverso la partecipazione a HEYSUN, ENVIRIA porta all’interno della manifestazione il proprio impegno nella promozione della ricerca, dell’innovazione e del trasferimento tecnologico, favorendo nuove occasioni di confronto e collaborazione per lo sviluppo sostenibile del territorio siciliano.',
  '/admin/uploads/news/heysun-2026.webp',
  'Relatori ENVIRIA sul palco di HEYSUN 2026, Expo della Transizione Energetica',
  '[{"src":"/admin/uploads/news/heysun-2026-02.webp","alt":"Intervento sul palco HEYSUN 2026 davanti all’allestimento dell’Assessorato regionale delle Attività Produttive"},{"src":"/admin/uploads/news/heysun-2026-03.webp","alt":"Tavola rotonda HEYSUN 2026 con due relatori seduti sul palco"}]',
  '[{"label":"Programma convegni HEYSUN 2026","url":"https://www.heysun.it/programma-convegni-2026/"},{"label":"Sito ufficiale HEYSUN","url":"https://www.heysun.it/"}]'
),
(
  '2026-05-12',
  'ENVIRIA ammessa al finanziamento SORI — PR FESR Sicilia 2021-2027',
  'Con il Decreto del Dirigente Generale n. 1458/5S dell’11 maggio 2026, il Dipartimento delle Attività Produttive della Regione Siciliana ha approvato la graduatoria definitiva di merito dell’Avviso pubblico SORI – “Sicilia Opportunità per la Ricerca e le Infrastrutture”, in attuazione dell’Azione 1.1.4 “Sostegno alle infrastrutture di ricerca” del PR FESR Sicilia 2021-2027.',
  'ENVIRIA è tra i soggetti proponenti ammessi al finanziamento con il progetto G.R.E.E.N – E.R.I., collocato in posizione utile della graduatoria definitiva dell’Avviso pubblico SORI.',
  'ENVIRIA è tra i soggetti proponenti ammessi al finanziamento con il progetto G.R.E.E.N – E.R.I. – Green&Geo, Renewable, Efficiency, Environmental, Node – Environmental Research Infrastructure, collocato in posizione utile della graduatoria definitiva.\n\nGREEN-ERI: un’Infrastruttura di Ricerca distribuita dove HPC, AI Factory e Green Computing convergono al servizio della sovranità computazionale del Mediterraneo. Nel panorama internazionale, GREEN-ERI si distingue per la propria natura ibrida e distribuita. A differenza di altri Green Datacenter, focalizzati prevalentemente sull’efficienza energetica o sulla simulazione climatica globale, GREEN-ERI è concepito come una piattaforma di supercomputazione intelligente a supporto di azioni locali e regionali.\n\nQuesto approccio consente di trasformare i dati ambientali in valore, attraverso catene di elaborazione che spaziano:\n\n• dalla raccolta alla predizione;\n• dalla sorveglianza al controllo attivo;\n• dalla diagnosi precoce alla pianificazione territoriale.\n\nUno dei pilastri fondamentali del progetto è la disponibilità e il trattamento di grandi moli di dati eterogenei — climatici, sensoristici, genetici, geografici e testuali — che alimentano modelli predittivi basati su intelligenza artificiale avanzata. Grazie a questa base informativa, GREEN-ERI potrà addestrare Large Language Models (LLM) e modelli multimodali in grado non solo di generare risposte, ma di derivare e validare orientamenti scientifici e operativi nei domini chiave in cui il centro intende operare:\n\n• gestione delle risorse idriche;\n• protezione della biodiversità;\n• resilienza dei sistemi agricoli;\n• sanità territoriale;\n• sicurezza ambientale.\n\n## Un contesto scientifico globale in rapida evoluzione\n\nGREEN-ERI si inserisce in un contesto scientifico globale caratterizzato da un’evoluzione rapida delle tecnologie di supercalcolo e di intelligenza artificiale applicate all’ambito ambientale. La crescente urgenza legata ai cambiamenti climatici, all’inquinamento, alla desertificazione e agli eventi estremi impone nuove infrastrutture in grado di raccogliere, analizzare e modellare dati ambientali in tempo reale e su scala regionale.\n\nL’ambiente scientifico e tecnologico in cui il progetto si colloca è altamente multidisciplinare e richiede il coordinamento tra scienze del clima, geoinformazione, analisi dei dati, simulazione numerica, intelligenza artificiale, tecnologie edge, sensoristica avanzata, visualizzazione immersiva e sistemi di supporto decisionale (DSS).\n\nA livello europeo sono sempre più diffuse iniziative infrastrutturali legate a reti di osservazione ambientale (LifeWatch ERIC, eLTER RI), a sistemi climatici predittivi (Earth-2 di NVIDIA) e all’high-performance computing (PRACE, oggi confluito in EuroHPC JU). Tuttavia, queste infrastrutture sono concentrate prevalentemente in aree del Centro-Nord Europa, con una minore rappresentanza e specificità per l’area mediterranea — proprio il vuoto che GREEN-ERI intende colmare, restituendo alla Sicilia un ruolo da protagonista nella ricerca ambientale data-driven del bacino del Mediterraneo.',
  '/admin/uploads/news/sori-green-eri.webp',
  'Logo del progetto G.R.E.E.N – E.R.I.',
  NULL,
  '[{"label":"Graduatoria definitiva — Regione Siciliana","url":"https://www.regione.sicilia.it/la-regione-informa/graduatoria-definitiva-merito-istanze-ammissibili-relative-all-avviso-sori"},{"label":"Approfondimento — CERISVI","url":"https://cerisvi.it/it/2026/05/14/s3-campus-2-3-2/"}]'
);
