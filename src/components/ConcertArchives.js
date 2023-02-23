import React, { useState, useEffect } from "react";
import ConcertProgram from "./ConcertProgram";
import NewConcertForm from "./NewConcertForm";

function ConcertArchives({ musicLibrary }){

    const [concertPrograms, setConcertPrograms] = useState([]);
    const [allEnsembles, setAllEnsembles] = useState([]);
    const [newEns, setNewEns] = useState("");
    const [gradeLevel, setGradeLevel] = useState("--Choose Grade Level--")
    const [addNewEns, setAddNewEns] = useState(false);

    // Fetching ensembles
    useEffect(()=>{
        fetch("http://localhost:9292/ensembles")
        .then(res=>res.json())
        .then(data=>setAllEnsembles(data))
        .catch(err=>console.log(err));
    }, []);
    
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
                    allEnsembles={allEnsembles}
                    performances={c.performances}
                    year={c.year}
                    id={c.id}
                    key={c.id}
                    musicLibrary={musicLibrary}
                    setConcertPrograms={setConcertPrograms}
                    handleConcertPatch={handleConcertPatch}
                />
    })

    // Function passed down to handle state after a Fetch
    function handleConcertPatch(data){
        const filtered_arr = [...concertPrograms.filter(concert=>concert.id !== data.id)]
        filtered_arr.splice(data.id - 1, 0, data)
        return setConcertPrograms(filtered_arr) 
    }


    function handleSubmitNewEns(e){
        e.preventDefault();
        const newEnsemble = {name: newEns, grade_level: gradeLevel}
        fetch("http://localhost:9292/ensembles", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newEnsemble)
        })
        .then(res=>res.json())
        .then(data=>setAllEnsembles([...allEnsembles, data]))
        setNewEns("")
        setAddNewEns(false)
    }

    return(
        <div id="concert-archives">
            <h4>CONCERT ARCHIVES</h4>
            <button onClick={()=>setAddNewEns(!addNewEns)}>{addNewEns ? "Discard New Ensemble" : "Add New Ensemble" }</button>
            { addNewEns ? <form onSubmit={handleSubmitNewEns}>
                <input type="text" value={newEns} onChange={e=>setNewEns(e.target.value)} placeholder="New Ensemble"/>
                    <select value ={gradeLevel} onChange={e=>setGradeLevel(e.target.value)}>
                        <option disabled>--Choose Grade Level--</option>
                        <option>High School</option>
                        <option>Junior High</option>
                        <option>Beginner</option>
                    </select>
                <input type="submit" value="Submit" />
            </form> : null }
            {programsToDisplay}            
            <NewConcertForm />
        </div>
    )
};

export default ConcertArchives;