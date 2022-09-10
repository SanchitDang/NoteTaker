//rfc to create a template function autimatically 

import React from 'react'
import { useState } from 'react'

export default function TextForm(props) {
    
    const addNotesClick = () => {
        //setText("Clicked Set Text")     //useState function cretaed by us 
        //let notes = text
        alert("Note Added")
        alert(text)
    }
    const removeNotesClick = () => {
        alert("Note Removed")
    }

    const handleOnChange = (event) => {
        setText(event.target.value)
    }
    
    const [text, setText] = useState("")

    return (
        <div>
            <h1>{props.heading}</h1>
            <div className="mb-3">
                <textarea className="form-control" id="myBox" rows="8" placeholder='Enter Text' onChange={handleOnChange}></textarea>
            </div>
            <button className="btn btn-outline-primary mx-2" onClick={addNotesClick} >Add Notes</button>
            
            <button className="btn btn-outline-primary mx-2" onClick={removeNotesClick}>Remove Notes</button>

        </div>
    )
}
