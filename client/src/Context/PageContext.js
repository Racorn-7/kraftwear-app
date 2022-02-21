import React from 'react';

/**
* "Context is designed to share data that can be considered 
* “global” for a tree of React components.."
* quoted from react documentation: 
* https://reactjs.org/docs/context.html
*/
const PageContext = React.createContext(false);//initial value is false
export const PageProvider = PageContext.Provider;
export const PageConsumer = PageContext.Consumer;
export default PageContext;