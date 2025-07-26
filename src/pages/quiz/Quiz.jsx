import { useState } from "react";
import "./Quiz.css";
import Pregunta1 from "./Pregunta1/Pregunta1";
import Pregunta2 from "./Pregunta2/Pregunta2";
import Pregunta3 from "./Pregunta3/Pregunta3";
import Pregunta4 from "./Pregunta4/Pregunta4";

const Quiz = () => {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [resultados, setResultados] = useState([]);

  const manejarRespuesta = (puntos) => {
    setResultados([...resultados, puntos]);
    setPreguntaActual((prev) => prev + 1);
  };

  const progreso = Math.round((resultados.length / 5) * 100); 

  return (
    <div className="quiz-container">
      <h1>Quiz de Enfermedades Oculares</h1>
      <span>Progreso del quiz: {progreso} %</span>
      <div className="barra-progreso">
        <div className="progreso" style={{ width: `${progreso}%` }}></div>
      </div>

      {preguntaActual === 0 && <Pregunta1 onRespuesta={manejarRespuesta} />}
      {preguntaActual === 1 && <Pregunta2 onRespuesta={manejarRespuesta} />}
      {preguntaActual === 2 && <Pregunta3 onRespuesta={manejarRespuesta} />}
      {preguntaActual === 3 && <Pregunta4 onRespuesta={manejarRespuesta} />}

      {preguntaActual > 1 && <p>Aquí va la siguiente pregunta...</p>}
    </div>
  );
};

export default Quiz;
