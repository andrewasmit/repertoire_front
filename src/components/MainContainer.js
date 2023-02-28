import React, { useState, useEffect } from "react";
import Library from "./Library";
import ConcertArchives from "./ConcertArchives";
import Home from "./Home";
import { Switch, Route } from 'react-router-dom';
import { Typography } from "@mui/material";

function MainContainer(){

    const [musicLibrary, setMusicLibrary] = useState([]);
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subtitle: ''})

    // Fetching "Pieces" for the music library
    useEffect(()=>{
        fetch("http://localhost:9292/library")
        .then(res=>res.json())
        .then(data=>setMusicLibrary(data))
        .catch(err=>console.log(err));
    }, []);

    function handleNotify(message, type){
        setNotify({
            isOpen: true,
            message: message,
            type: type
        })
    }

    function handlePopUp(thing){
            setConfirmDialog({
                isOpen: true,
                title: `Are you sure you want to delete ${thing}?`,
                subtitle: 'You cannot undo this action',
            })
    }

    function onConfirm(message, type, func){
        if(func){
            func();
        }
        handleNotify(message, type);
        setConfirmDialog({...confirmDialog, isOpen: false})
    }

// Return of JSX
return(
    <div id="main-container">
    <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route exact path="/library">
            <Library 
                musicLibrary={ musicLibrary } 
                setMusicLibrary={ setMusicLibrary }
                onConfirm={onConfirm} 
                handlePopUp={handlePopUp}
                handleNotify={handleNotify}
                notify={ notify }
                setNotify={ setNotify }
                confirmDialog={ confirmDialog }
                setConfirmDialog={ setConfirmDialog }
            />
        </Route>
        <Route exact path="/concerts">
            <ConcertArchives 
                musicLibrary={ musicLibrary }
                onConfirm={ onConfirm } 
                handlePopUp={ handlePopUp }
                handleNotify={ handleNotify }
                notify={ notify }
                setNotify={ setNotify }
                confirmDialog={ confirmDialog }
                setConfirmDialog={ setConfirmDialog }
            />
        </Route>
        <Route path = "*">
            <Typography variant="h4" component="h3">Error 404: Page Not Found</Typography>
        </Route>
    </Switch>
    </div>
  )
};

export default MainContainer;