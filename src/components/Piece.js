import React, { useState } from "react";
import Notification from "./Notification";
import Confirmation from "./Confirmation";
import { Fab, TextField, Typography, Button, ButtonGroup, Link, Grid } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/Delete';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import NavigationIcon from '@mui/icons-material/Navigation';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function Piece(props){
    const [showAddNote, setShowAddNote] = useState(false);
    const [newNote, setNewNote] = useState("");
    const [showNotes, setShowNotes] = useState(false);

    const notesToDisplay = props.notes.map(n=>{
        if(props.notes.length !== 0){
            return <div className="card-note">
                    <Grid container spacing={1}>
                        <Grid item xs={9}>
                            <Typography variant="body2" component="p">{n.note}</Typography>
                        </Grid>
                        <Grid item xs={2} id={n.id} className="card-delete-note">
                            <Button id={n.id} variant="outlined" size="small" onClick={handleDeleteNote}>x</Button>
                        </Grid>
                    </Grid>
                    </div>
        } else
        return  <div id={n.id}>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p">No note for {props.title}</Typography>
                    </Grid>
                </div>
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
        setShowNotes(true)
        setNewNote("")
        props.handleNotify(`Note for "${props.title}" successfully added.`)
    }

    function handleDeleteNote(e){
        e.preventDefault(); 
        fetch(`http://localhost:9292/library/notes/${e.target.id}`, {
            method: "DELETE",
        })
        .then(res=>res.json())
        .then(data=>{
            const filtered_arr = [...props.musicLibrary.filter(p=>p.id !== props.id)];
            filtered_arr.splice(props.id - 1, 0, data )
            return props.setMusicLibrary(filtered_arr) 
        })
        props.handleNotify(`Note for "${props.title}" successfully deleted.`, "error")
    }

    function handleDeletePiece(){
        // e.preventDefault();
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
        <Paper elevation={4} className="library-card">
            <Typography variant="h5" component="h4" className="card-title">"{props.title}"</Typography>
            <Typography variant="subtitle1" component="h5" className="card-composer">{props.composer}</Typography>
            { props.arranger === null ? null : <Typography variant="subtitle2" component="h6">Arr: {props.arranger}</Typography> }
        
            <Typography variant="body2" component="p" className="card-body"><strong>Difficulty: </strong>{props.difficultyToString(props.difficulty)}</Typography>
            <Typography variant="body2" component="p" className="card-body"><strong>Genre: </strong>{props.genre === "--Select Genre--" ? null : props.genre}</Typography> 
            <Typography variant="body2" component="p" className="card-body"><strong>Number of Players: </strong>{props.number_of_players}</Typography> 
            {props.reference_recording === null ? 
            null : <Link href={props.reference_recording} target="_blank" rel="noreferrer"><strong>Reference Recording</strong></Link> }            
            <ButtonGroup maxWidth variant="text" size="large" aria-label="small button group" className="button-group">
                <Button  onClick={()=>setShowNotes(!showNotes)}>{showNotes ? "Hide Notes" : "Show Notes" }</Button>
                <Button  onClick={()=>setShowAddNote(!showAddNote)}>{showAddNote ? "Discard Note" : "Add Note" }</Button>
            </ButtonGroup>
            { showNotes ? <Typography variant="subtitle2" component="h4">Notes: </Typography> : null }
            { showNotes ? notesToDisplay : null }
            { showNotes && notesToDisplay.length === 0 ? <Typography variant="body2" component="p">Currently no notes for {props.title}</Typography> : null }
            {showAddNote ? <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate                    
                autoComplete="off"
                onSubmit={handleAddNote}
            >
                <TextField
                    id="new-note-form"
                    label="New Note"
                    value={newNote}
                    onChange={e=>setNewNote(e.target.value)}
                />
                <Fab type="submit" variant="extended"><NavigationIcon sx={{ mr: 1 }} />Add Note!</Fab>
            </Box> : null }
            <Button size="small" variant="contained" onClick={handleEditPieceClick} className="card-button-group">Edit Piece</Button>
            <Button size="small" variant="outlined" className="card-button-group" startIcon={<DeleteIcon />} onClick={props.handlePopUp} >Delete</Button>
            <Notification notify={props.notify} setNotify={props.setNotify}/>
            <Confirmation 
                    confirmDialog={props.confirmDialog} 
                    setConfirmDialog={props.setConfirmDialog} 
                    onConfirm={()=>props.onConfirm(`"${props.title} by: ${props.composer}" deleted succesfully`, "error", handleDeletePiece)}/>
        </Paper>
    )
};

export default Piece;