import React, { useState, useEffect } from 'react'
import '../../css/Card.css'

const Card = (props) => {
  //Tring to achieve lazy image loading   
  //meaning it should only render backgroudnimage once fully loaded
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    //const imgLoaderTimeout = setTimeout(() => { 
    setImgLoaded(true)
    //}, 500);
    return () => {
      //clearTimeout(imgLoaderTimeout);
    }
  }, [imgLoaded])

  const backgroundColor =
    (props.backgroundColor) ?
      props.backgroundColor : "white";

  const style = {
    opacity: 1,
    transition: "opacity .5s",
    backgroundColor: backgroundColor
  }

  return (
    <div
      className={`${(!props.to) ? "DesignThumbnail " : ""}card`}
      style={(imgLoaded) ? style : null}
    >
      <a
        href="/"
        style={{
          backgroundImage: (imgLoaded) ? `url(${props.image})` : null
        }}
        onClick={(e) => {
          e.preventDefault();
          //@TODO
          props.onClick()
        }}
      >
        <img src={props.image} alt="card background" onLoad={() => {
          setImgLoaded(true);
        }} />
        <h2>{props.title}</h2>
      </a>
    </div>

  )
}

export default Card