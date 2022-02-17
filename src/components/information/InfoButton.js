import React from "react";

export default class InfoButton extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
        <div className="info-button-container">
            <button type="submit" className="info-button" onClick={this.props.togglePopup}>i</button>
        </div>
        )
    }
}