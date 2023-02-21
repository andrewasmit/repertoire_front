import React, { useState, useEffect } from "react";

function AddEditPieceForm(props){

    const [genreDropdownOptions, setGenreDropdownOptions] = useState(props.musicLibrary.map(p=>p.genre))
    const [createGenre, setCreateGenre] = useState(false)


    useEffect(()=>{ 
        setGenreDropdownOptions([...new Set(genreDropdownOptions)].map(genre=>{
            return <option key={props.genre}>{props.genre}</option>
        }))
    }, [props.musicLibrary, props.genre])


    function handleGenreSelect(e){
        props.setGenre(e.target.value)
        if(e.target.value === "*Create New Genre*"){
            setCreateGenre(true)
        }
    }

// Submit form for NEW piece
    function handleNewPieceSubmit(e){
        e.preventDefault();
        const newPiece = {
            title: props.title,
            composer: props.composer,
            arranger: props.arranger,
            difficulty: parseInt(props.difficulty.split('').shift()),
            number_of_players: parseInt(props.numPlayers),
            genre: props.genre,
            reference_recording: props.refRecord,
            notes: props.notes
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
        .then(data=>props.setMusicLibrary([...props.musicLibrary, data]))
        // Resetting the form after submitting
        props.setTitle("")
        props.setComposer("")
        props.setArranger(null)
        props.setNotes(null)
        props.setGenre("--Select Genre--")
        props.setDifficulty("--Select Difficulty--")
        props.setNumPlayers("--Select Number of Players--")
        props.setRefRecord(null)
        if(props.showArr===true){
            props.setShowArr(false)
        }
        if(props.showNotes===true){
            props.setShowNotes(false)
        }
        if(props.showRefRecord===true){
            props.setShowRefRecord(false)
        }
    }

// Submit form for EDIT piece
    function handleEditPieceSubmit(e){
        e.preventDefault();
        const editedPiece = {
            title: props.title,
            composer: props.composer,
            arranger: props.arranger,
            difficulty: parseInt(props.difficulty.split('').shift()),
            number_of_players: parseInt(props.numPlayers),
            genre: props.genre,
            reference_recording: props.refRecord,
            notes: props.notes
        };
        console.log("before Fetch (EDIT)", editedPiece)
        fetch(`http://localhost:9292/library/${props.editId}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(editedPiece)
        })
        .then(res=>res.json())
        .then(data=>{
            const filtered_arr = [...props.musicLibrary.filter(p=>p.id !== props.editId)];
            filtered_arr.splice(props.editId - 1, 0, data )
            return props.setMusicLibrary(filtered_arr)
        })
        // Resetting the form after submitting
        props.setEditPiece(false)
        props.setEditId(null)
        props.setTitle("")
        props.setComposer("")
        props.setArranger(null)
        props.setNotes(null)
        props.setGenre("--Select Genre--")
        props.setDifficulty("--Select Difficulty--")
        props.setNumPlayers("--Select Number of Players--")
        props.setRefRecord(null)
        if(props.showArr===true){
            props.setShowArr(false)
        }
        if(props.showNotes===true){
            props.setShowNotes(false)
        }
        if(props.showRefRecord===true){
            props.setShowRefRecord(false)
        }
    }
    

    // Return JSX
    return(
    <div>
        <h2>Add A New Piece</h2>
        <form onSubmit={ props.editPiece ? handleEditPieceSubmit : handleNewPieceSubmit }>
            {/* Title */}
            <label>
                <input value={ props.title } onChange={e=>props.setTitle(e.target.value)}placeholder="Title" type="text" name="title" />
            </label>
            {/* Composer */}
            <label>
                <input value={ props.composer } onChange={e=>props.setComposer(e.target.value)}placeholder="Composer" type="text" name="composer" />
            </label>
            {/* Arranger - OPTIONAL */}
            { props.showArr ? <label>
                <input value={ props.arranger } onChange={e=>props.setArranger(e.target.value)}placeholder="Arranger" type="text" name="arranger" />
            </label> : null }
            {/* Difficulty */}
            <label>
                <select value={props.difficulty}onChange={e=>props.setDifficulty(e.target.value)} name="difficulty">
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
                <select value={props.numPlayers}onChange={e=>props.setNumPlayers(e.target.value)} name="numPlayers">
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
            { props.showRefRecord ? <label>
                <input value={ props.refRecord } onChange={e=>props.setRefRecord(e.target.value)}placeholder="Link to Reference Recording" type="text" name="reference recording" />
            </label> : null }
            {/* Notes - OPTIONAL */}
            { props.showNotes ? <label>
                <input value={ props.notes } onChange={e=>props.setNotes(e.target.value)}placeholder="Notes" type="text" name="notes" />
            </label> : null }
            {/* Genre Dropdown Menu */}
            <label>
            { createGenre ? <input type="text" placeholder="Enter New Genre" value={ createGenre ? null : props.genre} onChange={e=>props.setGenre(e.target.value)}/> 
                : <select value={props.genre}onChange={handleGenreSelect} name="genre">
                    <option disabled >--Select Genre--</option>
                    <option>*Create New Genre*</option>
                    {genreDropdownOptions}
                </select> }
            </label>

            {/* Buttons to include Optional Inputs */}
            <label>
                <input type="checkbox" onChange={()=>props.setShowArr(!props.showArr)}checked={props.showArr}/>
                Include arranger
            </label>
            <label>
                <input type="checkbox" onChange={()=>props.setShowRefRecord(!props.showRefRecord)}checked={props.showRefRecord}/>
                Include reference recording
            </label>
            <label>
                <input type="checkbox" onChange={()=>props.setShowNotes(!props.showNotes)} checked={props.showNotes}/>
                Include notes about the piece
            </label>
            <input type="submit" value="Submit" id="new-piece-submit" />
        </form>
    </div>
    )
};

export default AddEditPieceForm;