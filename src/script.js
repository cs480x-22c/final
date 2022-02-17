import './style.css'
import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App'

ReactDom.render(<App />, document.getElementById('root'))

/*
class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {date: new Date()}
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        this.setState({
            date: new Date()
        })
    }

    render() {
        return (
            <div>
                <h1>Hello world</h1>
                <h2>It's {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        )
    }
}

const tick = () => {
    ReactDom.render(
        <Clock />,
        document.getElementById('root')
    )
}

setInterval(tick, 1000)*/