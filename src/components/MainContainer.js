import React from "react";
import Library from "./Library";
import ConcertArchives from "./ConcertArchives";
import Home from "./Home";
import { Switch, Route, useHistory } from 'react-router-dom';

function MainContainer(){
    const history =useHistory();

    // Return of JSX
    return(
        <div>
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
                <h2>Error 404: Page Note Found</h2>
            </Route>
        </Switch>
        </div>
    )
};

export default MainContainer;