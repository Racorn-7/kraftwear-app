import React, { useContext, useState, useEffect } from 'react'
import './DesignerSettings.css'
import NewDesignContext from '../../Context/NewDesignContext';
import axios from 'axios';
import GarmentColorPicker from './GarmentColorPicker';
import DesignNameInput from './DesignerNameInput';
import DesignerImageSettings from './DesignerImageSettings';
import UserContext from '../../Context/UserContext';
import { useHistory } from 'react-router-dom';
import PageContext from '../../Context/PageContext';
import { saveNewDesign, updateDesign } from '../../Functions/liveDBfunctions';

const DesignSettings = () => {
  const {
    filesArray,
    designName,
    garmentColorID,
    garmentTypeName,
    designChanged,
    setDesignChanged
  } = useContext(NewDesignContext);
  const { activeDesignID, setActiveDesignID, designs, } = useContext(PageContext);
  const { user } = useContext(UserContext);
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState(null);
  const [closeBtnText, setCloseBtnText] = useState("close");
  const history = useHistory();
  const [activeDesign, setActiveDesign] = useState(null);
  //display errormessage for set period of time then hide
  useEffect(() => {
    if (message !== null) {
      var messageTimeout = setTimeout(() => {
        setMessage(null)
      }, 4000);
    }
    return () => {
      clearTimeout(messageTimeout);
      setMessage(null);
    }
  }, [message])

  //console.log("test: ", filesArray.length);
  useEffect(() => {
    if (activeDesignID) setActiveDesign(designs.filter(design => design._id === activeDesignID)[0]);
    return () => {
      //cleanup
    }
  }, [activeDesignID])
  //Only render save btn if fufficient amount opf info is set
  //TODO find a better solution
  useEffect(() => {
    //check if all values are set
    if (
      designName
      && designName != ""
      && garmentTypeName
      && filesArray
      && filesArray.length > 0
    ) {
      //check if there is an active design
      if (activeDesign) {
        if (
          activeDesign.name != designName
          || activeDesign.garmentTypeName != garmentTypeName
          || activeDesign.images != filesArray
          || activeDesign.garmentColor != garmentColorID
        ) {
          setDesignChanged(true);
        } else {
          setDesignChanged(false);
        }
      } else setDesignChanged(true);
    } else setDesignChanged(false);
    return () => {
      //
    }
  }, [designName, filesArray, garmentTypeName, garmentColorID])

  //create and submit formData => save to DB
  const saveDesignClicked = async (e) => {
    e.preventDefault();
    saveNewDesign(user, designName, garmentColorID, garmentTypeName, filesArray, setDesignChanged, setMessage);
  }

  //
  const updateClicked = (e) => {
    e.preventDefault();
    console.log("TODO overwrite design ID: ", activeDesignID );
    updateDesign(user, activeDesignID, designName, garmentColorID, garmentTypeName, filesArray, setDesignChanged, setMessage);
  }

  //CLOSE the design editor
  const closeDesigner = e => {
    e.preventDefault();
    if (!designChanged || closeBtnText === "discard") {
      setActiveDesignID(null);
      history.push('/');
    }
    else {
      setCloseBtnText("discard");
    }
  }

  //TODO FURTHER TESTING
  //SAVE IMAGE to server
  const saveImage = async () => {
    //TODO save images before saving design and add transformation data
    //SAVE IMAGE
    const formData = new FormData();
    formData.append('file', filesArray[0]);
    //TODO implement multiple file save!

    try {
      const res = await axios.post("http://localhost:5000/upload/single", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      //response from server
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      console.log("File uploaded with name: ", fileName);

    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  }

  //TESTING
  //TODO fetch from DB
  const colors = [
    { id: "colorID01", color: "black", stroke: "white" },
    { id: "colorID02", color: "white", stroke: "black" },
    { id: "colorID03", color: "red" },
    { id: "colorID04", color: "grey" },
    { id: "colorID05", color: "orange" },
    { id: "colorID06", color: "brown" },
    { id: "colorID07", color: "green" },
    { id: "colorID08", color: "blue" },
    { id: "colorID09", color: "yellow", stroke: "grey" },
    { id: "colorID10", color: "pink" }
  ];

  return (
    <form className="designSettings"
    //onSubmit={saveDesignClicked}
    >
      <div className="top">
        <DesignNameInput className="left" />
        <GarmentColorPicker className="right" colors={colors} />
      </div>

      <div className="middle">
        {/*
        <div>
          <label>description</label>
          <input type="text" placeholder="here" className="card" />
        </div>
        */}
        <DesignerImageSettings className="card" />
      </div>
      <div className="bottom">
        <p className="designerMessage">{message}</p>
        {//only render save button if design changed, so there is something to save
          (designChanged) ?
            <>
              {(activeDesign) ?
                <button
                  className="PsyButton overwriteBtn"
                  onClick={(e) => updateClicked(e)}
                >Update</button>
                :
                null
              }
              <button
                className="PsyButton saveBtn"
                onClick={(e) => saveDesignClicked(e)}
              >Save New</button>
            </>
            : null
        }
        <button
          className="PsyButton discardDesignBtn"
          onClick={e => closeDesigner(e)}
        >{closeBtnText}
        </button>
      </div>
    </form>
  )
}

export default DesignSettings
