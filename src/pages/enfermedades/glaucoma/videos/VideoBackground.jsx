import React from 'react'
import { useVideoTexture } from '@react-three/drei'

export default function VideoBackground() {
  const texture = useVideoTexture('/videos/Glaucoma/space.mp4', {
    muted: true,
    loop: true,
    autoplay: true,
    crossOrigin: "anonymous",
  })
  

  return (
    <mesh position={[0, 0, -30]}>
      <planeGeometry args={[100, 50]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}