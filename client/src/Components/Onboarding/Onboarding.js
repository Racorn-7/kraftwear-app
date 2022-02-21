import React, { useState } from 'react'
import FeatureColumn from '../_ReusableComponents/FeatureColumn'
import LoginContext from '../../Context/LoginContext'
import Logo_1 from '../../img/logo_.png'
import Logo_2 from '../../img/logo_@2x.png'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import OnboardingLogin from './OnboardingLogin'
import OnboardingRegister from './OnboardingRegister'
import './LoginForm.css'
import './Onboarding.css'
import OnboardingPasswordReset from './OnboardingPasswordReset'
import StaffLogin from './StaffLogin'


/**
* Use this user to login as Customer
* Email address: bob@bob.com
* Password: 123456
*/
const Onboarding = () => {
    const [emailValue, setEmailValue] = useState(null);
    const [passwordValue, setPasswordValue] = useState(null);
    const [firstNameValue, setFirstNameValue] = useState(null);
    const [lastNameValue, setLastNameValue] = useState(null);
    const [newEmailValue, setNewEmailValue] = useState(null);
    const [newPasswordValue, setNewPasswordValue] = useState(null);
    const [passwordCheckValue, setPasswordCheckValue] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loginTitle, setLoginTitle] = useState("Welcome to Kraftwear");
    const [loginSubTitle, setLoginSubTitle] = useState("The place to be unique");

    return (
        <div className="Onboarding page">
            <div className="Feature">
                <FeatureColumn count="6" />
                <FeatureColumn count="6" />
                <FeatureColumn count="6" />
            </div>
            <LoginContext.Provider
                value={{
                    emailValue, setEmailValue,
                    passwordValue, setPasswordValue,
                    firstNameValue, setFirstNameValue,
                    lastNameValue, setLastNameValue,
                    newEmailValue, setNewEmailValue,
                    newPasswordValue, setNewPasswordValue,
                    passwordCheckValue, setPasswordCheckValue,
                    errorMsg, setErrorMsg,
                    isLoading, setIsLoading,
                    loginTitle, setLoginTitle,
                    loginSubTitle, setLoginSubTitle
                }}>
                <form className="LoginForm" >
                    <img
                        className="logo"
                        src={Logo_1}
                        srcSet={`${Logo_1} 1x, ${Logo_2} 2x`}
                        alt="Logo"
                    />
                    <div className="LoginMessage">
                        <h1>{loginTitle}</h1>
                        <h2>{loginSubTitle}</h2>
                    </div>
                    <Router>
                        <Switch>
                            <Route
                                path="/" exact
                                component={OnboardingLogin}
                            />
                            <Route
                                path="/office" exact
                                component={StaffLogin}
                            />
                            <Route
                                path="/register"
                                component={OnboardingRegister}
                            />
                            <Route
                                path="/password-reset"
                                component={OnboardingPasswordReset}
                            />
                            {/* catch invalid URL path's and redirect to login */}
                            <Route render={() => <Redirect to={{ pathname: "/" }} />} />
                        </Switch>
                    </Router>
                </form>
            </LoginContext.Provider>
        </div>

    )
}

export default Onboarding
