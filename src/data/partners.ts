import europrosvi from '../assets/partners/01-europrosvi.webp'
import cerisvi from '../assets/partners/02-cerisvi.webp'
import area from '../assets/partners/03-area.webp'
import smartHub from '../assets/partners/04-smart-hub.webp'
import ispra from '../assets/partners/05-ispra.webp'
import dipartimentoAmbiente from '../assets/partners/06-dipartimento-ambiente.webp'
import arpaSicilia from '../assets/partners/07-arpa-sicilia.webp'
import ordineAgronomiRagusa from '../assets/partners/08-ordine-agronomi-ragusa.webp'
import parcoEtna from '../assets/partners/09-parco-etna.webp'
import enotecaRegionaleSicilia from '../assets/partners/10-enoteca-regionale-sicilia.webp'
import galValliDelGolfo from '../assets/partners/11-gal-valli-del-golfo.webp'
import unikore from '../assets/partners/12-unikore.webp'
import cseiCatania from '../assets/partners/13-csei-catania.webp'
import ghgmiItaly from '../assets/partners/14-ghgmi-italy.webp'
import fondazioneMetes from '../assets/partners/15-fondazione-metes.webp'
import fondazioneSostain from '../assets/partners/16-fondazione-sostain.webp'
import softec from '../assets/partners/17-softec.webp'
import bip from '../assets/partners/18-bip.webp'
import deepsensing from '../assets/partners/19-deepsensing.webp'
import ictCube from '../assets/partners/20-ict-cube.webp'
import sbEngineering from '../assets/partners/21-sb-engineering.webp'
import consorzioCerasuolo from '../assets/partners/22-consorzio-cerasuolo.webp'

export interface Partner {
  name: string
  logo: string
  url: string
}

export interface PartnerCategory {
  title: string
  partners: Partner[]
}

/**
 * Per aggiungere un nuovo partner in futuro:
 * 1. metti il file logo (preferibilmente .webp, sfondo trasparente o bianco) in src/assets/partners/
 * 2. importalo qui sopra
 * 3. aggiungi un oggetto { name, logo, url } nella categoria giusta qui sotto
 *    (o crea una nuova categoria con lo stesso formato)
 */
export const partnerCategories: PartnerCategory[] = [
  {
    title: 'Partner interni',
    partners: [
      { name: 'Europrosvi', logo: europrosvi, url: 'https://www.europrosvi.it/' },
      { name: 'CERISVI', logo: cerisvi, url: 'https://cerisvi.it/' },
      { name: 'AREA — Sistemi di Innovazione', logo: area, url: 'https://areainnovazione.it/' },
      { name: 'Smart Hub', logo: smartHub, url: 'https://www.smarthubitalia.it/' },
    ],
  },
  {
    title: 'Partner istituzionali',
    partners: [
      {
        name: 'ISPRA — Istituto Superiore per la Protezione e la Ricerca Ambientale',
        logo: ispra,
        url: 'https://www.isprambiente.gov.it/it',
      },
      {
        name: 'Dipartimento dell’Ambiente — Regione Siciliana',
        logo: dipartimentoAmbiente,
        url: 'https://www.regione.sicilia.it/istituzioni/regione/strutture-regionali/assessorato-territorio-ambiente/dipartimento-ambiente',
      },
      {
        name: 'ARPA Sicilia — Agenzia Regionale per la Protezione Ambientale',
        logo: arpaSicilia,
        url: 'https://www.arpa.sicilia.it/',
      },
      {
        name: 'Ordine dei Dottori Agronomi e dei Dottori Forestali di Ragusa',
        logo: ordineAgronomiRagusa,
        url: 'https://www.agronomiragusa.it/',
      },
      { name: 'Parco dell’Etna', logo: parcoEtna, url: 'https://parcoetna.it/' },
      {
        name: 'Enoteca Regionale della Sicilia — sede del Sud Est',
        logo: enotecaRegionaleSicilia,
        url: 'https://www.enotecasicilia.it/',
      },
      { name: 'GAL Valli del Golfo', logo: galValliDelGolfo, url: 'https://www.galvallidelgolfo.com/' },
    ],
  },
  {
    title: 'Partner di ricerca',
    partners: [
      { name: 'Università degli Studi di Enna “Kore”', logo: unikore, url: 'https://uke.it/homepage-it' },
      {
        name: 'CSEI Catania — Centro Studi di Economia applicata all’ingegneria',
        logo: cseiCatania,
        url: 'https://cseicatania.com/home',
      },
      {
        name: 'GHGMI Italy — Greenhouse Gas Management Institute',
        logo: ghgmiItaly,
        url: 'https://ghginstitute.org/',
      },
      { name: 'Fondazione Metes', logo: fondazioneMetes, url: 'https://www.fondazionemetes.it/' },
      { name: 'Fondazione SOSTAIN Sicilia', logo: fondazioneSostain, url: 'https://www.fondazionesostainsicilia.it/' },
    ],
  },
  {
    title: 'Partner imprese',
    partners: [
      { name: 'Softec S.p.A.', logo: softec, url: 'https://www.softecspa.com/' },
      { name: 'Business Integration Partners S.p.A.', logo: bip, url: 'https://www.bip-group.com/' },
      { name: 'Deepsensing S.r.l.', logo: deepsensing, url: 'https://deepsensing.it/' },
      { name: 'ICT Cube S.r.l.', logo: ictCube, url: 'https://www.dronipro.it/' },
      { name: 'SB Engineering S.r.l.', logo: sbEngineering, url: 'https://www.sbengineering.tech/' },
      {
        name: 'Consorzio di Tutela dei Vini Cerasuolo di Vittoria DOCG e Vittoria DOC',
        logo: consorzioCerasuolo,
        url: 'https://www.cerasuolovittoria.it/',
      },
    ],
  },
]
