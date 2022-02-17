import React from "react";

export default class Route extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div className="route-container">
                <svg className="route"></svg>
            </div>
        )
    }
}