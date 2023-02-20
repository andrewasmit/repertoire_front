import React from "react";
import Performance from "./Performance";

function ConcertProgram({ concert_description, year, ensembles, performances, musicLibrary }){

    // console.log("Music Library: ", musicLibrary)
    // console.log("Performances: ", performances)
    console.log(musicLibrary.filter(piece=>piece.id === 6)[0].composer)
    // console.log(musicLibrary[1].id)


    const performancesToDisplay = performances.map(performance=>{
        const pieceId = performance.piece_id
        const composer = musicLibrary.filter(piece=>piece.id === pieceId)[0].composer
        const arranger = musicLibrary.filter(piece=>piece.id === pieceId)[0].arranger
        const title = musicLibrary.filter(piece=>piece.id === pieceId)[0].title
        const ensemble = musicLibrary.filter(piece=>piece.id === pieceId)[0].ensemble

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
            <h4>{concert_description}</h4>
            <p>{year}</p>
            {/* <Performance /> */}
            {performancesToDisplay}
        </div>
    )
};

export default ConcertProgram;