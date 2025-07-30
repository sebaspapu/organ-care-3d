import React from 'react';
import { useRef } from 'react';
import './Glaucoma.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Environment, Sparkles } from '@react-three/drei';

import Eye from './models-3d/Eye';
import LightEye from './lights/LightsEye';
import FloorEye from "./floors/FloorEye";

import SnellenTest from './models-3d/SnellenTest';
import LightTest from './lights/LightsTest';
import FloorTest from "./floors/FloorTest";
import ControlTest from "./controls/ControlsTest";
import StagingTest from './staging/Dust';
import HTML3DTest from "./texts/HTML3DTest";

import Laser from './models-3d/Laser';
import LightLaser from './lights/LightsLaser';
import FloorLaser from './floors/FloorLaser';
import ControlLaser from './controls/ControlsLaser';
import StagingLaser from './staging/CleanSpace';
import HTML3DLaser from "./texts/HTML3DLaser";
import Text3DLaser from "./texts/treatments-3D2D/3DTreatment";
import Text2DLaser from "./texts/treatments-3D2D/2DTreatment";

import Salad from './models-3d/Salad';
import LightSalad from './lights/LightsSalad';
import FloorSalad from './floors/FloorSalad';
import HTML3DSalad from "./texts/HTML3DSalad";
import ControlSalad from "./controls/ControlsSalad";
import Text3DSalad from "./texts/prevention-3D2D/3DPrevention";
import Text2DSalad from "./texts/prevention-3D2D/2DPrevention";

import Instructions from "./texts/Instructions";

function Glaucoma() {

  const snellenRef = useRef();
  const snellenZoomRef = useRef();

  const laserRef = useRef();
  const laserZoomRef = useRef();

  const saladRef = useRef();
  const saladZoomRef = useRef();

  return (
    <div className="glaucoma-container">
      <h1 className="enfermedad-title">GLAUCOMA</h1>
      
      <div className="info-container">
        <div className="info-section que-es">
          <h2 className="section-title">¿QUÉ ES?</h2>
          <p className="section-text">
          El glaucoma es una enfermedad que daña el nervio óptico, que es como el cable que conecta 
          el ojo con el cerebro. Esto pasa porque la presión dentro del ojo sube demasiado.
          Si no se trata, puede hacer que una persona vea borroso o incluso pierda la vista. 
          </p>
        </div>
        
        <div className="image-glaucoma-section">
          <Canvas shadows camera={{ position: [2, 2, 5], fov: 50 }} style={{ background: '#FFFFFF' }}>
            <LightEye/>
            <OrbitControls />
            <Eye />
            <FloorEye />
          </Canvas>
        </div>
        
        <div className="info-section efectos">
          <h2 className="section-title">¿QUÉ EFECTOS TIENE?</h2>
          <p className="section-text">
          El glaucoma puede hacer que la persona vea borroso, pierda la visión de los lados 
          (como si mirara a través de un tubo) y, si no se trata, puede causar ceguera total. 
          Al principio casi no se sienten síntomas, por eso muchas veces se descubre tarde.
          </p>
        </div>
      </div>
      
      <div className="causa-section">
        <h2 className="section-title">¿QUÉ LA CAUSA?</h2>
        <p className="section-text">
        El glaucoma es causado principalmente por un aumento de presión dentro del ojo, llamado presión 
        intraocular. Esto sucede porque el líquido que normalmente fluye dentro del ojo (el humor acuoso) 
        no drena bien, se acumula y presiona el nervio óptico, dañándolo poco a poco.
        </p>
      </div>

      {/*SECCIÓN: SÍNTOMAS */}
      <div className="sintomas-section-glaucoma">
          <div className="sintomas-header-glaucoma">
            <h2 className="sintomas-title-glaucoma">SÍNTOMAS</h2>
          </div>
          <div className="sintomas-container-glaucoma">

            <div className="sintoma-card-glaucoma">
              <p className="sintoma-text-glaucoma">
              Cuando alguien tiene glaucoma, al principio no siente nada raro. Pero poco a poco empieza 
              a ver menos por los lados, como si estuviera mirando por un tubo o una pajilla. A veces, si 
              el glaucoma es muy fuerte, pueden doler los ojos, ver luces como arcoíris alrededor de los 
              focos, o sentir el ojo rojo o pesado. Muchas veces no se nota hasta que ya ha avanzado bastante.
              </p>
            </div>

            <div className="sintoma-card-glaucoma" style={{ position: 'relative', height: '400px' }} ref={snellenZoomRef} >
              <Canvas shadows camera={{ position: [2, 2, 5], fov: 50 }} style={{ background: '#FFFFFF' }}>
                <LightTest/>
                <Environment 
                  files={[
                    "sym_px.png",
                    "sym_nx.png",
                    "sym_py.png",
                    "sym_ny.png",
                    "sym_pz.png",
                    "sym_nz.png",
                  ]} 
                  path="background/glaucoma/symptoms/"
                  background />
                <StagingTest />
                <OrbitControls />
                <HTML3DTest title={"VISION OPACA Y DE TUNEL"}  />
                <SnellenTest ref={snellenRef} />
                <ControlTest targetRef={snellenRef} zoomTargetRef={snellenZoomRef}  />
                <FloorTest />
              </Canvas>
              <div className="sintoma-nota-glaucoma">
                <Canvas>
                  <Instructions title={"💡 Haz clic en el modelo para interactuar. Usa las teclas ← y → para opacarlo."} />
                </Canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="sintomas-footer-glaucoma"></div>

      {/*SECCIÓN: TRATAMIENTOS */}
      <div className="tratamientos-section-glaucoma">
          <div className="tratamientos-header-glaucoma">
            <h2 className="tratamientos-title-glaucoma">TRATAMIENTOS</h2>
          </div>
          <div className="tratamientos-container-glaucoma">

            <div className="tratamiento-card-glaucoma" style={{ position: 'relative', height: '400px' }} ref={laserZoomRef} >
              <Canvas shadows camera={{ position: [-2, 2, 5], fov: 50 }} style={{ background: '#FFFFFF' }}>
                <LightLaser/>
                <Environment 
                  files={[
                    "treat_px.png",
                    "treat_nx.png",
                    "treat_py.png",
                    "treat_ny.png",
                    "treat_pz.png",
                    "treat_nz.png",
                  ]} 
                  path="background/glaucoma/treatments/"
                  background />
                <StagingLaser />
                <OrbitControls />
                <HTML3DLaser title={"CIRUGIA LASER"}  />
                <Text3DLaser />
                <Text2DLaser />
                <Laser ref={laserRef} />
                <ControlLaser targetRef={laserRef} zoomTargetRef={laserZoomRef}  />
                <FloorLaser />
              </Canvas>
              <div className="tratamiento-nota-glaucoma">
                <Canvas>
                  <Instructions title={"💡 Haz doble clic en el modelo para interactuar. Pulsa ℹ️ para ver información."} />
                </Canvas>
              </div>
            </div>

            <div className="tratamiento-card-glaucoma">
              <p className="tratamiento-text-glaucoma">
              Aunque no se puede curar del todo, el glaucoma se puede tratar con gotas especiales que 
              ayudan a bajar la presión del ojo, a veces con pastillas, o usando una luz láser que hace 
              un horificio en el ojo para que la presión salga. Si eso no funciona, el doctor puede 
              hacer una operación pequeña. Lo más importante es seguir yendo a chequeos médicos para 
              cuidar bien los ojos.
              </p>
            </div>

          </div>
        </div>
        <div className="tratamientos-footer-glaucoma"></div>

      {/*SECCIÓN: PREVENCIÓN */}
      <div className="prevenciones-section-glaucoma">
          <div className="prevenciones-header-glaucoma">
            <h2 className="prevenciones-title-glaucoma">PREVENCIÓN</h2>
          </div>
          <div className="prevenciones-container-glaucoma">

            <div className="prevencion-card-glaucoma">
              <p className="prevencion-text-glaucoma">
              Cuando alguien tiene glaucoma, al principio no siente nada raro. Pero poco a poco empieza 
              a ver menos por los lados, como si estuviera mirando por un tubo o una pajilla. A veces, si 
              el glaucoma es muy fuerte, pueden doler los ojos, ver luces como arcoíris alrededor de los 
              focos, o sentir el ojo rojo o pesado. Muchas veces no se nota hasta que ya ha avanzado bastante.
              </p>
            </div>

            <div className="prevencion-card-glaucoma" style={{ position: 'relative', height: '400px' }} ref={saladZoomRef} >
              <Canvas shadows camera={{ position: [2, 2, 5], fov: 50 }} style={{ background: '#FFFFFF' }}>
                <LightSalad/>
                <Environment 
                  files={[
                    "prev_px.png",
                    "prev_nx.png",
                    "prev_py.png",
                    "prev_ny.png",
                    "prev_pz.png",
                    "prev_nz.png",
                  ]} 
                  path="background/glaucoma/prevention/"
                  background />
                <Sparkles count={100} size={2} scale={10} color="white" />
                <OrbitControls />
                <HTML3DSalad title={"BUENA ALIMENTACIÓN"}  />
                <Text3DSalad />
                <Text2DSalad />
                <Salad ref={saladRef} />
                <ControlSalad targetRef={saladRef} zoomTargetRef={saladZoomRef}  />
                <FloorSalad />
              </Canvas>
              <div className="prevencion-nota-glaucoma">
                <Canvas>
                  <Instructions title={"💡 Haz clic en el modelo para interactuar. Usa las teclas ← y → para opacarlo."} />
                </Canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="prevenciones-footer-glaucoma"></div>

    </div>
  );
}

export default Glaucoma;
