import { useState, useRef, useEffect } from "react";
import "./Pregunta1.css";

const enfermedades = [
  { id: "e1", nombre: "Conjuntivitis" },
  { id: "e2", nombre: "Glaucoma" },
  { id: "e3", nombre: "Queratocono" },
];

const definiciones = [
  { id: "d1", texto: "Ojos irritados" },
  { id: "d2", texto: "Degeneración progresiva de la córnea" },
  { id: "d3", texto: "Daño al nervio óptico por presión ocular" },
];

// Mapeo correcto: enfermedad.id -> definicion.id
const respuestasCorrectas = {
  e1: "d1",
  e2: "d3",
  e3: "d2",
};


const Pregunta1 = ({ onRespuesta }) => {
  const [seleccion, setSeleccion] = useState(null);
  const [conexiones, setConexiones] = useState([]); // { from: 'e1', to: 'd2' }
  const svgRef = useRef(null);
  const handleSeleccion = (lado, id) => {
    if (lado === "left") {
      setSeleccion({ lado: "left", id });
    } else if (lado === "right" && seleccion?.lado === "left") {
      const nueva = { from: seleccion.id, to: id };
      setConexiones((prev) => [...prev.filter(c => c.from !== nueva.from), nueva]);
      setSeleccion(null);
    }
  };

  // Calcular resultado cuando se dé clic en Validar
  const validarRespuestas = () => {
    let correctas = 0;
    conexiones.forEach(({ from, to }) => {
      if (respuestasCorrectas[from] === to) correctas++;
    });
    const puntuacion = correctas / enfermedades.length;
    onRespuesta(puntuacion); // Enviar puntuación al padre
  };

  return (
    <div className="relacion-pregunta">
      <h2>Relaciona la enfermedad ocular con su definición</h2>
      <div className="relacion-contenedor">
        <div className="columna">
          {enfermedades.map((e) => (
            <div
              key={e.id}
              className="item enfermedad"
              onClick={() => handleSeleccion("left", e.id)}
              id={`from-${e.id}`}
            >
              {e.nombre}
            </div>
          ))}
        </div>

        <div className="svg-container" ref={svgRef}>
          <svg className="svg-lineas">
            {conexiones.map(({ from, to }, i) => {
              const fromEl = document.getElementById(`from-${from}`);
              const toEl = document.getElementById(`to-${to}`);
              const svgBox = svgRef.current?.getBoundingClientRect();

              if (!fromEl || !toEl || !svgBox) return null;

              const fromRect = fromEl.getBoundingClientRect();
              const toRect = toEl.getBoundingClientRect();

              const startX = fromRect.right - svgBox.left;
              const startY = fromRect.top + fromRect.height / 2 - svgBox.top;
              const endX = toRect.left - svgBox.left;
              const endY = toRect.top + toRect.height / 2 - svgBox.top;

              return (
                <line
                  key={i}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="#00a3d8"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>

        <div className="columna">
          {definiciones.map((d) => (
            <div
              key={d.id}
              className="item definicion"
              onClick={() => handleSeleccion("right", d.id)}
              id={`to-${d.id}`}
            >
              {d.texto}
            </div>
          ))}
        </div>
      </div>
      <button className="boton-siguiente" onClick={validarRespuestas}>Siguiente</button>
    </div>
  );
};

export default Pregunta1;
