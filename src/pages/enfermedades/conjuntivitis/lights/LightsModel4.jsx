import { useRef, useEffect } from "react";
import { PointLightHelper } from "three";
import { useHelper } from "@react-three/drei";

const LightModel4 = () => {
  const pointLightRef = useRef();
  
    // Helper para ver la luz en desarrollo
    useHelper(pointLightRef, PointLightHelper, 0.5);
  
    return (
      <>
        <hemisphereLight
    skyColor="#b1e1ff"
    groundColor="#fffde4"
    intensity={0.7}
    position={[0, 10, 0]}
  />
  <spotLight
    color="#fffbe4"
    intensity={700}
    angle={Math.PI / 8}      // Ángulo más grande para sombra más difusa
    penumbra={1.5}             // Penumbra máxima para bordes muy suaves
    position={[3, 8, 5]}
    castShadow
    shadow-mapSize-width={2048}
    shadow-mapSize-height={2048}
    shadow-bias={-0.0005}
  />
      </>
    );
};

export default LightModel4;
