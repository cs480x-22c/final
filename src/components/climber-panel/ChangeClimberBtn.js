import React from "react"

export default class ChangeClimberBtn extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    setClimber()
    {
        this.props.setClimber(
            {
                firstName: "test",
                lastName: "test"
            }
        )
    }

    render()
    {
        return (
            <div className="change-climber-button-container">
                <button className="change-climber-button" onClick={this.setClimber.bind(this)}>Change Climber</button>
            </div>
        )
    }
}