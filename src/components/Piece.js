import React from "react";

function Piece(props){

    const notesToDisplay = props.notes.map(n=>{
        return <p>{n.note}</p>
    })

    function difficultyToString(int){
        if(int === 1){
            return "Easy"
        } if(int === 2){
            return "Medium-Easy"
        } if(int===3){
            return "Medium"
        } if (int===4){
            return "Medium-Advanced"
        }if(int===5){
            return "Advanced"
        }
    };


    // Return of JSX
    return(
        <div className="library-card">
            <h4>"{props.title}"</h4>
            <h5>{props.composer}</h5>
            { props.arranger === null ? null : <h6>Arr: {props.arranger}</h6> }
            <p>Difficulty: {difficultyToString(props.difficulty)}</p>
            <p>Genre: {props.genre}</p>
            <p>Number of Players: {props.number_of_players}</p>
            { props.notes.length === 0 ? <button>Add Note!</button> : <h4>Notes: </h4> }
            {notesToDisplay}
            <a href={props.reference_recording} target="_blank">Reference Recording</a>
        </div>
    )
};

export default Piece;