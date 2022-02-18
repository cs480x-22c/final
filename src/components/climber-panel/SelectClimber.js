import React from "react";
import ClimberIcon from "./ClimberIcon";

export default class SelectClimber extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    getClimberIcons(climbers)
    {
        let icons = []
        for(let i = 0; i < climbers.length; i++)
        {
            icons.push(<ClimberIcon setClimber={this.props.setClimber} key={climbers[i].firstName} climber={climbers[i]}/>)
        }
        return icons
    }

    render()
    {
        return (
            <div className="climber-panel">
                <div className="climber-select">
                    {this.getClimberIcons(this.props.climbers)}
                </div>
            </div>
        )
    }
}