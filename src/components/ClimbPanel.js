import React from "react";
import ClimberSelect from "./ClimberSelect";
import Route from "./Route";

export default class ClimbPanel extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div className="climb-panel">
                <ClimberSelect />
                <Route />
            </div>
        )
    }
} 