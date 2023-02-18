import React, { useState, useEffect } from "react";

function NewPieceForm({ musicLibrary, setMusicLibrary }){

    const [title, setTitle] = useState("")
    const [composer, setComposer] = useState("")
    const [arranger, setArranger] = useState("")
    const [notes, setNotes] = useState("")
    const [genre, setGenre] = useState("--Select Genre--")
    const [difficulty, setDifficulty] = useState("--Select Difficulty--")
    const [numPlayers, setNumPlayers] = useState("--Select Number of Players--")
    const [refRecord, setRefRecord] = useState("")

    const [showArr, setShowArr] = useState(false)
    const [showNotes, setShowNotes] = useState(false)
    const [showRefRecord, setShowRefRecord] = useState(false)
    const [genreDropdownOptions, setGenreDropdownOptions] = useState(musicLibrary.map(p=>p.genre))
    const [createGenre, setCreateGenre] = useState(false)


    function handleShowArrangerChange(){
        setShowArr(!showArr);
    }
    function handleShowNotesChange(){
        setShowNotes(!showNotes);
    }
    function handleShowRefRecordChange(){
        setShowRefRecord(!showRefRecord);
    }

    useEffect(()=>{ 
        setGenreDropdownOptions([...new Set(genreDropdownOptions)].map(genre=>{
            return <option>{genre}</option>
        }))
    }, [musicLibrary, genre])

    function handleGenreSelect(e){
        setGenre(e.target.value)
        if(e.target.value === "*Create New Genre*"){
            setCreateGenre(true)
        }
    }
    
    // Return JSX
    return(
        <form>
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
                <input type="checkbox" onChange={handleShowArrangerChange}/>
                Include arranger
            </label>
            <label>
                <input type="checkbox" onChange={handleShowRefRecordChange}/>
                Include reference recording
            </label>
            <label>
                <input type="checkbox" onChange={handleShowNotesChange}/>
                Include notes about the piece
            </label>
        </form>
    )
};

export default NewPieceForm;