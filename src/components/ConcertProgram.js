import React, { useState, useEffect } from "react";
import Performance from "./Performance";

function ConcertProgram({ id, concert_description, year, allEnsembles, performances, musicLibrary, handleConcertPatch }){

    const [showProgram, setShowProgram] = useState(false);
    const [addAPiece, setAddAPiece] = useState(false);
    const [editConcert, setEditConcert] = useState(false);
    const [newPerformance, setNewPerformance] = useState("--Select a Piece--");
    const [selectedEns, setSelectedEns] = useState("--Select an Ensemble--");
    const [description, setDescription] = useState(concert_description);
    const [concertYear, setConcertYear] = useState(year);
    const [dropdownOptionsForEnsembles, setDropdownOptionsForEnsembles] = useState(allEnsembles.map(p=>{
        return <option id={p.id}>{p.name}</option>
    }))

    const performancesToDisplay = performances.map(performance=>{
        const composer = musicLibrary.filter(piece=>piece.id === performance.piece_id)[0].composer
        const arranger = musicLibrary.filter(piece=>piece.id === performance.piece_id)[0].arranger
        const title = musicLibrary.filter(piece=>piece.id === performance.piece_id)[0].title
        const ensemble = allEnsembles.filter(ens=>ens.id === performance.ensemble_id)[0].name

        return <Performance 
                    composer={composer}
                    arranger={arranger}
                    title={title}
                    ensemble={ensemble}
                    id={performance.id}
                    key={performance.id}
                    handleConcertPatch={handleConcertPatch}
                />
    }) 

    
// Fetch for Adding a new Piece
    function handleAddNewPiece(e){
        e.preventDefault();
        const pieceToAdd = {
            performance: newPerformance,
            ensemble: selectedEns,
            concert: id
        };
        fetch(`http://localhost:9292/concerts/performance/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(pieceToAdd)
        })
        .then(res=>res.json())
        .then(data=>handleConcertPatch(data))
        setNewPerformance("--Select a Piece--")
        setSelectedEns("--Select an Ensemble--")
        setAddAPiece(false)
    }

    // Fetch for editing the Concert Program details (name/year)
    function handleEditConcert(e){
        e.preventDefault();
        const editedConcert = {
            concert_description: description,
            year: concertYear
        };
        fetch(`http://localhost:9292/concerts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(editedConcert)
        })
        .then(res=>res.json())
        .then(data=>handleConcertPatch(data))
        setEditConcert(false);
    }


    const dropdownOptionsForPiece = [...new Set(musicLibrary)].map(p=>{
        return <option id={p.id}>{p.title}</option>
    })

useEffect(()=>{ setDropdownOptionsForEnsembles(allEnsembles.map(p=>{
    return <option id={p.id}>{p.name}</option>
    }))
}, [allEnsembles]) 



    // Return of JSX
    return(
        <div className="concert-program">
            { 
            editConcert ?
            <form onSubmit={handleEditConcert}>
                <input type="text" value={description} onChange={e=>setDescription(e.target.value)}></input>
                <input type="text" value={concertYear} onChange={e=>setConcertYear(e.target.value)}></input>
                <input type="submit" value="Submit" id="edit-concert-submit"/>
            </form> : 
            <div>
                <h2>{concert_description}</h2>
                <h3>{year}</h3>
            </div> 
            }
            <button onClick={()=>setShowProgram(!showProgram)}>{showProgram ? "Hide Performances" : "Show Performances"}</button>
            <button onClick={()=>setEditConcert(!editConcert)}>Edit Concert</button>
            <button onClick={()=>setAddAPiece(true)}>Add Performance to Concert</button>
            { addAPiece ?   <form onSubmit={handleAddNewPiece}>
                                <select value={newPerformance} onChange={e=>setNewPerformance(e.target.value)}>
                                    <option disabled>--Select a Piece--</option>
                                    {dropdownOptionsForPiece}
                                </select>
                                <select value={selectedEns} onChange={e=>setSelectedEns(e.target.value)}>
                                    <option disabled>--Select an Ensemble--</option>
                                    {dropdownOptionsForEnsembles}
                                </select> 
                                <input type="submit" value="Submit" id="add-performance-submit" />
                                <button onClick={()=>setAddAPiece(false)}>Discard New Piece</button>
                            </form>  : null } 
            { showProgram ? performancesToDisplay : null }
        </div>
    )
};

export default ConcertProgram;