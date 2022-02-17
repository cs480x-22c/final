import React from "react";
import Avatar from "./Avatar";
import ChangeClimberBtn from "./ChangeClimberBtn";

export default class ClimberPanel extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        console.log(this.props)
        return (
            <div className="climber-panel">
                <div className="climber-name-display">
                    <h1>{this.props.climber.firstName}</h1>
                    <h1>{this.props.climber.lastName}</h1>
                </div>
                
                <Avatar/>

                <ChangeClimberBtn setClimber={this.props.setClimber}/>
            </div>
        )
    }
}