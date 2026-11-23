export interface GovernanceMember {
  slug: string
  role: string
  name: string | null
  photo: string | null
  bio: string | null
  cv: string | null
}

/**
 * Figure chiave della Governance mostrate nell'organigramma di "Chi Siamo".
 * Contenuto di base (incluso nell'ultima build): garantisce che la sezione
 * non sia mai vuota per i crawler o se il pannello di gestione non è ancora
 * configurato. Le informazioni reali (nome, foto, competenze, CV) si
 * aggiornano dal pannello di amministrazione in "Governance".
 */
export const governanceMembers: GovernanceMember[] = [
  {
    slug: 'responsabile-scientifico',
    role: 'Responsabile Scientifico',
    name: null,
    photo: null,
    bio: null,
    cv: null,
  },
  {
    slug: 'responsabile-amministrativo',
    role: 'Responsabile Amministrativo',
    name: null,
    photo: null,
    bio: null,
    cv: null,
  },
  {
    slug: 'comitato-tecnico-scientifico',
    role: 'Comitato Tecnico Scientifico',
    name: null,
    photo: null,
    bio: null,
    cv: null,
  },
]
