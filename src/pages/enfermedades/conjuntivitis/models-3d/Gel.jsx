import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'

const Eye = (props) => {
    const { nodes, materials } = useGLTF(
        "models-3d/conjuntivitis/gel-model-3d.glb"
    );
    const eyeRef = useRef();

    useFrame(() => {
        if (eyeRef.current) {
            eyeRef.current.rotation.y += 0.005;
        }
        });

    return (
        <group {...props} dispose={null} scale={4} ref={eyeRef} position={[0, 0, 0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.OphthalmicGel.geometry}
                material={materials.OphthalmicGelMaterial}
            />
        </group>
    );
};
  
export default Eye;

useGLTF.preload("models-3d/conjuntivitis/gel-model-3d.glb");