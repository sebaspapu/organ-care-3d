import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SparklesModel3 = ({ count = 50, areaSize = 20 }) => {
  const group = useRef();

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        position: new THREE.Vector3(
          THREE.MathUtils.randFloatSpread(areaSize),
          THREE.MathUtils.randFloat(0, areaSize / 2),
          THREE.MathUtils.randFloatSpread(areaSize)
        ),
        speed: THREE.MathUtils.randFloat(0.5, 1.5),
        baseScale: THREE.MathUtils.randFloat(0.2, 0.6),
        timeOffset: Math.random() * Math.PI * 2,
        lifetime: Math.random() * 5 + 2, // de 2 a 7 segundos
        age: 0,
      });
    }
    return arr;
  }, [count, areaSize]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    particles.forEach((p, i) => {
      p.age += delta;
      const mesh = group.current.children[i];

      // Si el destello cumplió su tiempo de vida, lo reiniciamos
      if (p.age > p.lifetime) {
        p.age = 0;
        p.lifetime = Math.random() * 5 + 2;
        p.position.set(
          THREE.MathUtils.randFloatSpread(areaSize),
          THREE.MathUtils.randFloat(0, areaSize / 2),
          THREE.MathUtils.randFloatSpread(areaSize)
        );
        p.speed = THREE.MathUtils.randFloat(0.5, 1.5);
        p.baseScale = THREE.MathUtils.randFloat(0.2, 0.6);
      }

      // Movimiento de opacidad y escala
      const pulse = Math.sin(t * p.speed + p.timeOffset);
      const opacity = THREE.MathUtils.clamp(0.15 + 0.15 * pulse, 0, 0.3);
      const scale = p.baseScale + 0.1 * pulse;

      mesh.position.copy(p.position);
      mesh.scale.set(scale, scale, scale);
      mesh.material.opacity = opacity;
    });
  });

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#a0d8ff"
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
            opacity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

export default SparklesModel3;