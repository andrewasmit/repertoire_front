import React, { useState } from "react";
import { Typography, Button, Link } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


function Piece(props){
    const [showAddNote, setShowAddNote] = useState(false);
    const [newNote, setNewNote] = useState("");

    const notesToDisplay = props.notes.map(n=>{
        if(n.note !== undefined){
            return <div>
                        <Typography variant="body2" component="p">{n.note}</Typography>
                        {/* <Button variant="outlined"id={n.id} onClick={handleDeleteNote}>x</Button> */}
                        <IconButton aria-label="delete" size="small" id={n.id} onClick={handleDeleteNote}>
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
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

    function handleDeletePiece(e){
        e.preventDefault();
        fetch(`http://localhost:9292/library/${props.id}`, {
            method: "DELETE",
        })
        .then(res=>res.json())
        .then(data=>props.setMusicLibrary(data))
    }

    // Function passed up to Library to handle state properly
    function handleEditPieceClick(){
        props.handleEditPiece(props.id)
    }

    
    // Return of JSX
    return(
        <div className="library-card">
            <Typography variant="h5" component="h4">"{props.title}"</Typography>
            <Typography variant="subtitle1" component="h5">{props.composer}</Typography>
            { props.arranger === null ? null : <Typography variant="subtitle2" component="h6">Arr: {props.arranger}</Typography> }
        
            <Typography variant="body2" component="p">Difficulty: {props.difficultyToString(props.difficulty)}</Typography>
            <Typography variant="body2" component="p">Genre: {props.genre === "--Select Genre--" ? null : props.genre}</Typography> 
            <Typography variant="body2" component="p">Number of Players: {props.number_of_players}</Typography> 
            { props.notes.length === 0 ? null : <Typography variant="subtitle2" component="h4">Notes: </Typography> }
            {notesToDisplay}
            {showAddNote ? <form onSubmit={handleAddNote}><input type="text" value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add new note"/><input type="submit" value="Submit"/></form> : null}
            <Button variant="contained" onClick={()=>setShowAddNote(!showAddNote)}>Add Note!</Button>
            {props.reference_recording === null ? 
            null : <Link href={props.reference_recording} target="_blank" rel="noreferrer">Reference Recording</Link> }
            <Button variant="contained" onClick={handleEditPieceClick}>Edit Piece</Button>
            {/* <Button variant="outlined" onClick={handleDeletePiece}>Delete From Library</Button> */}
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDeletePiece}> Delete From Library</Button>
        </div>
    )
};

export default Piece;