import React, { useState } from "react";
import Performance from "./Performance";

function ConcertProgram({ id, concert_description, year, ensembles, performances, musicLibrary, handleDeletePerformance }){

    // console.log("Music Library: ", musicLibrary)
    // console.log("Performances: ", performances)
    // console.log("Ensembles: ", ensembles)

    const [showProgram, setShowProgram] = useState(false);


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
    }

    // Return of JSX
    return(
        <div className="concert-program">
            <h2>{concert_description}</h2>
            <h3>{year}</h3>
            <button onClick={()=>setShowProgram(!showProgram)}>{showProgram ? "Hide Performances" : "Show Performances"}</button>
            <button onClick={handleAddPerformanceToConcert}>Add Performance to Concert</button>
            { showProgram ? performancesToDisplay : null }
        </div>
    )
};

export default ConcertProgram;