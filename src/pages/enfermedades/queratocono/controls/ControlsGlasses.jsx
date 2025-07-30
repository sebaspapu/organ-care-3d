import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import Title from "../texts/Title";
import Glasses from "../models-3d/Glasses";
import { TextureLoader } from "three";

const ControlsGlasses = ({ targetRef }) => {
  const { scene } = useThree();
  const [showTitle, setShowTitle] = useState(false);
  const [background, setBackground] = useState("/background/blurry.jpg");
  const modelGroupRef = useRef(); 

  // Animación
  useFrame(() => {
    if (targetRef.current) {
      targetRef.current.rotation.y += 0.004;
    }
  });

  // Evento de Teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!targetRef.current) return;
      if (e.key === 'ArrowLeft') targetRef.current.rotation.y -= 0.1;
      if (e.key === 'ArrowRight') targetRef.current.rotation.y += 0.1;
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [targetRef]);

    // Cargar fondo cada vez que cambia
  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(background, (texture) => {
      scene.background = texture;
    });
  }, [background, scene]);


  // Evento de Mouse
  const handleClick = () => {
  setShowTitle(true);
  setBackground("/background/clear.jpg"); // Cambia al fondo claro
  setTimeout(() => setShowTitle(false), 8000);
  setTimeout(() => {
    setBackground("/background/blurry.jpg");
  }, 9000);

   // Rebote
  if (modelGroupRef.current) {
    let t = 0;
    const jump = () => {
      if (t < Math.PI) {
        modelGroupRef.current.position.y = Math.sin(t) * 0.5; // Altura rebote
        t += 0.1;
        requestAnimationFrame(jump);
      } else {
        modelGroupRef.current.position.y = 0;
      }
    };
    jump();
  }
};

  return (
    <>
  <group ref={modelGroupRef}>
    <Glasses ref={targetRef} onClick={handleClick} />
  </group>
  {showTitle && <Title title="Uff Mucho mejor!" />}
    </>
  );
};

export default ControlsGlasses;
