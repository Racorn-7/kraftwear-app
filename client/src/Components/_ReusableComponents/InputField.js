import React from 'react'
import '../../css/InputField.css'
import IconEmail from './IconEmail'
import IconPassword from './IconPassword'

/**
* Form input component
*/
const InputField = (props) => {
    const renderFieldIcon = (keyword) => {
        switch (keyword) {
            case "email":
                return <IconEmail size="3.5em" className="inputFieldIcon" />;
            case "newEmail":
                return <IconEmail size="3.5em" className="inputFieldIcon" />;
            case "emailReset":
                return <IconEmail size="3.5em" className="inputFieldIcon" />;
            case "password":
                return <IconPassword size="3.5em" className="inputFieldIcon" />;
            case "newPassword":
                return <IconPassword size="3.5em" className="inputFieldIcon" />;
            case "newPasswordCheck":
                return <IconPassword size="3.5em" className="inputFieldIcon" />;
            case "fname":
                return null//TODO add icon
            case "lname":
                return null//TODO add icon
            default:
                return null;
        }
    }

    return (
        <div className="inputField">
            {renderFieldIcon(props.name)}
            <input
                className="inputText"
                type={props.type}
                autoComplete={props.autoComplete}
                placeholder={props.placeholder}
                disabled={props.disabled}
                onChange={event => props.updateValue(event.target.value)}
                value={ props.value || ""}
            />
        </div>
    )
}
export default InputField