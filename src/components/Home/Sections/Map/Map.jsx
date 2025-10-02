export default function Map({
  embedSrc,              
  title = "Mapa",
  height = 400,
}) {
  if (!embedSrc) return null;

  return (
    <div style={{ position: "relative", height: "70vh", overflow: "hidden", borderRadius: "12px" }}>
      <iframe
        title={title}
        src={embedSrc}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
      />
    </div>
  );
}