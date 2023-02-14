import React from "react";
import Piece from "./Piece";
import NewPieceForm from "./NewPieceForm";

function Library(){
    return(
        <div>
            <h4>This is the Music Library</h4>
            <p>This is where indivudal pieces of music go</p>
            <Piece />
            <NewPieceForm />
        </div>
    )
};

export default Library;