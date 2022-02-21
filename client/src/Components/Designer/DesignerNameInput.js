import React, { useContext } from 'react';
import InputField from '../_ReusableComponents/InputField';
import NewDesignContext from '../../Context/NewDesignContext';

const DesignNameInput = (props) => {
  const {
    designName, setDesignName,
  } = useContext(NewDesignContext);
  
  return (
    <div className={props.className}>
      <label>Design name</label>
      <InputField
        name="designName"
        type="text"
        placeholder="Design name.."
        updateValue={setDesignName}
        value={designName}
        disabled={false}>
      </InputField>
    </div>
  )
}

export default DesignNameInput
