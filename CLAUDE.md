# ENVIRIA — Design Brief & Convenzioni di Progetto

Sito istituzionale di ENVIRIA S.C.A.R.L., consorzio nato dal progetto di ricerca
G.R.E.E.N – E.R.I. (PR FESR Sicilia 2021-2027). React + TypeScript + Vite,
sito statico, SPA con React Router.

## Obiettivo di conversione

**Azione primaria**: portare enti di ricerca, istituzioni pubbliche e imprese a
**contattare ENVIRIA per proporre una collaborazione**. Ogni pagina interna deve
offrire un percorso chiaro verso il contatto (`/chi-siamo#contatti`), non solo
la navigazione in sequenza tra le pagine tematiche.

**Pubblico target** (in ordine di importanza pari): enti di ricerca/università,
istituzioni pubbliche (Regione Siciliana, assessorati), imprese e PMI.

**Tono/Motion mood**: istituzionale e autorevole. Animazioni misurate, mai
invadenti — fade/slide brevi (~0.5s), nessun effetto vistoso che distragga da
un ente finanziato con fondi pubblici europei. Le transizioni devono guidare
l'attenzione verso le CTA di contatto, non intrattenere fine a sé stesse.

## Design system

**Colori** (contrasto WCAG verificato sui pairing realmente in uso):
- Verde Istituzionale `#0F3B30` — testo su bianco: 12.44:1 (AA pass)
- Verde Natura `#3A9D5D` — solo accenti/sfondi bottone, mai testo su bianco
  (3.41:1, non conforme per testo normale); testo scuro `#06210f` sul bottone
  verde: 5.00:1 (AA pass)
- Blu Dati `#1D4E89` — testo su bianco: 8.39:1 (AA pass)
- Grigio Testo `#4A5553` — testo su bianco: 7.73:1 (AA pass)
- Tinta `#E2EFE5` — sfondo sezioni alternate

**Tipografia**: IBM Plex Serif per i titoli (h1-h3), IBM Plex Sans per il corpo
del testo, via `@fontsource`. Scala definita in `src/index.css` (non
reintrodurre dimensioni ad-hoc nei singoli componenti).

**Componenti**: card con bordo colorato in testa (`.spec-card`), pillar card
nella bento grid della Home, pulsanti pill-shaped (`.btn-primary`/`.btn-outline`).

## Animazioni (`motion` — ex Framer Motion)

- `src/components/Reveal.tsx`: wrapper riusabile per fade-in + slide-up al
  passaggio in viewport (rispetta `prefers-reduced-motion`). Usarlo per ogni
  nuova sezione/card aggiunta a una pagina, con `delay` incrementale per
  elementi in griglia (stagger leggero, `index * 0.06-0.1`).
- Hero della Home: animazione di ingresso sequenziale via `motion.h1`/`motion.p`
  con variants (vedi `Home.tsx`).
- Transizione tra pagine: fade gestito in `App.tsx` con `AnimatePresence`.
- Quando un elemento animato è dentro un grid con `align-items: stretch`
  implicito, ricordarsi `height: 100%` sulla card interna (il wrapper Reveal
  aggiunge un livello in più nell'albero DOM).

## Deploy

- Build statica (`npm run build`) caricata manualmente via File Manager/FTP su
  Shellrent, dentro la document root `www` del dominio `enviriahub.it`.
- Il file `public/.htaccess` è obbligatorio nel caricamento: gestisce il
  fallback SPA per il routing lato client su Apache.
- Zip di produzione: build della cartella `dist/` inclusi i file nascosti
  (`.htaccess`) — attenzione a non escluderli con `zip -x ".*"`.
- Anteprima disponibile anche su GitHub Pages (workflow
  `.github/workflows/deploy-pages.yml`), base path `/enviria/`.
- **Non cancellare mai** `google*.html` / `BingSiteAuth.xml` dalla root `www`
  durante un caricamento (verifica Search Console / Bing Webmaster Tools).

## Sito bilingue (IT/EN) — `src/i18n/useLang.ts`

Il sito è disponibile in italiano (percorsi base, es. `/chi-siamo`) e in
inglese (stesso percorso prefissato da `/en`, es. `/en/chi-siamo`). Non è
usata nessuna libreria i18n esterna: ogni pagina pubblica è registrata una
sola volta in `publicRoutes` in `src/App.tsx` e viene automaticamente
duplicata sotto `/en` da quell'array; `/hub` e `/admin` restano **solo in
italiano** (strumenti interni, non contenuto pubblico).

- `useLang()`: deriva la lingua corrente dal prefisso `/en` nell'URL (nessuno
  stato separato da sincronizzare — la fonte di verità è sempre la URL).
- `useLocalizedPath(base)` / `localizePath(base, lang)`: costruiscono il
  percorso localizzato di un link a partire dal percorso italiano "base".
  Usa `useLocalizedPath` per singoli link nel corpo del componente, e
  `localizePath` (funzione pura, non hook) dentro i `.map()` per rispettare
  le Rules of Hooks.
- `<LanguageSwitcher />` (in `Navbar.tsx`): calcola il percorso equivalente
  nell'altra lingua con `otherLangPath()` e naviga lì, preservando la pagina
  corrente (es. da `/en/chi-siamo/governance/x` torna a
  `/chi-siamo/governance/x`, non alla home).
- **Pattern per tradurre ogni pagina**: in cima al file, un oggetto
  `const content = { it: {...}, en: {...} }` con tutte le stringhe della
  pagina; nel componente, `const t = content[useLang()]` e si usa `t.xxx`
  nel JSX. Per pagine con corpo HTML ricco (liste, tabelle, link inline —
  es. `Trasparenza.tsx`, `PrivacyPolicy.tsx`, `CookiePolicy.tsx`) si usa
  invece `const bodyByLang = { it: <>...</>, en: <>...</> }` fuori dal
  componente.
- `<Seo>` imposta automaticamente `<html lang="it|en">`, i tag
  `hreflang="it"/"en"/"x-default"` e l'`og:locale` corretto a partire dal
  `path` passato (che deve già includere l'eventuale prefisso `/en`).
- **Contenuto gestito dal pannello admin (News, Avvisi, bio Governance,
  nomi/categorie Partner) resta in italiano anche sulla versione inglese**
  (decisione esplicita: evita la gestione di doppie traduzioni nel pannello
  a ogni nuovo inserimento). Solo l'interfaccia fissa della pagina
  (titoli di sezione, etichette, pulsanti, messaggi) è tradotta.
- Le risposte di errore dei form PHP pubblici (`albo-fornitori.php`,
  `long-list-professionisti.php`, `contact.php`) sono in italiano lato
  server. Sulla versione inglese dei form, in caso di errore si mostra un
  messaggio generico inglese pre-tradotto invece del messaggio del server
  (vedi `lang === 'it' ? data.message || t.errorFallback : t.errorFallback`
  in `AlboFornitori.tsx`/`LongListProfessionisti.tsx`/`ChiSiamo.tsx`), così
  l'utente non vede mai un errore in italiano su una pagina inglese.
- `scripts/prerender.mjs` pre-renderizza automaticamente ogni rotta sia in
  italiano sia in inglese (`baseRoutes` + `baseRoutes` con prefisso `/en`).
  `public/sitemap.xml` include entrambe le versioni di ogni pagina con tag
  `xhtml:link rel="alternate" hreflang="..."` incrociati.
- Per aggiungere una nuova pagina pubblica: aggiungila una sola volta a
  `publicRoutes` in `App.tsx` (diventa disponibile in entrambe le lingue
  automaticamente), traducila con il pattern `content.it`/`content.en`,
  aggiungila a `baseRoutes` in `scripts/prerender.mjs` e aggiungi le due
  righe corrispondenti (IT/EN) in `public/sitemap.xml`.

## Pannello di gestione (PHP + MySQL) — `public/admin/` e `public/api/`

Il sito è un'SPA statica, ma **News & Eventi, Partner, Governance (le
figure chiave cliccabili nell'organigramma di Chi Siamo), Avvisi per il
personale e le richieste ricevute dai moduli** (Albo Fornitori, Long List
Professionisti, richiesta Hub) sono gestiti da un pannello admin
PHP + MySQL, non più da file statici in `src/data/`.

- `public/admin/schema.sql`: schema completo + dati di partenza (da
  importare una sola volta nel DB MySQL di Shellrent).
- `public/admin/config.php`: credenziali DB (host/nome/utente/password) —
  **mai committare credenziali reali**, solo i placeholder.
- `public/admin/*.php`: pannello riservato (login, CRUD per ciascuna
  sezione, upload immagini in `public/admin/uploads/`). Protetto da
  login + CSRF token; `robots.txt` esclude `/admin/` e `/api/`.
- `public/api/{news,partners,avvisi,governance}.php`: endpoint pubblici di
  sola lettura in JSON, consumati dal frontend React.
- `src/pages/News.tsx`, `Partner.tsx`, `AvvisiPubblici.tsx`, `ChiSiamo.tsx`
  (organigramma) e `GovernanceDetail.tsx`: al mount fanno `fetch()` verso
  questi endpoint e sostituiscono il contenuto mostrato. **Il contenuto di
  partenza resta quello statico** importato da `src/data/news.ts` /
  `partners.ts` / `governance.ts` (fallback): garantisce che la pagina non
  sia mai vuota per i crawler o se il DB non è ancora configurato. Quando si
  aggiungono/rimuovono news, partner o figure di governance dal pannello,
  questi file statici NON si aggiornano da soli — sono solo lo stato
  "congelato" dell'ultima build e serviranno da sfondo di sicurezza finché
  non vengono rigenerati o sostituiti in un prossimo giro di lavoro.
- **Governance** (`public/admin/governance.php`, tabella
  `governance_members`): ogni figura ha uno `slug` univoco che genera la
  pagina di dettaglio `/chi-siamo/governance/:slug` (foto, descrizione
  sintetica delle competenze, CV scaricabile — come gli "organi di governo"
  di un ateneo). I tre box dell'organigramma in Chi Siamo sono link a
  queste pagine. Nome, foto, bio e CV sono opzionali: se assenti la pagina
  mostra "In aggiornamento" / "Documento in pubblicazione" invece di un
  campo vuoto. Nuove figure aggiunte dal pannello generano uno slug
  automaticamente dal nome o dal ruolo.
- `public/{contact,hub-request,albo-fornitori,long-list-professionisti}.php`
  + `public/mailer-helpers.php`: inviano sempre l'email a
  direzione@enviriahub.it e, se il DB è configurato, salvano **anche** la
  richiesta nel pannello (`tryInsertSubmission`, fallisce in silenzio se il
  DB non è pronto — non deve mai bloccare l'invio email).
- **Limite noto**: il pre-rendering (`npm run prerender`) gira in locale
  senza PHP, quindi le pagine News/Partner/Avvisi pre-renderizzate per i
  crawler mostrano il contenuto di fallback (statico), non quello live dal
  DB. Per aggiornarle davvero serve una nuova build+deploy.
- Dopo l'import di `schema.sql`, l'utente deve creare il primo
  amministratore da `/admin/setup.php` (si disattiva da sola dopo il primo
  utente) e poi eliminare quel file dal server per sicurezza.
