import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function PanoMesh({ src }) {
  const texture = useTexture(src)
  return (
    <mesh>
      <sphereGeometry args={[50, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

export default function R3FPano({ src, height = 360 }) {
  return (
    <div style={{ width: '100%', height }}>
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <PanoMesh src={src} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.4}       // lower = less sensitive (default 1)
            enableDamping={true}    // smooth motion over frames
            dampingFactor={0.08}    // how strongly damping slows movement
            minPolarAngle={Math.PI / 2 - Math.PI / 3} // vertical limits (optional)
            maxPolarAngle={Math.PI / 2 + Math.PI / 3}
            />
        </Suspense>
      </Canvas>
    </div>
  )
}
