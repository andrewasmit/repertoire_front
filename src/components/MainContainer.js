import React from "react";
import Library from "./Library";
import ConcertArchives from "./ConcertArchives";

function MainContainer(){
    return(
        <div>
            <h3>This is the Main Container.</h3>
            <Library />
            <ConcertArchives />
        </div>
    )
};

export default MainContainer;
