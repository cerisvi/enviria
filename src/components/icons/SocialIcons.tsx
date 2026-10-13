import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function base({ size = 18, ...props }: IconProps) {
  return { width: size, height: size, viewBox: '0 0 24 24', fill: 'currentColor', ...props }
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.84-2.06 3.78-2.06 4.04 0 4.78 2.66 4.78 6.12V21h-4v-5.3c0-1.26-.02-2.88-1.76-2.88-1.76 0-2.03 1.37-2.03 2.79V21h-4V9Z" />
    </svg>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.33C16.33 4.23 15.44 4 14.4 4 12.2 4 10.7 5.33 10.7 7.8v2.7H8.3v3h2.4V21h2.8Z" />
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" />
    </svg>
  )
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M21.6 7.5a2.7 2.7 0 0 0-1.9-1.9C18 5.1 12 5.1 12 5.1s-6 0-7.7.5A2.7 2.7 0 0 0 2.4 7.5 28 28 0 0 0 2 12a28 28 0 0 0 .4 4.5 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.5ZM10 15V9l5.2 3-5.2 3Z" />
    </svg>
  )
}

export function XIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 3h4.3l4 5.5L16 3h4.3l-6.4 8.2L21 21h-4.4l-4.3-5.9L6.3 21H2l6.8-8.7L3 3Z" />
    </svg>
  )
}
