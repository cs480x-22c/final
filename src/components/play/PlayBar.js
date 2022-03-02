import React from "react";

export default class PlayBar extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {playing: false,
                      seconds: 0,
                      frame: 0}
        this.fps = 24
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick()
    {
        let frame = this.state.frame + 1

        let seconds = this.state.seconds
        
        if(this.fps <= frame)
        {
            seconds += 1
            frame = 0
        }

        this.setState(() => ({
            seconds: seconds,
            frame: frame
        }))

        if(this.state.seconds >= this.props.totalSeconds)
             this.endTimer()

        this.props.setTime(seconds, frame)
    }

    handleSlide(event)
    {   
        let seconds = Math.floor(+event.target.value / this.fps)
        let frame = +event.target.value % this.fps

        this.setState({
            seconds: seconds,
            frame: frame
        })

        this.props.setTime(seconds, frame)

    }

    startTimer()
    {
        if(this.timerID)
            return

        if(this.state.seconds >= this.props.totalSeconds)
            this.setState({
                seconds: 0,
                frame: 0,
                playing: true
            })
        else
            this.setState({
                playing: true
            })

        this.timerID = setInterval(
            () => this.tick(),
            (1000/this.fps)
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

    render()
    {
        return (
            <div className="play-container">
                <button className="play-button button" onClick={this.handleClick.bind(this)} >{this.state.playing ? "⏸" : '⏵'}</button>
                <input className='play-bar' onChange={this.handleSlide.bind(this)} type="range" value={this.state.seconds * this.fps + this.state.frame} min='0' max={this.props.totalSeconds * this.fps}></input>
                <h3 className="play-timestamp">{this.state.seconds}/{this.props.totalSeconds}</h3>
            </div>
        )
    }
}