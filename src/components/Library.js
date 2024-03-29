import React, { useState } from "react";
import Piece from "./Piece";
import AddEditPieceForm from "./AddEditPieceForm";
import { Button, Grid, Typography, Collapse } from "@mui/material";


function Library({ 
        musicLibrary, 
        setMusicLibrary, 
        handleNotify, 
        notify, 
        setNotify, 
        confirmDialog, 
        setConfirmDialog, 
        onConfirm, 
        handlePopUp, 
        allEnsembles, 
        concertPrograms }){

    const [title, setTitle] = useState("")
    const [composer, setComposer] = useState("")
    const [arranger, setArranger] = useState("")
    const [notes, setNotes] = useState("")
    const [genre, setGenre] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [numPlayers, setNumPlayers] = useState("")
    const [refRecord, setRefRecord] = useState("")

    const [showForm, setShowForm] = useState(false)
    const [showArr, setShowArr] = useState(false)
    const [showNotes, setShowNotes] = useState(false)
    const [showRefRecord, setShowRefRecord] = useState(false)
    const [editPiece, setEditPiece] = useState(false);
    const [editId, setEditId] = useState("")

    
    const piecesToDisplay = musicLibrary.map(p=>{
            return  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <Piece
                        title={p.title}
                        composer={p.composer}
                        arranger={p.arranger}
                        difficulty={p.difficulty}
                        number_of_players={p.number_of_players}
                        reference_recording={p.reference_recording}
                        genre={p.genre}
                        notes={p.notes}
                        id={p.id}
                        key={p.id}
                        setMusicLibrary={setMusicLibrary}
                        musicLibrary={musicLibrary}
                        handleEditPiece={handleEditPiece}
                        difficultyToString={difficultyToString}
                        handleNotify={handleNotify}
                        notify={notify}
                        setNotify={setNotify}
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                        handlePopUp={handlePopUp}
                        onConfirm={onConfirm}
                        showForm={showForm}
                        setShowForm={setShowForm}
                        allEnsembles={allEnsembles}
                        concertPrograms={concertPrograms}
                    />
                    </Grid>
    })

    function difficultyToString(int){
        if(int === 1){
            return "Easy"
        } if(int === 2){
            return "Med-Easy"
        } if(int===3){
            return "Medium"
        } if (int===4){
            return "Med-Advanced"
        }if(int===5){
            return "Advanced"
        }
    };

    // Auto-populating the form to edit
function handleEditPiece(id){
    resetForm();
    setShowForm(true);
    setEditPiece(true);
    setEditId(id);
    const piece = musicLibrary.filter(p=>p.id===id)[0];
    setTitle(piece.title);
    setComposer(piece.composer);
    setDifficulty(piece.difficulty + " - " + difficultyToString(piece.difficulty));
    setGenre(piece.genre);
    setNumPlayers(piece.number_of_players);
    if(piece.reference_recording !== null && piece.reference_recording !== ""){
        setShowRefRecord(true)
        setRefRecord(piece.reference_recording)
    } if (piece.arranger !== null && piece.arranger !== ""){
        setShowArr(true)
        setArranger(piece.arranger)
    }
}

function resetForm(){
    setEditPiece(false)
    setEditId(null)
    setTitle("")
    setComposer("")
    setArranger(null)
    setNotes(null)
    setGenre("")
    setDifficulty("")
    setNumPlayers("")
    setRefRecord(null)
    if(showArr===true){
        setShowArr(false)
    }
    if(showNotes===true){
        setShowNotes(false)
    }
    if(showRefRecord===true){
        setShowRefRecord(false)
    }if(editPiece===true){
        setEditPiece(false)
    }
    setShowForm(false)
}

function handleAddPieceClick(){
    resetForm();
    setShowForm(!showForm)
}


    return(
        <div  id ="library">
            <Typography variant="h4" component="h3" className="page-header">Music Library</Typography>
            <Button variant="outlined" size="small" onClick={handleAddPieceClick} >{ showForm ? "Hide Form" : "Add New Piece" }</Button>
            <Collapse in={showForm}>
                <AddEditPieceForm 
                    musicLibrary={ musicLibrary } 
                    setMusicLibrary={ setMusicLibrary } 
                    editPiece={ editPiece }
                    setEditPiece={setEditPiece}
                    editId={editId}
                    setEditId={setEditId}
                    title={title}
                    setTitle={setTitle}
                    composer={composer}
                    setComposer={setComposer}
                    arranger={arranger}
                    setArranger={setArranger}
                    notes={notes}
                    setNotes={setNotes}
                    genre={genre}
                    setGenre={setGenre}
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                    difficultyToString={difficultyToString}
                    numPlayers={numPlayers}
                    setNumPlayers={setNumPlayers}
                    refRecord={refRecord}
                    setRefRecord={setRefRecord}
                    showArr={showArr}
                    setShowArr={setShowArr}
                    showNotes={showNotes}
                    setShowNotes={setShowNotes}
                    showRefRecord={showRefRecord}
                    setShowRefRecord={setShowRefRecord}
                    resetForm={resetForm}
                    handleNotify={handleNotify}
                />
            </Collapse>
            <Grid container spacing={2}>
                {piecesToDisplay}
            </Grid>
        </div>
    )
};

export default Library;