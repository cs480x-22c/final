import { tickFormat } from "d3";
import React from "react";

export default class PlayBar extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {playing: false,
                      seconds: 0}
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState((state) => ({
            seconds: state.seconds + 1
        }))

        if(this.state.seconds == this.props.totalSeconds)
             this.endTimer()

        this.updateTime()
    }

    handleSlide(event)
    {   
        //this.endTimer()
        this.setState({
            seconds: +event.target.value
        })

        this.updateTime()
    }

    startTimer()
    {
        if(this.timerID)
            return

        this.setState({
            playing: true
        })

        this.timerID = setInterval(
            () => this.tick(),
            1000
        )
    }

    endTimer()
    {
        clearInterval(this.timerID);
        this.timerID = null

        this.setState({
            playing: false
        })
    }

    handleClick()
    {
        if(this.state.playing)
            this.endTimer()
        else
            this.startTimer()
    }

    updateTime()
    {
        this.props.setTime(this.state.seconds)
    }

    render()
    {
        return (
            <div className="play-container">
                <button className="play-button button" onClick={this.handleClick.bind(this)} >{this.state.playing ? "⏸" : '⏵'}</button>
                <input className='play-bar' onChange={this.handleSlide.bind(this)} type="range" value={this.state.seconds} min='0' max='100'></input>
            </div>
        )
    }
}