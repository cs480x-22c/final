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
        let holds = this.props.routeMoves.getHoldsTouching(this.props.currentTime, this.props.currentFrame)

        const drawLimb = (holdID, color, radius, isLeft) => {
            if(holdID == "")
                return

            let hold = this.svg.select('#c' + holdID)
          
            if(hold._groups[0][0] == undefined)
            {
                console.warn('Bad hold data')
                return
            }

            let cx = +hold.attr('cx')
            let cy = +hold.attr('cy')

            this.svg.append('circle')
                .attr('cx', cx)
                .attr('cy', cy)
                .attr('r', radius)
                .style('stroke', color)
                .style('fill', 'none')
                .style('stroke-width', 6)
                .attr('class', 'limb')

               
            let textMargin = 10;
            this.svg.append('text')
                .attr('x', isLeft ? cx - radius-textMargin : cx + radius + textMargin)
                .attr('y', cy - radius-textMargin)
                .text(isLeft ? "L" : "R")
                .attr('font-size', "2em")
                .style('fill', color)
                .attr('class', 'limb')

        }

        const drawLeftHand = (holdID) => {
           drawLimb(holdID, 'red', 28, true)
        }

        const drawRightHand = (holdID) => {
            drawLimb(holdID, 'blue', 26, false)
        }
        

        const drawRightFoot = (holdID) => {
            drawLimb(holdID, 'purple', 10, false)
        }
        
        const drawLeftFoot = (holdID) => {
            drawLimb(holdID, 'orange', 12, true)
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