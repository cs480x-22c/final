import React from "react";
import Avatar from "./Avatar";
import SelectClimber from "./SelectClimber";

export default class ClimberPanel extends React.Component
{
    constructor(props)
    {
        super(props)
    
        this.state = {
            selectingClimber: false
        }
    }

    openClimberSelect()
    {
        this.setState({
            selectingClimber: true
        })
    }

    setClimber(climber)
    {
        this.setState({
            selectingClimber: false
        })
        this.props.setClimber(climber)
    }

    render()
    {
        if(this.state.selectingClimber)
        {
            return <SelectClimber climbers={this.props.climbers} setClimber={this.setClimber.bind(this)}/>
        }
        else {
            return (
                <div className="climber-panel">
                    <div className="climber-name-display disable-select">
                        <h1>{this.props.climber.firstName}</h1>
                        <h1>{this.props.climber.lastName}</h1>
                    </div>
                    
                    <Avatar climber={this.props.climber}/>
    
                    <div className="change-climber-button-container">
                        <button className="change-climber-button" onClick={this.openClimberSelect.bind(this)}>Change Climber</button>
                    </div>
                </div>
            )
        }     
    }
}