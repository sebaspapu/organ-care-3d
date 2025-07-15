import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Gel = forwardRef(({ onDoubleClick, scale = 4, ...rest }, ref) => {
    const { nodes, materials } = useGLTF(
        "models-3d/conjuntivitis/gel-model-3d.glb"
    );
    const gelRef = useRef();

    useImperativeHandle(ref, () => gelRef.current);

    useFrame(() => {
        if (gelRef.current) {
            gelRef.current.rotation.y += 0.005;
        }
    });

    return (
        <group
            ref={gelRef}
            dispose={null}
            scale={scale}
            position={[0, 0, 0]}
            onDoubleClick={onDoubleClick}
            {...rest}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.OphthalmicGel.geometry}
                material={materials.OphthalmicGelMaterial}
            />
        </group>
    );
});
  
export default Gel;

useGLTF.preload("models-3d/conjuntivitis/gel-model-3d.glb");