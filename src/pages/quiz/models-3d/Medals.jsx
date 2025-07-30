import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'

const Medals = (props) => {
    const { nodes, materials } = useGLTF(
        "models-3d/leaderboard/medals.glb"
    );
    const eyeRef = useRef();

    useFrame(() => {
        if (eyeRef.current) {
            eyeRef.current.rotation.y += 0.006;
        }
        });

    return (
        <group {...props} dispose={null}>
            <group scale={0.1}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Ace_Combat_7_Ace_Bronze_AC7_Bronze_Ace_Medal_0.geometry}
                    material={materials.AC7_Bronze_Ace_Medal}
                    position={[-60, 0, 0]}
                    rotation={[-0.391, 0, 0]}
                    scale={[110.245, 110.245, 87.048]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Ace_Combat_7_Ace_Silver_AC7_Silver_Ace_Medal_0.geometry}
                    material={materials.AC7_Silver_Ace_Medal}
                    rotation={[-0.391, 0, 0]}
                    scale={[110.245, 110.245, 87.048]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Ace_Combat_7_Ace_Gold_AC7_Gold_Ace_Medal_0.geometry}
                    material={materials.AC7_Gold_Ace_Medal}
                    position={[60, 0, 0]}
                    rotation={[-0.391, 0, 0]}
                    scale={[110.245, 110.245, 87.048]}
                />
            </group>
        </group>
    );
};
  
export default Medals;

useGLTF.preload("models-3d/leaderboard/medals.glb");