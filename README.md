# ENVIRIA — Infrastruttura di Ricerca Green ERI

Sito web di **ENVIRIA S.C.A.R.L.**, la società consortile costituita per realizzare e
gestire l'infrastruttura di ricerca del progetto **G.R.E.E.N – E.R.I.** (PR FESR Sicilia
2021-2027): Green Data Center, laboratori tematici e rete di monitoraggio ambientale.

Dominio di destinazione: **enviriahub.it**

## Stack

- React 19 + TypeScript
- Vite
- React Router
- lucide-react (icone)
- @fontsource/ibm-plex-serif, @fontsource/ibm-plex-sans (font da linee guida di marchio)

## Struttura

- `src/pages/Home.tsx` — homepage pubblica (hero, i tre pilastri, numeri di sintesi)
- `src/pages/Progetto.tsx` — Il Progetto Green ERI: obiettivi realizzativi e i quattro
  laboratori tematici (GeoSense, GeoAI, GeoTwin, GeoDSS)
- `src/pages/AiDataCenter.tsx` — AI Data Center: HPC e Green Computing (fotovoltaico,
  raffreddamento a liquido, prefabbricato in legno)
- `src/pages/FilieraDelDato.tsx` — La Filiera del Dato Ambientale: raccolta, elaborazione,
  analisi & AI, Open Science
- `src/pages/ChiSiamo.tsx` — Chi Siamo & Network: il consorzio, i partner di ricerca,
  contatti (form dimostrativo, non collegato a un backend email)
- `src/pages/HubLogin.tsx` / `src/pages/HubDashboard.tsx` — area riservata "Hub"
  (autenticazione **dimostrativa**, lato client, da sostituire con un provider di identità
  reale prima del go-live)
- `src/components/Mark.tsx` — ricostruzione vettoriale del pittogramma di marchio
- `src/components/NetworkCanvas.tsx` — grafica astratta "rete di nodi" per l'hero,
  ispirata al pittogramma ENVIRIA (nessuna immagine/video esterno)
- `src/assets/brand/` — loghi ufficiali SVG (kit di marchio)

## Brand

Palette, font e loghi provengono dal kit di marchio ufficiale ENVIRIA (Verde Istituzionale
`#0F3B30`, Verde Natura `#3A9D5D`, Blu Dati `#1D4E89`, Tinta `#E2EFE5`, Grigio Testo
`#4A5553`; IBM Plex Serif per i titoli, IBM Plex Sans per i testi).

## Contenuti

I testi di progetto (obiettivi, laboratori, infrastruttura) sono una sintesi ricavata dai
documenti di progetto forniti (OR-WP Green ERI), **senza importi di budget**. Dati di
contatto: `direzione@enviriahub.it`. Mancano ancora: indirizzo sede legale, P.IVA/C.F. e
l'elenco completo dei partner di rete — da integrare con i materiali ufficiali definitivi
prima della pubblicazione.

## Sviluppo

```bash
npm install
npm run dev      # sviluppo locale
npm run build    # build di produzione
npm run lint      # lint
```
