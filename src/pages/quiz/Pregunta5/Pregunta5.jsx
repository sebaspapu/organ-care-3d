import { useState } from "react";
import "./Pregunta5.css";

const opciones = [
  { texto: "Picazón en los ojos", esCorrecta: false },
  { texto: "Visión periférica reducida", esCorrecta: true },
  { texto: "Lagrimeo constante", esCorrecta: false },
];

const Pregunta5 = ({ onRespuesta }) => {
  const [seleccion, setSeleccion] = useState(null);

  const manejarCambio = (index) => {
    setSeleccion(index);
  };

  const manejarClick = () => {
    if (seleccion !== null) {
      const puntos = opciones[seleccion].esCorrecta ? 1 : 0;
      console.log("pregunta 5: ", puntos)
      onRespuesta(puntos, opciones[seleccion]);

    }
  };

  return (
    <div className="pregunta5-container">
      <h2>Pregunta 5:</h2>
      <p>Selecciona el síntoma de la enfermedad del glaucoma</p>

      {opciones.map((opcion, index) => (
        <label key={index} className="opcion-radio">
          <input
            type="radio"
            name="sintoma-glaucoma"
            value={index}
            checked={seleccion === index}
            onChange={() => manejarCambio(index)}
          />
          {opcion.texto}
        </label>
      ))}

      <button
        onClick={manejarClick}
        className="boton-siguiente"
        disabled={seleccion === null}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pregunta5;
