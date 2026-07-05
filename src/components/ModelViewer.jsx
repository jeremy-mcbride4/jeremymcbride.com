import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Center, useGLTF, useProgress, Environment } from '@react-three/drei'

function Model({ url }) {
  const { scene } = useGLTF(url)
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  )
}

function Loader() {
  const { progress } = useProgress()
  return (
    <div className="model-loader">
      <div className="model-loader-bar">
        <div className="model-loader-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="model-loader-text">Loading 3D model… {progress.toFixed(0)}%</p>
    </div>
  )
}

export default function ModelViewer({ url, height = 500 }) {
  const [loading, setLoading] = useState(true)

  return (
    <div className="model-viewer" style={{ height }}>
      {loading && <Loader />}
      <Canvas
        camera={{ position: [0, 200, 500], fov: 50, near: 0.1, far: 10000 }}
        onCreated={() => setLoading(false)}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[50, 100, 50]} intensity={1} />
        <directionalLight position={[-50, 50, -50]} intensity={0.4} />
        <Suspense fallback={null}>
          <Model url={url} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          minDistance={10}
          maxDistance={1000}
        />
      </Canvas>
      <p className="model-hint">Drag to orbit · Scroll to zoom · Right-drag to pan</p>
    </div>
  )
}
