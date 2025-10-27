import './Map.css';

export default function Map({ embedSrc, title = 'Mapa', height = 400 }) {
  if (!embedSrc) return null;

  return (
    <div className="map" style={{ height: `${height}px` }}>
      <iframe
        className="map__iframe"
        title={title}
        src={embedSrc}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
