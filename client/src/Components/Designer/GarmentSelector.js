import React, { useContext, useEffect, useState } from 'react'
import Card from '../_ReusableComponents/Card'
import NewDesignContext from '../../Context/NewDesignContext';
import ThreeScene from '../_ReusableComponents/ThreeScene'
import PageContext from '../../Context/PageContext';
import Loader from '../_ReusableComponents/Loader';

const GarmentSelector = () => {
  const {
    garmentType, setGarmentType,
    garmentTypeName, setGarmentTypeName,
    designerBackground, setDesignerBackground
  } = useContext(NewDesignContext);
  const [showControlsInfo, setShowControlsInfo] = useState(false);
  const { stock } = useContext(PageContext);
  const [garmentTypesArray, setGarmentTypesArray] = useState(null);

  //TODO
  //when stock is updated, update garmentTypesArray too
  useEffect(() => {
    if( stock!={} ){
      console.log("reloading available 3D models from DB...",stock);
      setGarmentTypesArray(stock.threeDeeModels);
    }

    return () => {
      //cleanup
    }
  }, [stock])

  //any time garmentTypeName changes set garmentType
  useEffect(() => {
    if (garmentTypeName) {
      //set garment type
      const gt = garmentTypesArray.filter(garment => garment.name === garmentTypeName);
      setGarmentType(gt[0]);
    }
    return () => {
      //cleanup
    }
  }, [garmentTypeName])

  //set garment to match selected thumbnail
  const garmentSelect = (i) => {
    setGarmentType(garmentTypesArray[i]);
    setGarmentTypeName(garmentTypesArray[i].name);
  }

  //go back to garment selection
  const changeGarmentBtnClick = () => {
    setDesignerBackground("unset");
    setGarmentType(null);
    setGarmentTypeName(null);
  }

  //hanlde contorls btn click
  const controlsBtnClicked = () => {
    console.log("controls btn clicked");
    setShowControlsInfo(!showControlsInfo);
  }

  //precompose list
  const renderList = (garmentTypesArray) => {
    let renderArray = [];
    //TODO get these from DB
    for (let i = 0; i < garmentTypesArray.length; i++) {
      renderArray.push(
        <Card
          key={`baseGarmentThumb-${i}`}//change it to unique value!!
          backgroundColor={
            (garmentTypesArray[i].backgroundColor === "dark") ?
              "rgb(20,20,20)" : "white"
          }
          image={garmentTypesArray[i].thumbnail}
          title={garmentTypesArray[i].name}
          onClick={() => garmentSelect(i)}
        />
      )
    }
    return renderArray
  }

  //style changes for controls info btn when active
  const controlsStyle =
    (showControlsInfo) ? {
      display: "flex",
      flexFlow: "column",
      justifyContent: "center",
      position: "absolute",
      width: "30em",
      bottom: "1em",
    } : {};

  return (
    (garmentType) ?
      <>
        <ThreeScene />
        <div className="designerLeftFooter">
          <button
            className="PsyButton changeGarmentBtn"
            onClick={() => changeGarmentBtnClick()}
          >Change garment</button>
          <button
            className="PsyButton controlHelpBtn"
            style={controlsStyle}
            onClick={() => controlsBtnClicked()}>
            {(showControlsInfo) ?
              <>
                <p>Click and drag the model to rotate</p>
                <p>Scroll to zoom</p>
                <p>(click here to hide info)</p>
              </>
              : "Controls"
            }
          </button>
        </div>
      </>
      :
      <div className="garmentSelector">
        <h2>Select Your Base Garment</h2>
        <div className="garmentList">
          {(garmentTypesArray && garmentTypesArray != []) ?
            renderList(garmentTypesArray)
            :
            <div>
              <Loader scale={2} stroke={"black"} />
              <p>Loading available garments</p>
            </div>
          }
        </div>
      </div>
  )
}

export default GarmentSelector
