import { useState } from "react";
import "./Quiz.css";
import Pregunta1 from "./Pregunta1/Pregunta1";
import Pregunta2 from "./Pregunta2/Pregunta2";
import Pregunta3 from "./Pregunta3/Pregunta3";
import Pregunta4 from "./Pregunta4/Pregunta4";
import useQuizStore from "../../stores/use-quiz-store";
import { useAuth } from "../../context/AuthContext";
import Pregunta5 from "./Pregunta5/Pregunta5";
import Leaderboard from "./Leaderboard";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const { user } = useAuth();
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [resultados, setResultados] = useState([]);
  const incrementQuizProgress = useQuizStore(state => state.incrementQuizProgress);
  const [respuestasUsuario, setRespuestasUsuario] = useState([]);
  const [mostrarRanking, setMostrarRanking] = useState(false);
  const navigate = useNavigate();

  const obtenerRespuestaCorrecta = (indice) => {
    const correctas = [
      "Conjuntivitis - Ojos irritados, \n Glaucoma - Daño al nervio óptico por presión ocular, \n Queratocono - Degeneracion progresiva de la cornea",
      "Antibióticos tópicos",
      "queratocono:  sensibilidad, \nConjuntivitis: ojos rojos, \nglaucoma: visión borrosa",
      "Evitar frotarse / Controles visuales",
      "Visión periférica reducida",
    ];
    return correctas[indice];
  };

  const manejarRespuesta = (puntos, respuestaUsuario) => {
    console.log('Respuesta del usuario:', puntos);
    setResultados([...resultados, puntos]);
    setRespuestasUsuario([...respuestasUsuario, respuestaUsuario]);
    if (user && user.uid) {
      incrementQuizProgress(user.uid, puntos, user.email, user.displayName);
    } else {
      // Si no hay usuario autenticado, puedes manejarlo como invitado o mostrar un error
      incrementQuizProgress('invitado', puntos, null, null);
    }
    setPreguntaActual((prev) => prev + 1);
  };

  const progreso = Math.round((resultados.length / 5) * 100);

  if (mostrarRanking) {
    return (
      <div className="quiz-container">
        <Leaderboard onVolver={() => navigate("/enfermedades")} />
      </div>
    );
  }

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
      {preguntaActual === 4 && <Pregunta5 onRespuesta={manejarRespuesta} />}

      {preguntaActual === 5 && (
        <div className="resultados-finales">
          <h2>Resultados Finales</h2>
          <p>
            Puntaje total: {resultados.reduce((acc, val) => acc + val, 0)} / 5
          </p>

          <div className="resumen-respuestas">
            {respuestasUsuario.map((respuesta, index) => {
              let estilo = "";

              if (resultados[index] === 1) {
                estilo = "respuesta-correcta";
              } else if (resultados[index] > 0.3) {
                estilo = "respuesta-parcial";
              } else {
                estilo = "respuesta-incorrecta";
              }

              return (
                <div key={index} className={`respuesta-resumen ${estilo}`}>
                  <strong>Pregunta {index + 1}:</strong>
                  <br />
                  {respuesta?.tipo === "interactiva" ? (
                    <>
                      Tu(s) respuesta(s):
                      <ul>
                        {respuesta.contenido.map((linea, i) => (
                          <li key={i}>{linea}</li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>Tu respuesta: {respuesta?.texto}</>
                  )}
                  {resultados[index] < 1 && (
                    <div className="retroalimentacion">
                      Respuesta correcta:
                      <pre>{obtenerRespuestaCorrecta(index)}</pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button className="btn-terminar" onClick={() => setMostrarRanking(true)}>
            Ver Ranking
          </button>
        </div>
      )}

      {preguntaActual > 1 && preguntaActual < 5 && (
        <p>Aquí va la siguiente pregunta...</p>
      )}
    </div>
  );
};

export default Quiz;
