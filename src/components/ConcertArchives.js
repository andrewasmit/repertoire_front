import React from "react";
import ConcertProgram from "./ConcertProgram";
import NewConcertForm from "./NewConcertForm";

function ConcertArchives(){
    return(
        <div id="concert-archives">
            <h4>THIS IS WHERE CONCERT ARCHIVES GOES</h4>
            <ConcertProgram />
            <NewConcertForm />
        </div>
    )
};

export default ConcertArchives;