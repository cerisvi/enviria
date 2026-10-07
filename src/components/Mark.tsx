type MarkProps = {
  size?: number
  lineColor?: string
  peakColor?: string
  className?: string
}

/**
 * Ricostruzione vettoriale del pittogramma ENVIRIA (linee guida di marchio):
 * due nodi aperti collegati da un percorso a "montagna" con il nodo di vetta pieno.
 */
export default function Mark({ size = 24, lineColor = '#0F3B30', peakColor = '#3A9D5D', className }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M15 84 L30 84 L52 40 L66 40 L105.70 63.46"
        stroke={lineColor}
        strokeWidth={6}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="10" cy="84" r="9" stroke={lineColor} strokeWidth={6} />
      <circle cx="110" cy="66" r="9" stroke={lineColor} strokeWidth={6} />
      <circle cx="59" cy="26" r="10" fill={peakColor} />
    </svg>
  )
}
