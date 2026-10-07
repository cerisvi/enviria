import './NetworkCanvas.css'

type Node = { x: number; y: number; r: number; pulse?: boolean }

const nodes: Node[] = [
  { x: 60, y: 420, r: 4 },
  { x: 150, y: 330, r: 5, pulse: true },
  { x: 230, y: 380, r: 3 },
  { x: 320, y: 250, r: 5 },
  { x: 400, y: 300, r: 3 },
  { x: 470, y: 180, r: 6, pulse: true },
  { x: 560, y: 240, r: 4 },
  { x: 640, y: 150, r: 5 },
  { x: 720, y: 210, r: 3 },
  { x: 800, y: 120, r: 6, pulse: true },
  { x: 880, y: 190, r: 4 },
  { x: 960, y: 100, r: 5 },
  { x: 1040, y: 160, r: 3 },
  { x: 1120, y: 90, r: 5, pulse: true },
  { x: 100, y: 150, r: 3 },
  { x: 260, y: 90, r: 3 },
  { x: 610, y: 60, r: 3 },
  { x: 950, y: 220, r: 3 },
]

const links: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 3],
  [3, 4],
  [3, 5],
  [4, 5],
  [5, 6],
  [5, 7],
  [6, 7],
  [7, 8],
  [7, 9],
  [8, 9],
  [9, 10],
  [9, 11],
  [10, 11],
  [11, 12],
  [11, 13],
  [12, 13],
  [1, 14],
  [5, 15],
  [7, 16],
  [10, 17],
]

/** Ridge line astratta (montagna + reti di nodi), ispirata al pittogramma ENVIRIA. */
function ridgePath(baseline: number) {
  const points = [
    [0, baseline],
    [60, baseline],
    [150, 330],
    [230, 380],
    [320, 250],
    [400, 300],
    [470, 180],
    [560, 240],
    [640, 150],
    [720, 210],
    [800, 120],
    [880, 190],
    [960, 100],
    [1040, 160],
    [1120, 90],
    [1200, baseline],
    [1200, 480],
    [0, 480],
  ]
  return 'M ' + points.map(([x, y]) => `${x} ${y}`).join(' L ') + ' Z'
}

export default function NetworkCanvas() {
  return (
    <svg
      className="network-canvas"
      viewBox="0 0 1200 480"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="nc-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.08)" />
        </pattern>
        <linearGradient id="nc-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(15,59,48,0)" />
          <stop offset="100%" stopColor="rgba(8,31,25,0.9)" />
        </linearGradient>
      </defs>

      <rect width="1200" height="480" fill="url(#nc-grid)" />

      <path d={ridgePath(420)} className="network-canvas__ridge" />

      <g className="network-canvas__links">
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
          />
        ))}
      </g>

      <g>
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            className={`network-canvas__node ${n.pulse ? 'is-pulse' : ''}`}
          />
        ))}
      </g>

      <rect width="1200" height="480" fill="url(#nc-fade)" />
    </svg>
  )
}
