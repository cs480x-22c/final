import React from "react";
import ClimberIcon from "./ClimberIcon";

export default class SelectClimber extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state= {climbers: [{firstName: 'travis', lastName: 'thompson'},
                                {firstName: 'bravis', lastName: 'thompson'},
                                {firstName: 'dravis', lastName: 'thompson'},
                                {firstName: 'cravis', lastName: 'thompson'},
                                {firstName: 'aravis', lastName: 'thompson'},
                                {firstName: 'pravis', lastName: 'thompson'},
                                {firstName: 'lravis', lastName: 'thompson'}]}
    }

    getClimberIcons(climbers)
    {
        console.log(this.props)
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
                    {this.getClimberIcons(this.state.climbers)}
                </div>
            </div>
        )
    }
}