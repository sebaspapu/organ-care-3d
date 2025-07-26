import { useState } from "react";
import "./Pregunta2.css";

const opciones = [
  { texto: "Lágrimas artificiales", esCorrecta: false },
  { texto: "Antibióticos tópicos", esCorrecta: true },
  { texto: "Cirugía láser", esCorrecta: false },
  { texto: "Uso de lentes de contacto", esCorrecta: false },
];

const Pregunta2 = ({ onRespuesta }) => {
  const [seleccion, setSeleccion] = useState(null);

  const manejarCambio = (index) => {
    setSeleccion(index);
  };

  const manejarClick = () => {
    if (seleccion !== null) {
      const puntos = opciones[seleccion].esCorrecta ? 1 : 0;
      onRespuesta(puntos);
    }
  };

  return (
  <div className="pregunta2-container">
    <h2>Pregunta 2:</h2>
    <p>¿Cuál es el tratamiento adecuado para la conjuntivitis?</p>

    {opciones.map((opcion, index) => (
      <label key={index} className="opcion-radio">
        <input
          type="radio"
          name="tratamiento"
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

export default Pregunta2;
