import React, { useState } from "react";
import "./Pregunta4.css";

const opciones = [
  { id: "o1", texto: "Evitar frotarse los ojos con fuerza", esCorrecta: true },
  { id: "o2", texto: "Realizar controles visuales periódicos", esCorrecta: true },
  { id: "o3", texto: "No usar gafas cuando hay sol", esCorrecta: false },
  { id: "o4", texto: "Dormir con lentes de contacto puestos", esCorrecta: false },
];

const Pregunta4 = ({ onRespuesta }) => {
  const [seleccionadas, setSeleccionadas] = useState([]);

  const manejarCambio = (id) => {
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((op) => op !== id) : [...prev, id]
    );
  };

  const manejarConfirmar = () => {
    const seleccionadasInfo = opciones.filter((op) =>
      seleccionadas.includes(op.id)
    );

    const correctas = seleccionadasInfo.filter((op) => op.esCorrecta).length;
    const incorrectas = seleccionadasInfo.filter((op) => !op.esCorrecta).length;

    let puntaje = 0;

    if (correctas === 2 && incorrectas === 0) puntaje = 1;
    else if (
      (correctas === 2 && incorrectas === 1) ||
      (correctas === 1 && incorrectas === 1)
    )
      puntaje = 0.5;
    else puntaje = 0;

    const respuestasTexto = seleccionadasInfo.map((op) => `${op.texto}`);
    console.log("pregunta 4: ", puntaje)
    onRespuesta(puntaje, { tipo: "interactiva", contenido: respuestasTexto });

  };

  return (
    <div className="pregunta4">
      <h2>Selecciona la forma de prevenir la enfermedad de queratocono</h2>
      <div className="opciones-checkbox">
        {opciones.map((op) => (
          <label key={op.id} className="opcion-checkbox">
            <input
              type="checkbox"
              checked={seleccionadas.includes(op.id)}
              onChange={() => manejarCambio(op.id)}
            />
            {op.texto}
          </label>
        ))}
      </div>

      <button className="btn-confirmar" onClick={manejarConfirmar}>
        Confirmar respuesta
      </button>
    </div>
  );
};

export default Pregunta4;
