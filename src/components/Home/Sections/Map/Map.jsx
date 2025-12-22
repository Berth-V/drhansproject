import './Map.css';
import { useState, useEffect, useRef } from 'react';

export default function Map({ embedSrc, title = 'Mapa' }) {
  const [show, setShow] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!embedSrc) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // comienza a cargar un poco antes de aparecer
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [embedSrc]);

  if (!embedSrc) return null;

  return (
    <div ref={ref} className="map">
      {show && (
        <iframe
          className="map__iframe"
          title={title}
          src={embedSrc}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </div>
  );
}
