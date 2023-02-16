import React, { useState, useEffect } from "react";
import Library from "./Library";
import ConcertArchives from "./ConcertArchives";
import Home from "./Home";
import { Switch, Route, useHistory } from 'react-router-dom';

function MainContainer(){
    const history =useHistory();

    const [musicLibrary, setMusicLibrary] = useState([]);
    const [concertPrograms, setConcertPrograms] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:9292/library")
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.log(err));
    }, []);

    // Return of JSX
    return(
        <div id="main-container">
            <h3>This is the Main Container.</h3>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/library">
                <Library />
            </Route>
            <Route exact path="/concerts">
                <ConcertArchives />
            </Route>
            <Route path = "*">
                <h2>Error 404: Page Not Found</h2>
            </Route>
        </Switch>
        </div>
    )
};

export default MainContainer;