import React from "react";

function Performance({ concert_id, ensemble_id, piece_id, id, key, musicLibrary }){

    console.log("In Performance: ", musicLibrary)

    // Return of JSX
    return(
        <div>
            <h4>Title of piece</h4>
            <h5>Composer</h5>
            <p>Ensemble performed</p>
        </div>
    )
};


export default Performance;