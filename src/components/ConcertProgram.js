import React, { useState } from "react";
import Performance from "./Performance";

function ConcertProgram({ id, concert_description, year, allEnsembles, performances, musicLibrary, handleConcertPatch }){

    const [showProgram, setShowProgram] = useState(false);
    const [addAPiece, setAddAPiece] = useState(false);
    const [newPerformance, setNewPerformance] = useState("--Select a Piece--")
    const [selectedEns, setSelectedEns] = useState("--Select an Ensemble--")


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


    function handleAddNewPiece(e){
        e.preventDefault();
        const pieceToAdd = {
            performance: newPerformance,
            ensemble: selectedEns,
            concert: id
        };
        fetch(`http://localhost:9292/concerts/${id}`, {
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

    const dropdownOptionsForPiece = musicLibrary.map(p=>{
        return <option id={p.id}>{p.title}</option>
    })

    const dropdownOptionsForEnsembles = allEnsembles.map(p=>{
        return <option id={p.id}>{p.name}</option>
    })




    // Return of JSX
    return(
        <div className="concert-program">
            <h2>{concert_description}</h2>
            <h3>{year}</h3>
            <button onClick={()=>setShowProgram(!showProgram)}>{showProgram ? "Hide Performances" : "Show Performances"}</button>
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
                            </form> : null }
            { showProgram ? performancesToDisplay : null }
        </div>
    )
};

export default ConcertProgram;