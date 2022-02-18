import React from "react";
import Route from "../Route";
import ClimberPanel from "./ClimberPanel";

export default class ClimbPanel extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            climber: this.props.climbers[this.props.reversed ? 1 : 0]
        }
    }

    setClimber(newClimber)
    {
        this.setState({
            climber: newClimber
        })
    }

    render()
    {
        console.log(this.props)
        if(this.props.reversed)
        {
            return (
                <div className="climb-panel">
                    <Route climber={this.state.climber} />
                    <ClimberPanel climber={this.state.climber} climbers={this.props.climbers} setClimber={this.setClimber.bind(this)}/>
                </div>
            )
        }
        else 
        {
            return (
                <div className="climb-panel">
                    <ClimberPanel climber={this.state.climber} climbers={this.props.climbers} setClimber={this.setClimber.bind(this)}/>
                    <Route climber={this.state.climber} />
                </div>
            )
        }
        
    }
}