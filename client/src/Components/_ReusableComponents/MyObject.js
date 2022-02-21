import React, { useState, useEffect } from 'react'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

const MyObject = () => {
  const [model, setModel] = useState()
  
  useEffect(() => {
    //must be in public folder
    new GLTFLoader().load('../../../scene.gltf', setModel);
  });

  

  return (
    model ? <primitive object={model.scene} args={[.5,.5,.5]} /> : null
  )
}

export default MyObject
