import React from 'react'

const List = (props) => {
  return (
    <>
      <ul className="List">
        <li className="ListHeader">
          <h2>{props.title || "What a nice day"}</h2>
          <h3>{props.subtitle || null}</h3>
        </li>
        {//render the list items or a generic message
          (props.itemsArray.length > 0) ?
            props.itemsArray :
            props.messageIfEmpty
        }
      </ul>
    </>
  )
}

export default List
