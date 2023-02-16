import React from "react";
import Piece from "./Piece";
import NewPieceForm from "./NewPieceForm";

function Library({ musicLibrary, setMusicLibrary }){

    const piecesToDisplay = musicLibrary.map(p=>{
        return <Piece
                    title={p.title}
                    composer={p.composer}
                    arranger={p.arranger}
                    difficulty={p.difficulty}
                    number_of_players={p.number_of_players}
                    reference_recording={p.reference_recording}
                    genre={p.genre}
                    notes={p.notes}
                />
    })


    return(
        <div  id ="library">
            {/* <Piece musicLibrary={ musicLibrary }/> */}
            {piecesToDisplay}
            <NewPieceForm setMusicLibrary={ setMusicLibrary }/>
        </div>
    )
};

export default Library;