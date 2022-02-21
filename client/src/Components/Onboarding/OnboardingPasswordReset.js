import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import InputField from '../_ReusableComponents/InputField'
import PsyButton from '../_ReusableComponents/PsyButton'
import LoginContext from '../../Context/LoginContext'

const OnboardingPasswordReset = (props) => {
  //deconstructing context variables
  const { emailValue, setEmailValue,
    errorMsg,
    isLoading,
  } = useContext(LoginContext);


  const resetPassword = () => {
    return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailValue))
  }

  return (
    <>
      <InputField
        name="emailReset"
        type="email"
        placeholder="Your email address..."
        autoComplete="username"
        updateValue={setEmailValue}
        disabled={isLoading}>
      </InputField>

      <p className="ErrorMsg">
        {(errorMsg) ?
          ((isLoading) ?
            null :
            errorMsg) : null}
      </p>

      <PsyButton
        className="LoginBtn"//??
        text="Password reset"
        action={() => resetPassword(emailValue)}
        postAction={
          () => {
            alert("email sent");//replace!
            window.location.replace("/");
          }
        }
        delay="true"
        errorMsg="No user found with this email!"
      />

      <Link
        to="/"
        className="BackBtn"
        disabled={isLoading}
      >
        <p> Back</p>
      </Link>
    </>
  )
}

export default OnboardingPasswordReset