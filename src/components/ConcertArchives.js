import React, { useState, useEffect } from "react";
import ConcertProgram from "./ConcertProgram";
import NewConcertForm from "./NewConcertForm";

function ConcertArchives({ musicLibrary }){

    const [concertPrograms, setConcertPrograms] = useState([]);

    // Fetching Concert Program data (ensembles and performances of pieces)
    useEffect(()=>{
        fetch("http://localhost:9292/concerts")
        .then(res=>res.json())
        .then(data=>setConcertPrograms(data))
        .catch(err=>console.log(err));
    }, []);

    const programsToDisplay = concertPrograms.map(c=>{
        return <ConcertProgram 
                    concert_description={c.concert_description} 
                    ensembles={c.ensembles}
                    performances={c.performances}
                    year={c.year}
                    id={c.id}
                    key={c.id}
                    musicLibrary={musicLibrary}
                    handleDeletePerformance={handleDeletePerformance}
                />
    })

    function handleDeletePerformance(data){
        const filtered_arr = [...concertPrograms.filter(concert=>concert.id !== data.id)]
        filtered_arr.splice(data.id - 1, 0, data)
        return setConcertPrograms(filtered_arr) 
    }

    // console.log("ConcertPrograms: ", concertPrograms)


    return(
        <div id="concert-archives">
            <h4>THIS IS THE START OF CONCERT ARCHIVES</h4>
            {programsToDisplay}            
            <NewConcertForm />
        </div>
    )
};

export default ConcertArchives;