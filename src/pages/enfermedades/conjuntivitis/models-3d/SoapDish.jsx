import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const SoapDish = forwardRef(({ onDoubleClick, onClick, scale = 10, ...rest }, ref) => {
    const { nodes, materials } = useGLTF(
        "models-3d/conjuntivitis/soap-dish-model-3d.glb"
    );
    const soapDishRef = useRef();

    useImperativeHandle(ref, () => soapDishRef.current);

    useFrame(() => {
        if (soapDishRef.current) {
            soapDishRef.current.rotation.y += 0.005;
        }
        });

    return (
    <group
            ref={soapDishRef}
            dispose={null}
            scale={scale}
            position={[0, -1, 0]}
            {...rest}
        >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Soap.geometry}
        material={materials.SoapMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.EmptyLid.geometry}
        material={materials.EmptyLidMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ContainerLid.geometry}
        material={materials.ContainerLidMaterial}
      />
    </group>
  )
});
  
export default SoapDish;

useGLTF.preload("models-3d/conjuntivitis/soap-dish-model-3d.glb");