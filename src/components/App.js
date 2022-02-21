import React from "react";
import Climber from "../data/Climber";
import ClimbPanel from "./climber-panel/ClimbPanel";
import InfoPane from "./information/InfoPane";
import PlayBar from "./play/PlayBar";

export default class App extends React.Component
{
    constructor(props)
    {
        super(props)
        this.climbers = [
            new Climber("00000", "travis", 'thompson'),
            new Climber("00001", "colby", 'frechette'),
            new Climber("00002", "ben", 'mills'),
            new Climber("00003", "elliot", 'irving'),
        ]
        this.state = {
            currentTime: 0
        }
    }

    setCurrentTime(time)
    {
        this.setState({currentTime: time})
    }

    render()
    {
        return (
            <div id="app">
                <div id="content">
                    <InfoPane/>
                    <ClimbPanel currentTime={this.state.currentTime} climbers={this.climbers}/>
                    <ClimbPanel currentTime={this.state.currentTime} climbers={this.climbers} reversed={true} />
                </div>
                <PlayBar setTime={this.setCurrentTime.bind(this)} totalSeconds={15}/>
            </div>
        )
        
    }
}