
import React, { useState } from "react";
import "./Pregunta3.css";

const sintomasDisponibles = [
  { id: "s1", texto: "sensibilidad", enfermedad: "queratocono" },
  { id: "s2", texto: "ojos rojos", enfermedad: "conjuntivitis" },
  { id: "s3", texto: "visión borrosa", enfermedad: "glaucoma" },
];

const enfermedades = ["queratocono", "conjuntivitis", "glaucoma"];

const Pregunta3 = ({ onRespuesta }) => {
  const [asignaciones, setAsignaciones] = useState({
    queratocono: null,
    conjuntivitis: null,
    glaucoma: null,
  });

  const [draggedSymptom, setDraggedSymptom] = useState(null);

  const manejarDragStart = (sintoma) => {
    setDraggedSymptom(sintoma);
  };

  const manejarDrop = (enfermedad) => {
    if (draggedSymptom) {
      setAsignaciones((prev) => ({
        ...prev,
        [enfermedad]: draggedSymptom,
      }));
      setDraggedSymptom(null);
    }
  };

  const manejarConfirmar = () => {
    let correctas = 0;
    enfermedades.forEach((enf) => {
      if (
        asignaciones[enf] &&
        asignaciones[enf].enfermedad === enf
      ) {
        correctas++;
      }
    });

    const puntuacion = correctas / 3;
    onRespuesta(puntuacion);
  };

  return (
    <div className="pregunta3">
      <h2>Arrastra cada síntoma a la enfermedad a la que pertenece</h2>
      <div className="sintomas-drag">
        {sintomasDisponibles.map((sintoma) => (
          <div
            key={sintoma.id}
            draggable
            onDragStart={() => manejarDragStart(sintoma)}
            className="sintoma"
          >
            {sintoma.texto}
          </div>
        ))}
      </div>

      <div className="contenedor-enfermedades">
        {enfermedades.map((enf) => (
          <div
            key={enf}
            className="drop-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => manejarDrop(enf)}
          >
            <strong>{enf}:</strong>{" "}
            <span className="cuadro-sintoma">
              {asignaciones[enf]?.texto || "______"}
            </span>
          </div>
        ))}
      </div>

      <button className="btn-confirmar" onClick={manejarConfirmar}>
        Confirmar respuesta
      </button>
    </div>
  );
};

export default Pregunta3;
