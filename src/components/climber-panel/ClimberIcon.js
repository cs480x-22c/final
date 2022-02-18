import React from "react";

export default class ClimberIcon extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    selectClimber()
    {
        this.props.setClimber(this.props.climber)
    }

    render()
    {
        return (
            <div className="climber-icon-container" onClick={this.selectClimber.bind(this)}>
                <img className="climber-icon" src="./climber-images/colby_frechette.jpg"/>
                <h4 className="disable-select">{this.props.climber.firstName}</h4>
            </div>
        )
    }
}