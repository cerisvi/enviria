import './PhotoBand.css'

export default function PhotoBand({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="photo-band">
      <img src={src} alt={alt} loading="lazy" />
    </div>
  )
}
