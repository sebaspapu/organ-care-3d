import { useState } from "react";
import "./Quiz.css";
import Pregunta1 from "./Pregunta1/Pregunta1";
import Pregunta2 from "./Pregunta2/Pregunta2";
import Pregunta3 from "./Pregunta3/Pregunta3";
import Pregunta4 from "./Pregunta4/Pregunta4";
import useQuizStore from "../../stores/use-quiz-store";
import { useAuth } from "../../context/AuthContext";

const Quiz = () => {
  const { user } = useAuth();
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [resultados, setResultados] = useState([]);
  const incrementQuizProgress = useQuizStore(state => state.incrementQuizProgress);

  const manejarRespuesta = (puntos) => {
    console.log('Respuesta del usuario:', puntos);
    setResultados([...resultados, puntos]);
    if (user && user.uid) {
      incrementQuizProgress(user.uid, puntos, user.email, user.displayName);
    } else {
      // Si no hay usuario autenticado, puedes manejarlo como invitado o mostrar un error
      incrementQuizProgress('invitado', puntos, null, null);
    }
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
