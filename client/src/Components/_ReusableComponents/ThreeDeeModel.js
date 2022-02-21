import React, { useState, useEffect, useRef, useMemo, useContext } from 'react'
import * as THREE from 'three'
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import NewDesignContext from '../../Context/NewDesignContext'

/**
 * RESEARCH THIS:
 * https://discourse.threejs.org/t/solved-how-can-i-set-texture-to-mesh-exported-from-blender-gltf/7141
 * 
 */
const ThreeDeeModel = (props) => {
  const [model3D, setModel3D] = useState(null);
  //const [isReadyToRender, setIsReadyToRender] = useState(false);

  return (
    model3D ?
      <mesh
        castShadow
        scale={garment.scale}
        position={garment.position}
      >
        {//(isReadyToRender) ?
          <primitive
            object={model3D.scene}
            rotation={[0, Math.PI / 6, 0]}
          />
          //: null
        }
      </mesh>
      : null
  )
}

export default ThreeDeeModel
