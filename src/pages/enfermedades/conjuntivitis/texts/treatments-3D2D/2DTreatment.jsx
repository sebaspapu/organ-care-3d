import React from 'react';
import { Text } from '@react-three/drei';

const Text2DGel = () => {
  return (
    <Text
      position={[0, 1.5, 0.2]}
      font="/fonts/alice.ttf"
      fontSize={0.3}
      color="#000000"
      anchorX="center"
      anchorY="middle"
    >
      Tratamiento para sanar la conjuntivitis
    </Text>
  );
};

export default Text2DGel;