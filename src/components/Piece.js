import React, { useState } from "react";

function Piece(props){

    const [showAddNote, setShowAddNote] = useState(false);
    const [newNote, setNewNote] = useState("");

    const notesToDisplay = props.notes.map(n=>{
        if(n.note !== undefined){
            return <div>
                        <p>{n.note}</p>
                        <button id={n.id} onClick={handleDeleteNote}>x</button>
                    </div>
        }
    });


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

    function handleDeleteNote(e){
        e.preventDefault();
        console.log("Delete note w/ the note_id of: ", e.target.id)
        fetch(`http://localhost:9292/library/notes/${e.target.id}`, {
            method: "DELETE",
        })
        .then(res=>res.json())
        .then(data=>{
            const filtered_arr = [...props.musicLibrary.filter(p=>p.id !== props.id)];
            filtered_arr.splice(props.id - 1, 0, data )
            return props.setMusicLibrary(filtered_arr) 
        })
    }

    function handleEditPieceClick(){
        props.handleEditPiece(props.id)
    }

    
    // Return of JSX
    return(
        <div className="library-card">
            <h4>"{props.title}"</h4>
            <h5>{props.composer}</h5>
            { props.arranger === null ? null : <h6>Arr: {props.arranger}</h6> }
            <p>Difficulty: {props.difficultyToString(props.difficulty)}</p>
            <p>Genre: {props.genre === "--Select Genre--" ? null : props.genre}</p> 
            <p>Number of Players: {props.number_of_players}</p> 
            { props.notes.length === 0 ? null : <h4>Notes: </h4> }
            {notesToDisplay}
            {showAddNote ? <form onSubmit={handleAddNote}><input type="text" value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add new note"/><input type="submit" value="Submit"/></form> : null}
            <button onClick={()=>setShowAddNote(!showAddNote)}>Add Note!</button>
            {props.reference_recording === null ? 
            null : <a href={props.reference_recording} target="_blank" rel="noreferrer">Reference Recording</a> }
            <button onClick={handleEditPieceClick}>Edit Piece</button>
        </div>
    )
};

export default Piece;