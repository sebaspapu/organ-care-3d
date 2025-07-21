import React, { useRef } from "react";
import { useVideoTexture } from "@react-three/drei";

const Video3DModel4 = () => {
  // Cambia la ruta al video que quieras mostrar
  const videoTexture = useVideoTexture("/videos/Conjuntivitis/conjun.mp4");

  return (
    <mesh position={[0,0.2, 2]}>
      <planeGeometry args={[4, 2]} />
      <meshStandardMaterial map={videoTexture} toneMapped={false} />
    </mesh>
  );
};

export default Video3DModel4;