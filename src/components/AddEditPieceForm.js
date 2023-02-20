import React, { useState, useEffect } from "react";

function AddEditPieceForm({ 
        musicLibrary, 
        setMusicLibrary, 
        editPiece,
        setEditPiece,
        editId,
        setEditId,
        title,
        setTitle,
        composer,
        setComposer,
        arranger,
        setArranger,
        notes,
        setNotes,
        genre,
        setGenre,
        difficulty,
        setDifficulty,
        numPlayers,
        setNumPlayers,
        refRecord,
        setRefRecord,
        showArr,
        setShowArr,
        showNotes,
        setShowNotes,
        showRefRecord,
        setShowRefRecord
    }){

    const [genreDropdownOptions, setGenreDropdownOptions] = useState(musicLibrary.map(p=>p.genre))
    const [createGenre, setCreateGenre] = useState(false)


    useEffect(()=>{ 
        setGenreDropdownOptions([...new Set(genreDropdownOptions)].map(genre=>{
            return <option key={genre}>{genre}</option>
        }))
    }, [musicLibrary, genre])


    function handleGenreSelect(e){
        setGenre(e.target.value)
        if(e.target.value === "*Create New Genre*"){
            setCreateGenre(true)
        }
    }

// Submit form for NEW piece
    function handleNewPieceSubmit(e){
        e.preventDefault();
        const newPiece = {
            title: title,
            composer: composer,
            arranger: arranger,
            difficulty: parseInt(difficulty.split('').shift()),
            number_of_players: parseInt(numPlayers),
            genre: genre,
            reference_recording: refRecord,
            notes: notes
        };
        console.log("before Fetch (NEW)", newPiece)
        fetch("http://localhost:9292/library", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newPiece)
        })
        .then(res=>res.json())
        .then(data=>setMusicLibrary([...musicLibrary, data]))
        // Resetting the form after submitting
        setTitle("")
        setComposer("")
        setArranger(null)
        setNotes(null)
        setGenre("--Select Genre--")
        setDifficulty("--Select Difficulty--")
        setNumPlayers("--Select Number of Players--")
        setRefRecord(null)
        if(showArr===true){
            setShowArr(false)
        }
        if(showNotes===true){
            setShowNotes(false)
        }
        if(showRefRecord===true){
            setShowRefRecord(false)
        }
    }

// Submit form for EDIT piece
    function handleEditPieceSubmit(e){
        e.preventDefault();
        const editedPiece = {
            title: title,
            composer: composer,
            arranger: arranger,
            difficulty: parseInt(difficulty.split('').shift()),
            number_of_players: parseInt(numPlayers),
            genre: genre,
            reference_recording: refRecord,
            notes: notes
        };
        console.log("before Fetch (EDIT)", editedPiece)
        fetch(`http://localhost:9292/library/${editId}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(editedPiece)
        })
        .then(res=>res.json())
        .then(data=>{
            const filtered_arr = [...musicLibrary.filter(p=>p.id !== editId)];
            filtered_arr.splice(editId - 1, 0, data )
            return setMusicLibrary(filtered_arr)
        })
        // Resetting the form after submitting
        setEditPiece(false)
        setEditId(null)
        setTitle("")
        setComposer("")
        setArranger(null)
        setNotes(null)
        setGenre("--Select Genre--")
        setDifficulty("--Select Difficulty--")
        setNumPlayers("--Select Number of Players--")
        setRefRecord(null)
        if(showArr===true){
            setShowArr(false)
        }
        if(showNotes===true){
            setShowNotes(false)
        }
        if(showRefRecord===true){
            setShowRefRecord(false)
        }
    }
    

    // Return JSX
    return(
    <div>
        <h2>Add A New Piece</h2>
        <form onSubmit={ editPiece ? handleEditPieceSubmit : handleNewPieceSubmit }>
            {/* Title */}
            <label>
                <input value={ title } onChange={e=>setTitle(e.target.value)}placeholder="Title" type="text" name="title" />
            </label>
            {/* Composer */}
            <label>
                <input value={ composer } onChange={e=>setComposer(e.target.value)}placeholder="Composer" type="text" name="composer" />
            </label>
            {/* Arranger - OPTIONAL */}
            { showArr ? <label>
                <input value={ arranger } onChange={e=>setArranger(e.target.value)}placeholder="Arranger" type="text" name="arranger" />
            </label> : null }
            {/* Difficulty */}
            <label>
                <select value={difficulty}onChange={e=>setDifficulty(e.target.value)} name="difficulty">
                    <option disabled >--Select Difficulty--</option>
                    <option>1 - Easy</option>
                    <option>2 - Med-Easy</option>
                    <option>3 - Medium</option>
                    <option>4 - Med-Advanced</option>
                    <option>5 - Advanced</option>
                </select>
            </label>
            {/* # of Players */}
            <label>
                <select value={numPlayers}onChange={e=>setNumPlayers(e.target.value)} name="numPlayers">
                    <option disabled >--Select Number of Players--</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12+</option>
                </select>
            </label>
            {/* Refence Recording - OPTIONAL */}
            { showRefRecord ? <label>
                <input value={ refRecord } onChange={e=>setRefRecord(e.target.value)}placeholder="Link to Reference Recording" type="text" name="reference recording" />
            </label> : null }
            {/* Notes - OPTIONAL */}
            { showNotes ? <label>
                <input value={ notes } onChange={e=>setNotes(e.target.value)}placeholder="Notes" type="text" name="notes" />
            </label> : null }
            {/* Genre Dropdown Menu */}
            <label>
            { createGenre ? <input type="text" placeholder="Enter New Genre" value={ createGenre ? null : genre} onChange={e=>setGenre(e.target.value)}/> 
                : <select value={genre}onChange={handleGenreSelect} name="genre">
                    <option disabled >--Select Genre--</option>
                    <option>*Create New Genre*</option>
                    {genreDropdownOptions}
                </select> }
            </label>

            {/* Buttons to include Optional Inputs */}
            <label>
                <input type="checkbox" onChange={()=>setShowArr(!showArr)}checked={showArr}/>
                Include arranger
            </label>
            <label>
                <input type="checkbox" onChange={()=>setShowRefRecord(!showRefRecord)}checked={showRefRecord}/>
                Include reference recording
            </label>
            <label>
                <input type="checkbox" onChange={()=>setShowNotes(!showNotes)} checked={showNotes}/>
                Include notes about the piece
            </label>
            <input type="submit" value="Submit" id="new-piece-submit" />
        </form>
    </div>
    )
};

export default AddEditPieceForm;