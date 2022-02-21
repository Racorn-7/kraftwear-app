import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import InputField from '../_ReusableComponents/InputField'
import PsyButton from '../_ReusableComponents/PsyButton'
import LoginContext from '../../Context/LoginContext'
import UserContext from '../../Context/UserContext'
import { registerUser, registerStaff } from '../../Functions/liveUserAuth'

const OnboardingRegisterOne = (props) => {
  const {
    newEmailValue, setNewEmailValue,
    newPasswordValue, setNewPasswordValue,
    passwordCheckValue, setPasswordCheckValue,
    firstNameValue, setFirstNameValue,
    lastNameValue, setLastNameValue,
    errorMsg, setErrorMsg,
    isLoading, setIsLoading
  } = useContext(LoginContext)
  const { setUser, setStaff } = useContext(UserContext)
  const [path, setPath] = useState("register-one")

  //validate name fields
  const validateNames = async (e) => {
    e.preventDefault();
    if (errorMsg) setErrorMsg(null);
    setIsLoading(true);

    // switch back from loading after faked delay
    setTimeout(() => {
      if (firstNameValue && lastNameValue) {
        setErrorMsg(null);
        setPath("register-two");
      }
      else
        setErrorMsg("Name fields cannot be empty");
      setIsLoading(false);
    }, "200")
  }

  // validate login form input values and initiate login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorMsg) setErrorMsg(null);
    setIsLoading(true);

    // switch back from loading after faked delay
    setTimeout(() => {
      const body =
      {
        fname: firstNameValue,
        lname: lastNameValue,
        email: newEmailValue,
        password: newPasswordValue
      }
      registerUser(body, setErrorMsg, setUser, setIsLoading);
      setIsLoading(false);
    }, "2000")
  }

  return (
    <>
      {//render appropriate input fields
        (path === "register-one")
          ?//we are on register-one page
          <>
            <InputField
              key="fname"
              name="fname"
              type="text"
              placeholder="First name"
              value={firstNameValue}
              updateValue={setFirstNameValue}
              disabled={isLoading}>
            </InputField>
            <InputField
              key="lname"
              name="lname"
              type="text"
              placeholder="Last name"
              value={lastNameValue}
              updateValue={setLastNameValue}
              disabled={isLoading}>
            </InputField>
          </>
          :// we are on register-two page
          <>
            <InputField
              key="email"
              name="newEmail"
              type="email"
              placeholder="Your email address..."
              autoComplete="username"
              value={newEmailValue}
              updateValue={setNewEmailValue}
              disabled={isLoading}>
            </InputField>
            <InputField
              key="password"
              name="newPassword"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              value={newPasswordValue}
              updateValue={setNewPasswordValue}
              disabled={isLoading}>
            </InputField>
            <InputField
              key="password-check"
              name="newPasswordCheck"
              type="password"
              placeholder="Password again"
              autoComplete="new-password"
              value={passwordCheckValue}
              updateValue={setPasswordCheckValue}
              disabled={isLoading}>
            </InputField>
          </>
      }

      <p className="ErrorMsg">
        <mark>
          {(errorMsg) && ((!isLoading) && errorMsg)}
        </mark>
      </p>

      <PsyButton
        className="RegisterBtn"//??
        text={(path === "register-one") ? "Next" : "Let's Go"}
        onClick={
          (path === "register-one") ?
            //we are on register-one page
            (e) =>
              //validate name fields and go to regpage2
              validateNames(e)
            :
            //we are on register-two page
            (e) => handleSubmit(e)
        }
      />

      <Link to={(path === "register-one") ? "/" : "/register"}
        onClick={() => {
          (path === "register-one") ? setPath(null) : setPath("register-one");
        }}
        className="BackBtn"
        disabled={isLoading}
      >
        <p> Back</p>
      </Link>
    </>
  )
}

export default OnboardingRegisterOne