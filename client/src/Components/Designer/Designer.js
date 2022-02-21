import React, { useState, useEffect, useContext } from 'react'
import NewDesignContext from '../../Context/NewDesignContext'
import './Designer.css'
import GarmentSelector from './GarmentSelector'
import ThreeScene from '../_ReusableComponents/ThreeScene'
import DesignSettings from './DesignerSettings'
import PageContext from '../../Context/PageContext'

/**
*   Design a t-shirt page
*/
const Designer = (props) => {
    const {
        activeDesignID,
        designs,
    } = useContext(PageContext);
    //const [designID, setDesignID] = useState(null);
    const [designName, setDesignName] = useState(null);
    const [garmentType, setGarmentType] = useState(null);
    const [garmentTypeName, setGarmentTypeName] = useState(null);
    const [designerBackground, setDesignerBackground] = useState("none");
    //const [file, setFile] = useState('');
    const [filesArray, setFilesArray] = useState([]);
    const [garmentColorID, setGarmentColorID] = useState("white");
    const [designChanged, setDesignChanged] = useState(false);

    
    //TODO
    //if activeDesignID is set, set all states to that design's details
    useEffect(() => {
        if (activeDesignID){
            const activeDesign = designs.filter(design => design._id === activeDesignID)[0];
            console.log("active design: ", activeDesign);
            //set values
            setDesignName(activeDesign.name);
            setGarmentColorID(activeDesign.garmentColor);
            setFilesArray(activeDesign.images);//TODO fix ! we have a mismatch between filnames array and files array
            setGarmentTypeName(activeDesign.garmentTypeName);
            setDesignChanged(false);
        }
        return () => {
            //cleanup
        }
    }, [activeDesignID])
    

    /*
    //TODO every time filesArray changes, 
    //generate one merged composite image from the image layers
    //and apply it as a texture to the 3D model (but how one might ask?)
    useEffect(() => {
        if (filesArray !== []) console.log("file changed...here I will regenerate image texture", filesArray);

        //TODO
        //magic happens here

        return () => {
            //
        }
    }, [filesArray])//change to filesArray later

    */
    return (
        <NewDesignContext.Provider
            value={{
                designerBackground, setDesignerBackground,
                designName, setDesignName,
                garmentType, setGarmentType,
                garmentTypeName, setGarmentTypeName,
                filesArray, setFilesArray,
                garmentColorID, setGarmentColorID,
                designChanged, setDesignChanged,
            }}
        >
            <div className="designerPage page" >
                <div className="designerLeft"
                    style={{ backgroundColor: designerBackground }}
                >
                    <GarmentSelector />
                </div>
                <div className="designerRight">
                    <DesignSettings />
                </div>
            </div >
        </NewDesignContext.Provider>
    )
}

export default Designer