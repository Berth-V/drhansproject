import proceduresData from "./data/proceduresData";
import "./Procedures.css"; // Importamos estilos

const ProceduresGrid = () => {
  const parts = Object.values(proceduresData);

  return (
    <section className="procedures">
      <h2 className="procedures__title">Explore Procedures</h2>

      <div className="procedures__grid">
        {parts.map((part, index) => (
          <div key={index} className="procedures__card">
            <div className="procedures__icon">
              {/* Aquí irá el icono */}
              <span>Icon</span>
            </div>
            <h3 className="procedures__name">{part.name}</h3>
            <p className="procedures__description">
              {part.procedures[0].description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProceduresGrid;
