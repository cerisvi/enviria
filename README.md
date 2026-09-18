# Enviria Hub

Sito web e portale (Hub) di **Enviria**, nato dal progetto di ricerca **Green ERI** —
infrastruttura di ricerca dedicata al monitoraggio ambientale ed energetico.

Dominio di destinazione: **enviriahub.it**

## Stack

- React 19 + TypeScript
- Vite
- React Router
- lucide-react (icone)

## Struttura

- `src/pages/Home.tsx` — homepage pubblica
- `src/pages/About.tsx` — Chi siamo / storia Green ERI → Enviria
- `src/pages/Services.tsx` — Servizi
- `src/pages/Contact.tsx` — Contatti (form dimostrativo, non collegato a un backend email)
- `src/pages/HubLogin.tsx` / `src/pages/HubDashboard.tsx` — area riservata "Hub"
  (autenticazione **dimostrativa**, lato client, da sostituire con un provider di identità
  reale prima del go-live)

## Contenuti

I testi presenti sono contenuti **dimostrativi/placeholder** basati sulle informazioni
disponibili (Enviria come hub nato dal progetto di ricerca Green ERI). Vanno rivisti e
validati con materiali reali (testi definitivi, loghi, dati di contatto, eventuali
partner/enti coinvolti) prima della pubblicazione su enviriahub.it.

## Sviluppo

```bash
npm install
npm run dev      # sviluppo locale
npm run build    # build di produzione
npm run lint      # lint
```
