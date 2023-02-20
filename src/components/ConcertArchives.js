import React, { useState, useEffect } from "react";
import ConcertProgram from "./ConcertProgram";
import NewConcertForm from "./NewConcertForm";

function ConcertArchives({ concertPrograms, setConcertPrograms, musicLibrary }){

    // console.log("In archives: ", concertPrograms)

    const [ensembles, setEnsembles] = useState([])

    useEffect(()=>{
        const ensembleArr = [];
        concertPrograms.map(c=>c.ensembles.map(e=>ensembleArr.push(e)))
        console.log("All - before filtering ", ensembleArr)

        // ensembleArr.map(obj=>{
        //    return filteredEnsArr.contains(obj) ? null : filteredEnsArr.push(obj)
        // })


    }, [concertPrograms])


    const programsToDisplay = concertPrograms.map(c=>{
        return <ConcertProgram concert_description={c.concert_description} />
    })

    return(
        <div id="concert-archives">
            <h4>THIS IS WHERE CONCERT ARCHIVES GOES</h4>
            <ConcertProgram />
            <NewConcertForm />
        </div>
    )
};

export default ConcertArchives;