import React, { useState } from "react";
import Piece from "./Piece";
import AddEditPieceForm from "./AddEditPieceForm";
import { Button, Grid, Typography } from "@mui/material";

function Library({ musicLibrary, setMusicLibrary }){
    const [title, setTitle] = useState("")
    const [composer, setComposer] = useState("")
    const [arranger, setArranger] = useState("")
    const [notes, setNotes] = useState("")
    const [genre, setGenre] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [numPlayers, setNumPlayers] = useState("")
    const [refRecord, setRefRecord] = useState("")

    const [showArr, setShowArr] = useState(false)
    const [showNotes, setShowNotes] = useState(false)
    const [showRefRecord, setShowRefRecord] = useState(false)
    const [editPiece, setEditPiece] = useState(false);
    const [editId, setEditId] = useState("")

    
    const piecesToDisplay = musicLibrary.map(p=>{
        return <Grid item xs={4}>
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

function handleEditPiece(id){
    setEditPiece(true)
    setEditId(id)
    const piece = musicLibrary.filter(p=>p.id===id)[0]
    setTitle(piece.title)
    setArranger(piece.arranger)
    setComposer(piece.composer)
    setDifficulty(piece.difficulty + " - " + difficultyToString(piece.difficulty))
    setGenre(piece.genre)
    setNumPlayers(piece.number_of_players)
    setRefRecord(piece.reference_recording)
    if(piece.reference_recording !== null){
        setShowRefRecord(true)
    } if (piece.arranger !== null){
        setShowArr(true)
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
}

function handleAddPieceClick(){
    resetForm();
    // Trigger Pop-Up
}


    return(
        <div  id ="library">
            <Typography variant="h4" component="h3">Music Library</Typography>
            <Button variant="outlined" size="small" onClick={handleAddPieceClick}>Add New Piece</Button>
            <Grid container spacing={4}>
                {piecesToDisplay}
            </Grid>
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
            />
        </div>
    )
};

export default Library;