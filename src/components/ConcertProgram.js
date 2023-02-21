import React, { useState } from "react";
import Performance from "./Performance";

function ConcertProgram({ id, concert_description, year, ensembles, performances, musicLibrary, handleDeletePerformance }){

    // console.log("Music Library: ", musicLibrary)
    // console.log("Performances: ", performances)
    console.log("Ensembles: ", ensembles)

    const [showProgram, setShowProgram] = useState(false);
    const [addAPiece, setAddAPiece] = useState(false);
    const [newPerformance, setNewPerformance] = useState("--Select a Piece--")
    const [selectedEns, setSelectedEns] = useState("--Select an Ensemble--")


    const performancesToDisplay = performances.map(performance=>{
        const composer = musicLibrary.filter(piece=>piece.id === performance.piece_id)[0].composer
        const arranger = musicLibrary.filter(piece=>piece.id === performance.piece_id)[0].arranger
        const title = musicLibrary.filter(piece=>piece.id === performance.piece_id)[0].title
        const ensemble = ensembles.filter(ens=>ens.id === performance.ensemble_id)[0].name

        return <Performance 
                    composer={composer}
                    arranger={arranger}
                    title={title}
                    ensemble={ensemble}
                    id={performance.id}
                    key={performance.id}
                    handleDeletePerformance={handleDeletePerformance}
                />
    }) 

    function handleAddPerformanceToConcert(){
        console.log("Add Performance to Concert w/ ID of: ", id)
        setAddAPiece(true)
    }

    const dropdownOptionsForPiece = musicLibrary.map(p=>{
        return <option id={p.id}>{p.title}</option>
    })

    const dropdownOptionsForEnsembles = ensembles.map(p=>{
        return <option id={p.id}>{p.name}</option>
    })




    // const reduced_arr = ensembles.reduce(
    //     (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
    //     [],
    //   );

    //   console.log(reduced_arr)


    // Return of JSX
    return(
        <div className="concert-program">
            <h2>{concert_description}</h2>
            <h3>{year}</h3>
            <button onClick={()=>setShowProgram(!showProgram)}>{showProgram ? "Hide Performances" : "Show Performances"}</button>
            <button onClick={handleAddPerformanceToConcert}>Add Performance to Concert</button>
            { addAPiece ?   <form>
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