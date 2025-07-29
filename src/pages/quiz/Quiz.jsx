import { useState } from "react";
import "./Quiz.css";
import Pregunta1 from "./Pregunta1/Pregunta1";
import Pregunta2 from "./Pregunta2/Pregunta2";
import Pregunta3 from "./Pregunta3/Pregunta3";
import Pregunta4 from "./Pregunta4/Pregunta4";
import Pregunta5 from "./Pregunta5/Pregunta5";

const Quiz = () => {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [resultados, setResultados] = useState([]);
  const [respuestasUsuario, setRespuestasUsuario] = useState([]);

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
    setResultados([...resultados, puntos]);
    setRespuestasUsuario([...respuestasUsuario, respuestaUsuario]);
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

          <button className="btn-terminar">Terminar</button>
        </div>
      )}

      {preguntaActual > 1 && preguntaActual < 5 && (
        <p>Aquí va la siguiente pregunta...</p>
      )}
    </div>
  );
};

export default Quiz;
