import { useEffect, useRef } from "react";

const ControlModel4 = ({ targetRef,  setHandleDoubleClick, setHandleClick  }) => {
  const originalState = useRef({ position: null, rotation: null, scale: null });
  const vibrating = useRef(false);
  const vibrationStart = useRef(0);

  // Guardar el estado original al montar
  useEffect(() => {
    if (targetRef.current && !originalState.current.position) {
      originalState.current.position = targetRef.current.position.clone();
      originalState.current.rotation = targetRef.current.rotation.clone();
      originalState.current.scale = targetRef.current.scale.clone();
    }
  }, [targetRef]);

  // Evento de teclado: "r" para resetear
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "r" && targetRef.current) {
        targetRef.current.position.copy(originalState.current.position);
        targetRef.current.rotation.copy(originalState.current.rotation);
        targetRef.current.scale.copy(originalState.current.scale);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [targetRef]);

 



  return null; // No renderiza nada visual
};

export default ControlModel4;
