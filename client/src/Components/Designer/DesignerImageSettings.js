import React, { useContext, useRef, useState, useEffect } from 'react'
import NewDesignContext from '../../Context/NewDesignContext';
import DesignerImageLayer from './DesignerImageLayer';
import { v4 as uuidv4 } from 'uuid';

const DesignerImageSettings = (props) => {
  const {
    filesArray, setFilesArray
  } = useContext(NewDesignContext);
  const [filePathArray, setFilePathArray] = useState([]);//for storing fies on the server once design is saved

  const imageUploadRef = useRef(null);

  const openFileBrowser = (e) => {
    //TODO save files to DB
    //TODO

    //then store names locally (to display in stack)
    const newfilenames = Array.from(e.target.files).map(file => file.name);
    setFilePathArray([ ...filePathArray, ...e.target.files]);
    setFilesArray([...filesArray, ...newfilenames]);
  }

  /*
  //SAVE IMAGE to server
  //proposed storage location: uploads/<<design._id>>/
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
  */

  return (
    <div className={props.className}>
      <div className="imageLayerStack">
        {(filesArray.length > 0) ?
          filesArray.map(file =>
            //<DesignerImageLayer fileName={file.name} key={uuidv4()} />//TODO add unique key
            <DesignerImageLayer fileName={file} key={uuidv4()} />//TODO add unique key
          )
          : null}
      </div>
      <input type="file"
        name="file"
        multiple
        onChange={(e) => openFileBrowser(e)}
        style={{ display: "none" }}
        ref={(r) => { imageUploadRef.current = r }}
      />
      <button
        className="PsyButton imageUpoadBtn"
        onClick={(e) => {
          e.preventDefault();
          imageUploadRef.current.click(e);
        }}
      >Upload Image(s)
    </button>
    </div>
  )
}

export default DesignerImageSettings
