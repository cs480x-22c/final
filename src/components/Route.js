import React, { createRef } from "react";
import * as d3 from 'd3'

export default class Route extends React.Component
{
    constructor(props)
    {
        super(props)

        this.ref = createRef()
    }

    componentDidMount()
    {
        this.loadSvg()
    }

    loadSvg()
    {
        let svgContainer = d3.select(this.ref.current)
        svgContainer.selectAll('*').remove()
         d3.svg("./route.svg")
            .then(data => {
                //Load Route SVG and set it's id
                data.documentElement.id= this.props.rid
                svgContainer.node().append(data.documentElement)
                
                //select svg and set class
                this.svg = d3.select('#' + this.props.rid)
                this.svg.classed('route', true)

                this.update();
            })
    }

    update()
    {
        if(!this.svg)
            return
        
        //clear current positions
        this.svg.selectAll('.limb').remove()
        let holds = this.props.routeMoves.getHoldsTouching(this.props.currentTime)

        const drawLimb = (holdID, color, radius) => {
            if(isNaN(holdID) || holdID == "")
                return

            let hold = this.svg.select('#c' + holdID)
            let cx = hold.attr('cx')
            let cy = hold.attr('cy')

            this.svg.append('circle')
                .attr('cx', cx)
                .attr('cy', cy)
                .attr('r', radius)
                .style('stroke', color)
                .style('fill', 'none')
                .style('stroke-width', 2)
                .attr('class', 'limb')
        }

        const drawLeftHand = (holdID) => {
           drawLimb(holdID, 'red', 12)
        }

        const drawRightHand = (holdID) => {
            drawLimb(holdID, 'blue', 13)
        }
        

        const drawRightFoot = (holdID) => {
            drawLimb(holdID, 'green', 5)
        }
        
        const drawLeftFoot = (holdID) => {
            drawLimb(holdID, 'yellow', 6)
        }

       drawLeftHand(holds.leftHand)
       drawRightHand(holds.rightHand)

       drawLeftFoot(holds.leftFoot)
       drawRightFoot(holds.rightFoot)
    }

    render()
    {
        this.update()
        return (
            <div ref={this.ref} className="route-container">
                
            </div>
        )
    }
}