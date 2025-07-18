import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import Title from "../texts/Title";
import AnnoyingLight from "../models-3d/AnnoyingLight";
import { TextureLoader } from "three";

const Controls = ({ targetRef }) => {
  const { scene } = useThree();
  const [showTitle, setShowTitle] = useState(false);

  // Fondo
  useEffect(() => {
    const loader = new TextureLoader();
    loader.load("/background/luz.jpg", (texture) => {
      scene.background = texture;
    });
  }, [scene]);

  // Animación
  useFrame(() => {
    if (targetRef.current) {
      targetRef.current.rotation.y += 0.007;
    }
  });

  // Teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!targetRef.current) return;
      if (e.key === 'ArrowLeft') targetRef.current.rotation.y -= 0.1;
      if (e.key === 'ArrowRight') targetRef.current.rotation.y += 0.1;
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [targetRef]);

  // Clic en modelo
  const handleClick = () => {
    setShowTitle(true);
    setTimeout(() => setShowTitle(false), 5000);
  };

  return (
    <>
      <AnnoyingLight ref={targetRef} onClick={handleClick} />
      {showTitle && <Title title="AAAY mis ojos!!!" />}
    </>
  );
};

export default Controls;
