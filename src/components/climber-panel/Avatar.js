import React from "react";

export default class Avatar extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div className="avatarContainer">
                <img className="avatar" src="./climber-images/colby_frechette.jpg"/>
            </div>
        )
    }
}