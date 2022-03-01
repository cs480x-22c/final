import React from "react";
import InfoButton from "./InfoButton";
import InfoPopup from "./InfoPopup";

export default class InfoPane extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {showPopup: false}
    }

    openPopup()
    {
        this.setState({
            showPopup: true
        })
    }
    

    closePopup()
    {
        this.setState({
            showPopup: false
        })
    }

    togglePopup()
    {
        this.setState({
            showPopup: !this.state.showPopup
        })
    }

    render()
    {
        return (
            <div>
                <InfoButton togglePopup={this.togglePopup.bind(this)}/>
                {this.state.showPopup && <InfoPopup closePopup={this.closePopup.bind(this)}/>}
            </div>
        )
    }
}