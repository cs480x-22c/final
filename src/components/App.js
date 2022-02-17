import React from "react";
import ClimbPanel from "./climber-panel/ClimbPanel";
import InfoPane from "./information/InfoPane";

export default class App extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    openInfoPopup()
    {

    }

    closeInfoPopup()
    {

    }

    render()
    {
        return (
            <div id="app">
                <InfoPane/>
                <ClimbPanel />
                <ClimbPanel reversed={true} />
            </div>
        )
    }
}