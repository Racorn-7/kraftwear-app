/**
 * Login function to log user in
 * @param {*} emailValue 
 * @param {*} passwordValue 
 * @param {*} setErrorMsg 
 * @param {*} setUser 
 * @param {*} setIsLoading 
 */

export function loginUser(emailValue, passwordValue, setErrorMsg, setUser, setIsLoading) {
  fetch('http://localhost:5000/api/user/login', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue
    })
  }).then(res => res.json())
    .then(res => {
      setIsLoading(false);
      if (!res.success)
        setErrorMsg(res.error);
      else
        setUser(res.success);
    })
    .catch(err => {
      setIsLoading(false);
      setErrorMsg(err);
      console.log(err);
    })
}

//register user
export function registerUser(body, setErrorMsg, setUser, setIsLoading) {
  fetch('http://localhost:5000/api/user/register', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      body
      )
  }).then(res => res.json())
    .then(res => {
      setIsLoading(false);
      if (!res.success) setErrorMsg(res.error);
      else {
        setUser(res.success);
      }
    })
    .catch(err =>
      console.log(err)
    )
}

//login staff
export function loginStaff(emailValue, passwordValue, setErrorMsg, setStaff, setIsLoading) {
  fetch('http://localhost:5000/api/user/staff-login', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue
    })
  }).then(res => res.json())
    .then(res => {
      setIsLoading(false);
      if (!res.success) {
        setErrorMsg(res.error);
      }
      else
        setStaff(res.success);
    })
    .catch(err => {
      setIsLoading(false);
      setErrorMsg(err);
      console.log(err);
    })
}

//register staff - TODO - use it inside Supervisor account
export function registerStaff(body, setErrorMsg, setStaff, setIsLoading) {
  fetch('http://localhost:5000/api/user/staff-register', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
    .then(res => {
      setIsLoading(false);
      if (!res.success) setErrorMsg(res.error);
      else {
        setStaff(res.success);
      }
    })
    .catch(err =>
      console.log(err)
    )
}