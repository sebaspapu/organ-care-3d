// src/components/EyeAudio.jsx
import React, { useRef } from 'react'
import { PositionalAudio } from '@react-three/drei'

export default function EyeAudio() {
  const soundRef = useRef()

  const toggleSound = () => {
    if (!soundRef.current) return

    if (soundRef.current.isPlaying) {
      soundRef.current.pause()
      console.log("⏸️ Sonido pausado")
    } else {
      soundRef.current.play()
      console.log("▶️ Sonido activado")
    }
  }

  return (
    <group position={[2, 2, 0]}>
      {/* 🔘 Círculo clickeable para play/pause */}
      <mesh onClick={toggleSound}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#FF69B4" />
      </mesh>

      {/* 🎧 Audio 3D */}
      <PositionalAudio
        ref={soundRef}
        url="/sounds/Glaucoma/mystical.mp3"
        distance={10}
        loop
      />
    </group>
  )
}