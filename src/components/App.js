import React from "react";
import ClimbPanel from "./climber-panel/ClimbPanel";
import InfoButton from "./information/InfoButton";
import InfoPane from "./information/InfoPane";
import InfoPopup from "./information/InfoPopup";

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