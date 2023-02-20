import React from "react";
import Performance from "./Performance";

function ConcertProgram({ concert_description, year, ensembles, performances, musicLibrary }){

    const performancesToDisplay = performances.map(p=>{
        return <Performance 
                    concert_id={p.concert_id}
                    ensemble_id={p.ensemble_id}
                    piece_id={p.piece_id}
                    musicLibrary={musicLibrary}
                    id={p.id}
                    key={p.id}
                />
    }) 



    // Return of JSX
    return(
        <div>
            <h4>{concert_description}</h4>
            <p>{year}</p>
            <Performance />
        </div>
    )
};

export default ConcertProgram;