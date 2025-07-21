import React from 'react';
import './Conjuntivitis.css';
import Eye from './models-3d/Eye';
import Light from './lights/Lights';
import Headache from './models-3d/Headache';
import LightModel2 from './lights/LightsModel2';
import AnimatedClouds from './lights/AnimationLights/AnimatedClouds';
import Controls from "./controls/Controls";
import Title from "./texts/Title";
import TitleAuxModel2 from "./texts/TitleAuxModel2";

import Gel from './models-3d/Gel'
import LightModel3 from './lights/LightsModel3';
import Environment from './stage/EnvironmentModel3'
import SparklesModel3 from './stage/SparklesModel3';
import ControlsModel3 from './controls/ControlModel3';
import Text3DGel from './texts/treatments-3D2D/3DTreatment'
import Text2DGel from './texts/treatments-3D2D/2DTreatment';

import SoapDish from './models-3d/SoapDish'
import EnvironmentPrevention from './stage/EnvironmentModel4'
import StagingModel4 from './stage/StagingModel4'
import LightModel4 from './lights/LightsModel4'
import ControlModel4 from './controls/ControlModel4';
import Text3DSoapDish from './texts/treatments-3D2D/3DTreatmentModel4'
import Text2DSoapDish from './texts/treatments-3D2D/2DTreatmentModel4';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Sky, Cloud } from '@react-three/drei';
import { Html } from '@react-three/drei';


import { useRef, useState, useEffect } from 'react';
import Video3DModel4 from './video/Video3DModel4';

export default function Conjuntivitis() {
  const modelRef = useRef();
  const zoomContainerRef = useRef();
  const modelGelRef = useRef();
  const SoapDishRef = useRef()
  // Estado para pasar los handlers de click y doble click
  const [handleDoubleClick, setHandleDoubleClick] = useState(null);
  const [handleClick, setHandleClick] = useState(null);
  const [handleDoubleClick2, setHandleDoubleClick2] = useState(null);
  const [handleClick2, setHandleClick2] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoKey, setVideoKey] = useState(0);

  const handleToggleVideo = () => {
    if (showVideo) {
      // Si lo vas a ocultar, incrementa la key para forzar remount
      setShowVideo(false);
      setVideoKey((k) => k + 1);
    } else {
      setShowVideo(true);
    }
  };

  return (
    <div className="conjuntivitis-container">
        <h1 className="enfermedad-title">CONJUNTIVITIS</h1>
        
        <div className="info-container">
          <div className="info-section que-es">
            <h2 className="section-title">¿QUÉ ES?</h2>
            <p className="section-text">
            La conjuntivitis es una inflamación de la conjuntiva, causada por virus, bacterias, alergias o 
            irritantes. Es común, leve y suele curarse sin secuelas, aunque puede ser muy contagiosa.
            </p>
          </div>
          
          <div className="image-conjuntivi-section" >
          <Canvas shadows camera={{ position: [2, 2, 5], fov: 50 }} style={{ background: '#FFFFFF' }}>
            <Light/>
            <OrbitControls />
            <Eye />

            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial color="white" />
            </mesh>
          </Canvas>
        </div>
          
          <div className="info-section efectos">
            <h2 className="section-title">¿QUÉ EFECTOS TIENE?</h2>
            <p className="section-text">
            Produce enrojecimiento, picazón, ardor, secreción, lagrimeo, visión borrosa y sensación de arenilla.
            Si no se trata adecuadamente, puede generar molestias oculares persistentes.
            </p>
          </div>
        </div>
        
        <div className="causa-section">
          <h2 className="section-title">¿QUÉ LA CAUSA?</h2>
          <p className="section-text">
          Las causas incluyen virus, bacterias, alergias o irritantes. La viral es la más común y contagiosa.
          La bacteriana también se contagia y genera secreción espesa. Las alérgicas e irritativas no son 
          contagiosas. La prevención se basa en buena higiene y se recomienda consultar al médico si los 
          síntomas persisten o hay dolor o pérdida de visión.
          </p>
        </div>

        {/*SECCIÓN: SÍNTOMAS */}
        <div className="sintomas-section-conjunti">
          <div className="sintomas-header-conjunti">
            <h2 className="sintomas-title-conjunti">SÍNTOMAS</h2>
          </div>
          <div className="sintomas-container-conjunti">

            <div className="sintoma-card-conjunti">
              <p className="sintoma-text-conjunti">
              Los síntomas de la conjuntivitis incluyen enrojecimiento ocular, picazón, lagrimeo, 
              sensación de cuerpo extraño, párpados pegajosos y secreción (clara en casos virales, 
              espesa en bacterianos, y acompañada de picor intenso en los alérgicos), y en algunos 
              casos puede presentarse dolor de cabeza asociado al malestar ocular.
              </p>
            </div>

            <div className="sintoma-card-conjunti" style={{ position: 'relative', height: '400px' }} ref={zoomContainerRef}>
              <Canvas shadows camera={{ position: [2, 2, 5], fov: 50 }} style={{ background: '#FFFFFF' }}>
                {/* Elemento ambiental */}
                <Sky sunPosition={[100, 20, 100]} />
                <AnimatedClouds />

                <Title title={"DOLOR DE CABEZA"} />
                <LightModel2/>
                <Headache ref={modelRef} />
                <Controls targetRef={modelRef} zoomTargetRef={zoomContainerRef}  />

                {/* Piso de la escena */}
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}> 
                  <planeGeometry args={[20, 20]} />
                  <meshStandardMaterial color="cyan" />
                </mesh>

              </Canvas>
              <div className="sintoma-nota-conjunti">
                <Canvas>
                  <TitleAuxModel2 title={"💡 Haz clic en el modelo para interactuar. Usa las teclas ← y → para moverlo."} />
                </Canvas>
              </div>
            </div>

          </div>
        </div>
        <div className="sintomas-footer-conjunti"></div>

        {/* SECCIÓN: TRATAMIENTOS */}
      <div className="tratamientos-section-conjunti">
        <div className="tratamientos-header">
          <h2>TRATAMIENTOS</h2>
        </div>

        <div className="tratamientos-container-conjunti">
          <div className="tratamiento-card-conjunti">
            <p className="tratamiento-text-conjunti">
              Como parte del tratamiento de la conjuntivitis, el 
              gel oftálmico se utiliza para aliviar síntomas como 
              ardor, picazón y resequedad ocular. Su aplicación 
              complementa otros tratamientos según el tipo de conjuntivitis, 
              proporcionando lubricación prolongada y mejorando el 
              confort del paciente durante la recuperación.
            </p>
          </div>

          <div className="sintoma-card-conjunti" style={{ position: 'relative', height: '400px' }}>
            
            <Canvas
              shadows
              camera={{ position: [0, 1.5, 6], fov: 50 }}
              style={{ background: "#FFFFFF" }}
            >
              <LightModel3/>
              <Environment/>
              <SparklesModel3/>
              <Title title={"GEL OFTALMOLOGICO"} />
              <Gel ref={modelGelRef} scale={4} onDoubleClick={handleDoubleClick} onClick={handleClick} />
              <ControlsModel3 targetRef={modelGelRef} setHandleDoubleClick={setHandleDoubleClick} setHandleClick={setHandleClick} />
              <OrbitControls />
              <Text3DGel />
              <Text2DGel />

              {/* Piso de la escena */}
              <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}> 
                  <planeGeometry args={[20, 20]} />
                  <meshStandardMaterial color="cyan" />
                </mesh>
            </Canvas>
            <div className="tratamiento-nota-conjunti">
                <Canvas>
                  <TitleAuxModel2 title={
                    <>
                    💡Haz clic en el modelo cambiar de color. Usa la tecla .
                     {""}
                       <span
                         style={{
                           display: "inline-block",
                           backgroundColor: "black",     // Fondo negro
                           color: "#add8e6",              // Letra azul claro (puedes usar "white" si prefieres)
                           borderRadius: "4px",          // Esquinas levemente redondeadas (usa 0 para cuadrado puro)
                           width: "28px",
                           height: "28px",
                           fontSize: "16px",
                           fontWeight: "bold",
                           textAlign: "center",
                           lineHeight: "28px",           // Centrado vertical
                           border: "2px solid black",    // Borde negro
                           margin: "0 4px",              // Espacio lateral
                         }}
                       >
                         i
                       </span>
                     {" "}
                    para información.
                   </>} />
                </Canvas>
              </div>
          </div>
        </div>
      </div>

        {/* SECCIÓN: PREVENCION */}
      <div className="prevenciones-section-conjunti">
        <div className="sintomas-header-conjunti">
            <h2 className="sintomas-title-conjunti">PREVENCIÓN</h2>
          </div>

        <div className="prevenciones-container-conjunti">
          <div className="prevencion-card-conjunti">
            <p className="prevencion-text-conjunti">
              Para la prevención de la conjuntivitis, es fundamental mantener una adecuada higiene ocular. 
              El uso regular de jabones específicos para el área de los párpados, ayuda a eliminar impurezas, restos de maquillaje y secreciones que pueden favorecer 
              infecciones. Esta rutina de limpieza reduce el riesgo de contagio y mantiene los ojos limpios 
              y saludables, especialmente en ambientes propensos a irritaciones o exposición a agentes externos.
            </p>
          </div>

          <div className="sintoma-card-conjunti" style={{ position: 'relative', height: '400px' }}>
            
            <Canvas
              shadows
              camera={{ position: [0, 1.5, 6], fov: 50 }}
              style={{ background: "#FFFFFF" }}
            >
              <EnvironmentPrevention/>
              <StagingModel4/>
              <LightModel4/>
              
              <Title title={"JABONERA"} />
              <SoapDish ref={SoapDishRef} scale={10} onDoubleClick={handleDoubleClick2} />
              <ControlModel4 targetRef={SoapDishRef} setHandleDoubleClick={setHandleDoubleClick2} />

              <OrbitControls />

              <Text3DSoapDish />
              <Text2DSoapDish />

              {/* Botón HTML 3D */}
                <Html position={[-4.5, 3.5, -10]} center>
                  <button
                    style={{
                      padding: "10px 20px",
                      fontSize: "16px",
                      borderRadius: "8px",
                      border: "2px solid #0077ff",
                      background: "#fff",
                      color: "#0077ff",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                    onClick={handleToggleVideo}
                  >
                    {showVideo ? "Ocultar Video 3D" : "Ver Video 3D"}
                  </button>
                </Html>

                {/* Renderiza el video si showVideo es true, usando la key para forzar remount */}
                {showVideo && <Video3DModel4 key={videoKey} />}
              

              {/* Piso de la escena */}
              <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}> 
                  <planeGeometry args={[20, 20]} />
                  <meshStandardMaterial color="cyan" />
                </mesh>
            </Canvas>
            
            <div className="prevencion-nota-conjunti">
            
                <Canvas>
                  <TitleAuxModel2 title={
                    <>
                     💡Haz clic en el modelo para hacerlo vibrar. Usa la tecla .
                      {""}
                        <span
                          style={{
                            display: "inline-block",
                            backgroundColor: "black",     // Fondo negro
                            color: "#add8e6",              // Letra azul claro (puedes usar "white" si prefieres)
                            borderRadius: "4px",          // Esquinas levemente redondeadas (usa 0 para cuadrado puro)
                            width: "28px",
                            height: "28px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            textAlign: "center",
                            lineHeight: "28px",           // Centrado vertical
                            border: "2px solid black",    // Borde negro
                            margin: "0 4px",              // Espacio lateral
                          }}
                        >
                          R
                        </span>
                      {" "}
                      para reiniciar.
                    </>} />
                </Canvas>
              </div>
          </div>
        </div>
      </div>
      <div className="prevenciones-footer-conjunti"></div>

      </div>
    );
  }
  
  //export default Conjuntivitis;