import React from "react";

function Performance({ composer, arranger, title, ensemble, id }){

    // Return of JSX
    return(
        <div>
            <h4>{title}</h4>
            <h5>{composer}</h5>
            {arranger === null || undefined ? null : <h5>Arr: {arranger}</h5>}
            <p>{ensemble}</p>
        </div>
    )
};


export default Performance;