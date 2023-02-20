import React from "react";
import Performance from "./Performance";

function ConcertProgram({ concert_description, year, ensembles, performances, musicLibrary }){

    console.log("Music Library: ", musicLibrary)
    console.log("Performances: ", performances)
    console.log("Ensembles: ", ensembles)


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
                />
    }) 

    // Return of JSX
    return(
        <div>
            <h2>{concert_description}</h2>
            <h3>{year}</h3>
            {performancesToDisplay}
        </div>
    )
};

export default ConcertProgram;