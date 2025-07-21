import React from 'react';
import { Text3D, Center } from '@react-three/drei';

const Text3DGel = () => {
  return (
    <Center position={[0, -1.5, 0.5]}>
      <Text3D
        font="/fonts/alice.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        2 Soap And Soap Rest
        <meshStandardMaterial color="#0077ff" />
      </Text3D>
    </Center>
  );
};

export default Text3DGel;