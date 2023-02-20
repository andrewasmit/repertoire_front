import React, { useState } from "react";
import Piece from "./Piece";
import AddEditPieceForm from "./AddEditPieceForm";

function Library({ musicLibrary, setMusicLibrary }){
    const [title, setTitle] = useState("")
    const [composer, setComposer] = useState("")
    const [arranger, setArranger] = useState(null)
    const [notes, setNotes] = useState(null)
    const [genre, setGenre] = useState("--Select Genre--")
    const [difficulty, setDifficulty] = useState("--Select Difficulty--")
    const [numPlayers, setNumPlayers] = useState("--Select Number of Players--")
    const [refRecord, setRefRecord] = useState(null)

    const [showArr, setShowArr] = useState(false)
    const [showNotes, setShowNotes] = useState(false)
    const [showRefRecord, setShowRefRecord] = useState(false)
    const [editPiece, setEditPiece] = useState(false);
    const [editId, setEditId] = useState("")

    const piecesToDisplay = musicLibrary.map(p=>{
        return <Piece
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
    // console.log("In library", id)
    setEditPiece(true)
    setEditId(id)
    const piece = musicLibrary.filter(p=>p.id===id)[0]
    console.log(piece)
    setTitle(piece.title)
    setArranger(piece.arranger)
    setComposer(piece.composer)
    setDifficulty(piece.difficulty + " - " + difficultyToString(piece.difficulty))
    setGenre(piece.genre)
    // setNotes(piece.notes)
    setNumPlayers(piece.number_of_players)
    setRefRecord(piece.reference_recording)
    if(piece.reference_recording !== null){
        setShowRefRecord(true)
    } if (piece.arranger !== null){
        setShowArr(true)
    }
}


    return(
        <div  id ="library">
            {piecesToDisplay}
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
            />
        </div>
    )
};

export default Library;