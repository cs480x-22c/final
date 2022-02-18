import React from "react";
import Climber from "../data/Climber";
import ClimbPanel from "./climber-panel/ClimbPanel";
import InfoPane from "./information/InfoPane";

export default class App extends React.Component
{
    constructor(props)
    {
        super(props)
        this.climbers = [
            new Climber("00000", "travis", 'thompson'),
            new Climber("00001", "colby", 'frechette'),
            new Climber("00002", "jason", 'dykstra'),
            new Climber("00002", "elliot", 'irving'),
        ]
    }

    render()
    {
        return (
            <div id="app">
                <InfoPane/>
                <ClimbPanel climbers={this.climbers}/>
                <ClimbPanel climbers={this.climbers} reversed={true} />
            </div>
        )
        
    }
}