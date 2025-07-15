import { Environment } from '@react-three/drei';
import { Suspense } from 'react';

export default function HDRIEnvironment() {
  return (
    <Suspense fallback={null}>
      <Environment
        files="/background/conjuntivitis/treatments/surgery_4k.exr"
        path=""
        background
      />
    </Suspense>
  );
}