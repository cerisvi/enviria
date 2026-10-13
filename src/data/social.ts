export type SocialPlatform = 'linkedin' | 'facebook' | 'instagram' | 'youtube' | 'x'

export interface SocialLink {
  platform: SocialPlatform
  url: string
}

/**
 * Collegamenti ai profili social di ENVIRIA.
 * Appena un profilo è pronto, aggiungi qui una riga { platform: '...', url: '...' }:
 * l'icona corrispondente comparirà automaticamente nel footer del sito.
 * Piattaforme supportate: 'linkedin' | 'facebook' | 'instagram' | 'youtube' | 'x'
 */
export const socialLinks: SocialLink[] = []
