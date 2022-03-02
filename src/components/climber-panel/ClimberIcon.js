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
            <div className="climber-card-container" onClick={this.selectClimber.bind(this)}>
                <div className="climber-card button">
                    <img className="climber-icon" src={"./climber-images/" + this.props.climber.uuid + ".jpg"}/>
                    <h4 className="disable-select">{this.props.climber.firstName}</h4>
                </div>
            </div>
        )
    }
}