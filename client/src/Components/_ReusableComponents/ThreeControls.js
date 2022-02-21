import React, { useRef } from 'react'
import { useThree, useFrame } from 'react-three-fiber';

const ThreeControls = () => {
  const { camera, gl } = useThree();
  const controls = useRef();
  useFrame(() => controls.current.update());

  return (
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 3}
      enableDamping
      enablePan={false}
      maxDistance={5.0}
      minDistance={2.0}
    />
  )
}

export default ThreeControls