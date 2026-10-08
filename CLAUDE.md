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
