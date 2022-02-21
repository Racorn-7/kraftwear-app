import React from 'react';

/**
* "Context is designed to share data that can be considered 
* “global” for a tree of React components.."
* quoted from react documentation: 
* https://reactjs.org/docs/context.html
*/
const UserContext = React.createContext(false);//initial value is false
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default UserContext;