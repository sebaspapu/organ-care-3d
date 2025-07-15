import { useRef, useEffect } from "react";
import { PointLightHelper } from "three";
import { useHelper } from "@react-three/drei";

const LightModel3 = () => {
  const pointLightRef = useRef();
  
    // Helper para ver la luz en desarrollo
    useHelper(pointLightRef, PointLightHelper, 0.5);
  
    return (
      <>
        {/* Luz ambiental suave para visibilidad general */}
        <ambientLight intensity={0.5} />
  
        {/* Luz puntual simulando lámpara médica o láser */}
        <pointLight
          //ref={pointLightRef}
          color="#ffffff" // blanco neutro (puedes usar azul o verde si es láser)
          intensity={150}
          distance={10}
          decay={2}
          position={[0, 2, 2]} // ajusta según la escena
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
      </>
    );
};

export default LightModel3;
