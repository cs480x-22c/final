import React from "react";

export default class InfoPopup extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div className="info-popup">
                <h1>Climber Route Visualizer</h1>
                <div className="info-how-to">
                    <h2>How to Use</h2>
                    <p>Select your desired climbers by clicking the 'Change Climber' button on the right and left panels.
                        Then Click the play button at the bottom of the page to view the hold selection of the climber.
                    </p>
                    
                    <h3><span className="right-hand">●</span> Right Hand</h3> 
                    <h3><span className="left-hand">●</span> Left Hand</h3> 
                    <h3><span className="right-foot">●</span> Right Foot</h3> 
                    <h3><span className="left-foot">●</span> Left Foot</h3> 
                </div>
                
                <button className="button" onClick={this.props.closePopup}>Close</button>
                <h3>Made by Travis Thompson</h3>
            </div>
        )
    }
}