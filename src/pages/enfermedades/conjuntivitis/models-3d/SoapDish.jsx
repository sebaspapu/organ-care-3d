import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const SoapDish = forwardRef(({ scale = 10, ...rest }, ref) => {
    const { nodes, materials } = useGLTF(
        "models-3d/conjuntivitis/soap-dish-model-3d.glb"
    );
    const outerGroupRef = useRef(); // Para rotación Y
    const innerGroupRef = useRef(); // Para vibración Z

    useImperativeHandle(ref, () => outerGroupRef.current);

    // Estado de vibración
    const vibrating = useRef(false);
    const vibrationStart = useRef(0);

    // Rotación continua en Y (en el grupo exterior)
    useFrame(() => {
        if (outerGroupRef.current) {
            outerGroupRef.current.rotation.y += 0.005;
        }
        if (innerGroupRef.current) {
            if (vibrating.current) {
                const t = performance.now() / 1000;
                const elapsed = t - vibrationStart.current;
                if (elapsed < 2) {
                    innerGroupRef.current.rotation.z = Math.sin(t * 50) * 0.3;
                } else {
                    vibrating.current = false;
                    innerGroupRef.current.rotation.z = 0;
                }
            }
        }
    });

    // Handler de doble clic para activar vibración
    const vibrate = () => {
        if (!vibrating.current) {
            vibrating.current = true;
            vibrationStart.current = performance.now() / 1000;
        }
    };

    return (
        <group
            ref={outerGroupRef}
            scale={scale}
            position={[0, -1, 0]}
            {...rest}
        >
            <group ref={innerGroupRef} onDoubleClick={vibrate}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Soap.geometry}
                    material={materials.SoapMaterial}
                    onDoubleClick={vibrate}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.EmptyLid.geometry}
                    material={materials.EmptyLidMaterial}
                    onDoubleClick={vibrate}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ContainerLid.geometry}
                    material={materials.ContainerLidMaterial}
                    onDoubleClick={vibrate}
                />
            </group>
        </group>
    )
});

export default SoapDish;

useGLTF.preload("models-3d/conjuntivitis/soap-dish-model-3d.glb");