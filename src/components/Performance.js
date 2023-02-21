import React from "react";

function Performance({ composer, arranger, title, ensemble, id, handleDeletePerformance }){


    function handleDeletePerformanceClick(e){
        e.preventDefault();
        fetch(`http://localhost:9292/concerts/${id}`, {
            method: "DELETE"
        })
        .then(res=>res.json())
        .then(data=>handleDeletePerformance(data))
    }

    // Return of JSX
    return(
        <div className="performance">
            <h4>{title}</h4>
            <h5>{composer}</h5>
            {arranger === null || undefined ? null : <h5>Arr: {arranger}</h5>}
            <p>{ensemble}</p>
            <button onClick={handleDeletePerformanceClick}>x</button>
        </div>
    )
};


export default Performance;