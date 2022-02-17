import React from "react";
import ClimbPanel from "./ClimbPanel";

export default class App extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div id="app">
                <ClimbPanel />
                <ClimbPanel />
            </div>
        )
    }
}