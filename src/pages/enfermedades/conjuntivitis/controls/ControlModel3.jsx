import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ControlsModel3 = ({ targetRef, setHandleDoubleClick }) => {
    const { camera } = useThree();
    const lightRef = useRef();
    const [infoVisible, setInfoVisible] = useState(false);
    const [vibrating, setVibrating] = useState(false);
    const [vibrationStart, setVibrationStart] = useState(0);
  
    // Handler de doble clic para vibración
    useEffect(() => {
      const handleDoubleClick = () => {
        setVibrating(true);
        setVibrationStart(performance.now() / 1000);
      };
      if (setHandleDoubleClick) setHandleDoubleClick(() => handleDoubleClick);
    }, [setHandleDoubleClick]);

    // Animación principal y vibración
    useFrame(() => {
      if (!targetRef.current) return;
      const t = performance.now() / 1000;
      if (vibrating) {
        const elapsed = t - vibrationStart;
        if (elapsed < 2) {
          const offset = Math.sin(t * 50) * 0.01;
          targetRef.current.rotation.z = offset;
        } else {
          setVibrating(false);
          targetRef.current.rotation.z = 0;
        }
      }
      // Pulso vertical simple
      const pulse = 0.98 + 0.02 * Math.sin(t * 3);
      targetRef.current.scale.set(4, pulse * 4, 4); // Mantén la escala base en 4
    });

    // Tecla "i" para mostrar información
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key.toLowerCase() === 'i') {
          setInfoVisible((prev) => !prev);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
      <>
        {/* Luz pulsante */}
        <pointLight
          ref={lightRef}
          position={[0, 0, 1.5]}
          color="red"
          intensity={0.5}
          distance={2}
        />

        {/* Información técnica como HTML */}
        {infoVisible && (
          <Html position={[-1.5, 0, 1]} center style={{ pointerEvents: 'none' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.85)',
              padding: '10px 15px',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#111',
              minWidth: '160px',
              textAlign: 'center',
              boxShadow: '0 0 40px rgba(0,0,0,0.3)'
            }}>
              <strong>Gel Drops o Siccafluid :</strong><br />
              Útiles para aliviar la irritación y la sequedad causada por la conjuntivitis.
            </div>
          </Html>
        )}
      </>
    );
};

export default ControlsModel3;
