import React from 'react'
import './Artbrowser.css'
import { useHistory } from 'react-router-dom'

const Artbrowser = () => {
  const history = useHistory();

  //redirect to different page
  const redirect = (slashTo) => {   
    history.push(slashTo);
  }

  return (
    <div className="Artbrowser page">
      <p>This feature is coming soon!</p>
      <p>You will be able to browse from a ton of Artist-made designs!</p>
      <p>For now you can only use your own designs.</p>
      <button onClick={() => redirect('/designer')}>Create your own design</button>
    </div>
  )
}

export default Artbrowser
