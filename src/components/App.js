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
            
        ]
        this.state = {
            currentTime: 0,
            dataLoaded: false
        }

        this.loadData()
    }

    loadData()
    {
        fetch('./climber-data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(json => {
            // Parse climber data
            json.climbers.forEach(climber => {
                this.climbers.push(new Climber(
                    climber.uuid,
                    climber.firstName,
                    climber.lastName,
                    climber.routeMoves
                ));
            });
           
            //Update state to load app
            this.setState({
                dataLoaded: true
            })
        })
        .catch(() => {
            console.error("ERROR LOADING CLIMBER DATA!")
            this.dataError = true;
        })
    }

    setCurrentTime(time)
    {
        this.setState({currentTime: time})
    }

    render()
    {
        if(!this.state.dataLoaded)
            return null

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