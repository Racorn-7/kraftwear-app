import React from 'react';

/**
* "Context is designed to share data that can be considered 
* “global” for a tree of React components.."
* quoted from react documentation: 
* https://reactjs.org/docs/context.html
*/
const NewDesignContext = React.createContext(false);//initial value is false
export const NewDesignProvider = NewDesignContext.Provider;
export const NewDesignConsumer = NewDesignContext.Consumer;
export default NewDesignContext;