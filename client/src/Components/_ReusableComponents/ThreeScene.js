import React, { useState, useEffect, useContext } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import NewDesignContext from '../../Context/NewDesignContext'
import ThreeControls from './ThreeControls'
import Loader from './Loader'
extend({ OrbitControls })
//import * as THREE from 'three'
//import hoodieTexture from '../../img/KraftWear_T-shirt_texture.jpg';
//import { TextureLoader } from 'three'

/**
*   TESTING THREE.js integration
*/
const ThreeScene = (props) => {
  const [model3D, setModel3D] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { 
    garmentType, 
    setDesignerBackground 
  } = useContext(NewDesignContext);

  //on selected gamrent change => update 3d model
  useEffect(() => {
    //must be in public folder
    if (garmentType && !model3D) {
      if (garmentType.backgroundColor === "dark")
        setDesignerBackground("rgb(20,20,20)");
      new GLTFLoader().load(garmentType.uri, setModel3D);
    }

    return () => {
      console.log("Model offLoaded");
      setModel3D(null);
    }
  }, [garmentType]);

  //switch the loader state
  useEffect(() => {
    if (model3D) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
    return () => {
      //cleanup
    }
  }, [model3D])

  return (
    <>
      {
        //model3D 
        !isLoading ?
          <Canvas
            updateDefaultCamera={true}
          >
            <ambientLight />
            <directionalLight intensity={0.2} position={[-20, 60, 100]} />
            <directionalLight intensity={0.1} position={[10, 20, -100]} />
            <hemisphereLight intensity={0.1} />
            <spotLight position={[0, 5, 0]} />
            <ThreeControls />
            <mesh
              castShadow
              scale={garmentType.scale}
              position={garmentType.position}
            >
              {//(isReadyToRender) ?
                <primitive
                  object={model3D.scene}
                  rotation={[0, Math.PI / 6, 0]}
                />
                //: null
              }
            </mesh>
          </Canvas>
          :
          <div className="modelLoaderSvg">
            <Loader scale={4} duration="2" stroke={( garmentType.backgroundColor === "dark" ) ? "white" : "black"}/>
          </div>
      }
    </>
  )
}

export default ThreeScene

//BINNED CONTENT
/*
const textureURL = props.textureURL;
var texture = useMemo(() => new TextureLoader().load(textureURL), [
  textureURL
]);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;



useEffect(() => {
  if (model) {
    console.log(model.scene.children)

    var scene = model.scene;
    var newMaterial = new THREE.MeshPhysicalMaterial({
      color: "#333",
      reflectivity: 0.0,
      //map: texture

    });
          scene.traverse((o) => {
            if (o.isMesh) o.material = newMaterial;
          });

    setIsReadyToRender(true)
  }
  return () => {
    //
  }
}, [model])
*/