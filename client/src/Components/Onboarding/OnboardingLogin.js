import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import InputField from '../_ReusableComponents/InputField'
import PsyButton from '../_ReusableComponents/PsyButton'
import LoginContext from '../../Context/LoginContext'
import UserContext from '../../Context/UserContext'
//import { USE_MOCK_DB } from '../../Functions/USE_MOCK'
//import { loginUserMock } from '../../Functions/mockLoginUser'
import { loginUser } from '../../Functions/liveUserAuth'

/**
*
*/
const OnboardingLogin = (props) => {
  //deconstructing context variables
  const { setUser } = useContext(UserContext);
  const { emailValue, setEmailValue,
    passwordValue, setPasswordValue,
    errorMsg, setErrorMsg,
    isLoading, setIsLoading
  } = useContext(LoginContext);

  //submiting field data
  const handleSubmit = async (e, d) => {
    e.preventDefault();
    if (errorMsg) setErrorMsg(null)
    setIsLoading(true);

    setTimeout(() => {
      loginUser(emailValue, passwordValue, setErrorMsg, setUser, setIsLoading)
    }, (d) ? "3000" : "200"
    );
  }

  return (
    <>
      {/* EMAIL INPUT */}
      <InputField
        name="email"
        type="email"
        placeholder="Your email address..."
        autoComplete="username"
        updateValue={setEmailValue}
        value={emailValue}
        disabled={isLoading}>
      </InputField>

      {/* PASSWORD INPUT */}
      <InputField
        name="password"
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        updateValue={setPasswordValue}
        value={passwordValue}
        disabled={isLoading}>
      </InputField>

      {//Forgot Password button
        <Link
          to="/password-reset"
          className={`ForgotPassword ${(isLoading) && " disabledLink"}`}
        >
          <p>Forgot my password</p>
        </Link>
      }
      {//ERROR MESSSAGE
        <p className="ErrorMsg">
          {(errorMsg) && ((!isLoading) && errorMsg)}
        </p>
      }
      {//BUTTON
        <PsyButton
          className="LoginBtn"
          text="Get me in"
          onClick={
            (e) => handleSubmit(
              e, (emailValue && passwordValue))
          }
        />
      }
      {//REGISTER BUTTON
        <Link
          to="/register"
          className={`HaveNoAccount ${(isLoading) && " disabledLink"}`}
          onClick={(e) => setErrorMsg(null)}
        >
          <p>I don't have an account</p>
          <p>Register Me!</p>
        </Link>
      }
    </>
  )
}

export default OnboardingLogin