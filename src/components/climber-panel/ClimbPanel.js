import React from "react";
import Route from "../Route";
import ClimberPanel from "./ClimberPanel";

export default class ClimbPanel extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            climber: {
                firstName: "colby",
                lastName: "frechette"
            }
        }
    }

    setClimber(newClimber)
    {
        console.log("set")
        this.setState({
            climber: newClimber
        })
    }

    render()
    {
        if(this.props.reversed)
        {
            return (
                <div className="climb-panel">
                    <Route climber={this.state.climber} />
                    <ClimberPanel climber={this.state.climber} setClimber={this.setClimber.bind(this)}/>
                </div>
            )
        }
        else 
        {
            return (
                <div className="climb-panel">
                    <ClimberPanel climber={this.state.climber} setClimber={this.setClimber.bind(this)}/>
                    <Route climber={this.state.climber} />
                </div>
            )
        }
        
    }
}