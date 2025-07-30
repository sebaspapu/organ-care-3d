import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import {
  DirectionalLightHelper,
} from "three";

const Lights = () => {
  const directionalLightRef = useRef();
  useHelper(directionalLightRef, DirectionalLightHelper);

  return (
    <>
       {/* Luces*/}
      <ambientLight color={"#F5F5DC"} intensity={5} /> 
      <directionalLight
        //ref={directionalLightRef}
        color="white"
        intensity={5.5}
        position={[5, 10, 5]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={1}
        shadow-camera-far={30}
        />
    </>
  );
};

export default Lights;