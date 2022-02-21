import React from 'react';

/**
* "Context is designed to share data that can be considered 
* “global” for a tree of React components.."
* quoted from react documentation: 
* https://reactjs.org/docs/context.html
*/
const LoginContext = React.createContext(false);//initial value is false
export const LoginProvider = LoginContext.Provider;
export const LoginConsumer = LoginContext.Consumer;
export default LoginContext;