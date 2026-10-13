import soriGreenEri from '../assets/news/sori-green-eri.webp'
import heysun2026 from '../assets/news/heysun-2026.webp'
import heysun202602 from '../assets/news/heysun-2026-02.webp'
import heysun202603 from '../assets/news/heysun-2026-03.webp'

export interface NewsGalleryImage {
  src: string
  alt: string
}

export interface NewsLink {
  label: string
  url: string
}

export interface NewsItem {
  /** formato ISO (AAAA-MM-GG), usato anche per l'ordinamento */
  date: string
  title: string
  /** sottotitolo/occhiello facoltativo, mostrato sopra il corpo della notizia */
  subtitle?: string
  /** breve riassunto mostrato nella card prima di espandere */
  excerpt: string
  /**
   * corpo della notizia: un array di paragrafi.
   * - una riga che inizia con "## " diventa un sottotitolo
   * - righe consecutive che iniziano con "• " diventano un elenco puntato
   */
  body: string[]
  image: string
  imageAlt: string
  /** foto aggiuntive, mostrate in una piccola galleria quando la notizia è espansa */
  gallery?: NewsGalleryImage[]
  links?: NewsLink[]
}

/**
 * Per aggiungere una nuova news/evento in futuro:
 * 1. metti la foto (preferibilmente .webp) in src/assets/news/
 * 2. importala qui sopra
 * 3. aggiungi un oggetto in cima all'array qui sotto (ordine più recente prima,
 *    ma l'ordinamento per data è comunque automatico nella pagina News)
 */
export const newsItems: NewsItem[] = [
  {
    date: '2026-10-02',
    title: 'ENVIRIA partecipa a HEYSUN 2026',
    excerpt:
      'ENVIRIA ha partecipato alla terza edizione di HEYSUN – Expo della Transizione Energetica, in programma a SiciliaFiera, un appuntamento dedicato alle energie rinnovabili e all’innovazione.',
    body: [
      'Catania, 1 ottobre 2026 – ENVIRIA partecipa alla terza edizione di HEYSUN – Expo della Transizione Energetica, in programma dal 30 settembre al 2 ottobre a SiciliaFiera.',
      'La presenza di ENVIRIA si inserisce in un importante appuntamento dedicato alle energie rinnovabili, all’innovazione e alla transizione energetica, che riunisce imprese, istituzioni, università, enti di ricerca e operatori del settore.',
      'Attraverso la partecipazione a HEYSUN, ENVIRIA porta all’interno della manifestazione il proprio impegno nella promozione della ricerca, dell’innovazione e del trasferimento tecnologico, favorendo nuove occasioni di confronto e collaborazione per lo sviluppo sostenibile del territorio siciliano.',
    ],
    image: heysun2026,
    imageAlt: 'Relatori ENVIRIA sul palco di HEYSUN 2026, Expo della Transizione Energetica',
    gallery: [
      {
        src: heysun202602,
        alt: 'Intervento sul palco HEYSUN 2026 davanti all’allestimento dell’Assessorato regionale delle Attività Produttive',
      },
      {
        src: heysun202603,
        alt: 'Tavola rotonda HEYSUN 2026 con due relatori seduti sul palco',
      },
    ],
    links: [
      { label: 'Programma convegni HEYSUN 2026', url: 'https://www.heysun.it/programma-convegni-2026/' },
      { label: 'Sito ufficiale HEYSUN', url: 'https://www.heysun.it/' },
    ],
  },
  {
    date: '2026-05-12',
    title: 'ENVIRIA ammessa al finanziamento SORI — PR FESR Sicilia 2021-2027',
    subtitle:
      'Con il Decreto del Dirigente Generale n. 1458/5S dell’11 maggio 2026, il Dipartimento delle Attività Produttive della Regione Siciliana ha approvato la graduatoria definitiva di merito dell’Avviso pubblico SORI – “Sicilia Opportunità per la Ricerca e le Infrastrutture”, in attuazione dell’Azione 1.1.4 “Sostegno alle infrastrutture di ricerca” del PR FESR Sicilia 2021-2027.',
    excerpt:
      'ENVIRIA è tra i soggetti proponenti ammessi al finanziamento con il progetto G.R.E.E.N – E.R.I., collocato in posizione utile della graduatoria definitiva dell’Avviso pubblico SORI.',
    body: [
      'ENVIRIA è tra i soggetti proponenti ammessi al finanziamento con il progetto G.R.E.E.N – E.R.I. – Green&Geo, Renewable, Efficiency, Environmental, Node – Environmental Research Infrastructure, collocato in posizione utile della graduatoria definitiva.',
      'GREEN-ERI: un’Infrastruttura di Ricerca distribuita dove HPC, AI Factory e Green Computing convergono al servizio della sovranità computazionale del Mediterraneo. Nel panorama internazionale, GREEN-ERI si distingue per la propria natura ibrida e distribuita. A differenza di altri Green Datacenter, focalizzati prevalentemente sull’efficienza energetica o sulla simulazione climatica globale, GREEN-ERI è concepito come una piattaforma di supercomputazione intelligente a supporto di azioni locali e regionali.',
      'Questo approccio consente di trasformare i dati ambientali in valore, attraverso catene di elaborazione che spaziano:',
      '• dalla raccolta alla predizione;',
      '• dalla sorveglianza al controllo attivo;',
      '• dalla diagnosi precoce alla pianificazione territoriale.',
      'Uno dei pilastri fondamentali del progetto è la disponibilità e il trattamento di grandi moli di dati eterogenei — climatici, sensoristici, genetici, geografici e testuali — che alimentano modelli predittivi basati su intelligenza artificiale avanzata. Grazie a questa base informativa, GREEN-ERI potrà addestrare Large Language Models (LLM) e modelli multimodali in grado non solo di generare risposte, ma di derivare e validare orientamenti scientifici e operativi nei domini chiave in cui il centro intende operare:',
      '• gestione delle risorse idriche;',
      '• protezione della biodiversità;',
      '• resilienza dei sistemi agricoli;',
      '• sanità territoriale;',
      '• sicurezza ambientale.',
      '## Un contesto scientifico globale in rapida evoluzione',
      'GREEN-ERI si inserisce in un contesto scientifico globale caratterizzato da un’evoluzione rapida delle tecnologie di supercalcolo e di intelligenza artificiale applicate all’ambito ambientale. La crescente urgenza legata ai cambiamenti climatici, all’inquinamento, alla desertificazione e agli eventi estremi impone nuove infrastrutture in grado di raccogliere, analizzare e modellare dati ambientali in tempo reale e su scala regionale.',
      'L’ambiente scientifico e tecnologico in cui il progetto si colloca è altamente multidisciplinare e richiede il coordinamento tra scienze del clima, geoinformazione, analisi dei dati, simulazione numerica, intelligenza artificiale, tecnologie edge, sensoristica avanzata, visualizzazione immersiva e sistemi di supporto decisionale (DSS).',
      'A livello europeo sono sempre più diffuse iniziative infrastrutturali legate a reti di osservazione ambientale (LifeWatch ERIC, eLTER RI), a sistemi climatici predittivi (Earth-2 di NVIDIA) e all’high-performance computing (PRACE, oggi confluito in EuroHPC JU). Tuttavia, queste infrastrutture sono concentrate prevalentemente in aree del Centro-Nord Europa, con una minore rappresentanza e specificità per l’area mediterranea — proprio il vuoto che GREEN-ERI intende colmare, restituendo alla Sicilia un ruolo da protagonista nella ricerca ambientale data-driven del bacino del Mediterraneo.',
    ],
    image: soriGreenEri,
    imageAlt: 'Logo del progetto G.R.E.E.N – E.R.I.',
    links: [
      {
        label: 'Graduatoria definitiva — Regione Siciliana',
        url: 'https://www.regione.sicilia.it/la-regione-informa/graduatoria-definitiva-merito-istanze-ammissibili-relative-all-avviso-sori',
      },
      { label: 'Approfondimento — CERISVI', url: 'https://cerisvi.it/it/2026/05/14/s3-campus-2-3-2/' },
    ],
  },
]
