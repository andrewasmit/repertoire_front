import React, { useState } from "react";

function Piece(props){

    // const [editPiece, setEditPiece] = useState(false)
    const [showAddNote, setShowAddNote] = useState(false);
    const [newNote, setNewNote] = useState("");

    const notesToDisplay = props.notes.map(n=>{
        if(n.note !== undefined){
            return <p>{n.note}</p>
        }
    });

    function difficultyToString(int){
        if(int === 1){
            return "Easy"
        } if(int === 2){
            return "Medium-Easy"
        } if(int===3){
            return "Medium"
        } if (int===4){
            return "Medium-Advanced"
        }if(int===5){
            return "Advanced"
        }
    };

    function handleAddNote(e){
        e.preventDefault();
        console.log("Piece with ID of", props.id, "clicked.");
        console.log("Before Fetch: ", newNote);
        const noteToPost = {note: newNote}
        fetch(`http://localhost:9292/library/${props.id}`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"            
            },
            body: JSON.stringify(noteToPost)
        })
        .then(res=>res.json())
        .then(data=>{
            const filtered_arr = [...props.musicLibrary.filter(p=>p.id !== props.id)];
            filtered_arr.splice(props.id - 1, 0, data )
            return props.setMusicLibrary(filtered_arr) 
        })
        // Reset "Add Note!" button and input
        setShowAddNote(!showAddNote)
        setNewNote("")
    }

    // console.log(props.musicLibrary.splice((props.id - 1), 1, data))
    

    // Return of JSX
    return(
        <div className="library-card">
            <h4>"{props.title}"</h4>
            <h5>{props.composer}</h5>
            { props.arranger === null ? null : <h6>Arr: {props.arranger}</h6> }
            <p>Difficulty: {difficultyToString(props.difficulty)}</p>
            <p>Genre: {props.genre}</p>
            <p>Number of Players: {props.number_of_players}</p>
            { props.notes.length === 0 ? null : <h4>Notes: </h4> }
            {notesToDisplay}
            {showAddNote ? <form onSubmit={handleAddNote}><input type="text" value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add new note"/><input type="submit" value="Submit"/></form> : null}
            <button onClick={()=>setShowAddNote(!showAddNote)}>Add Note!</button>
            <a href={props.reference_recording} target="_blank" rel="noreferrer">Reference Recording</a>
        </div>
    )
};

export default Piece;