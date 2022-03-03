import React, { useEffect } from 'react';
import * as d3 from 'd3';
import useD3 from '../hooks/useD3';
import Grid from '@mui/material/Grid';


function StackedLineChart({ data, characters }) {

    const ref = useD3(
        (svg) => {
            var width = 500, height = 500, spacing = 50, margin = { top: 20, right: 20, bottom: 20, left: 30 };

            var xScale = d3.scaleLinear()
                .domain([d3.min(data, function (d) { return d.season; }), d3.max(data, function (d) { return d.season; })])
                .range([0, width - spacing]);

            var yScale = d3.scaleLinear()
                .range([height - spacing, 0]);


            svg.attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.append("g")
                .attr("transform", "translate(0," + (height - spacing) + ")")
                .call(d3.axisBottom(xScale).ticks(2));

            var stack = d3.stack()
                .keys(characters);

            var colors = ['#c6f27d', '#af3db7', '#a5d9b0', '#cdecf0', '#f9a79f', '#04af7a', '#18fc24', '#7ee5f7',
                '#df3403', '#7c829c', '#0e5c1f', '#211c61', '#9e759a', '#983fca', '#2d923c', '#0b1b97',
                '#00d437', '#65985d', '#865148', '#77eb99', '#e3063b', '#461916', '#9ed9ef', '#612ea2',
                '#9ef33a', '#021ca8', '#983d64', '#47c363', '#4d2437', '#acdfde', '#3d5053', '#bcee2d',
                '#3ed773', '#812a46', '#c207ee', '#813838', '#f6002b', '#238573', '#1576af', '#7a265a',
                '#574e85', '#744248'
            ];

            var stackedData = stack(data);

            yScale.domain([0, d3.max(stackedData[stackedData.length - 1], function (d) { return d[1]; })]);

            console.log(d3.max(stackedData[stackedData.length - 1], function (d) { return d[1]; }));

            svg.append("g")
                .call(d3.axisLeft(yScale));

            var area = d3.area()
                .x(function (d) { return xScale(d.data.season); })
                .y0(function (d) { return yScale(d[0]); })
                .y1(function (d) { return yScale(d[1]); });

            var series = svg.selectAll("g.series")
                .data(stackedData)
                .enter().append("g")
                .attr("class", "series");

            series.append("path")
                .attr("d", area)
                .style("fill", function (d, i) { return colors[i]; });

            var legend = d3.select("#legend");

            characters.forEach(function (c, i) {
                legend.append("circle")
                    .attr("cx", 130).attr("cy", 130 + (i * 20)).attr("r", 6).style("fill", colors[i]);

                legend.append("text")
                    .attr("x", 0).attr("y", 130 + (i * 20))
                    .text(c)
                    .style("font-size", "15px").attr("alignment-baseline", "middle");
            });

            // legend.append("circle").attr("cx", 100).attr("cy", 130).attr("r", 6).style("fill", "#69b3a2")
            // legend.append("circle").attr("cx", 100).attr("cy", 160).attr("r", 6).style("fill", "#404080")
            // legend.append("text").attr("x", 0).attr("y", 130).text("variable A").style("font-size", "15px").attr("alignment-baseline", "middle")
            // legend.append("text").attr("x", 0).attr("y", 160).text("variable B").style("font-size", "15px").attr("alignment-baseline", "middle")

        });

   
    return (
        <div>
            <Grid container direction={'row'} spacing={1}>
                <Grid style={{ display: "flex", justifyContent: "flex-start" }} item xs={8}>
                    {/* <svg style={{
                        height: 600,
                        width: "100%",
                        margin: "20"
                    }} ref={ref}></svg> */}
                    <iframe scrolling='no' width={"950px"} height={"600px"} id="iframe-chart" src="https://dacs30.github.io/stacked-area-chart-d3/" style={{display:"hidden"}}></iframe>
                </Grid>
                <Grid style={{ display: "flex", justifyContent: "flex-start" }} item xs={4}>
                    <svg id="legend" height="400" width="100%"></svg>
                </Grid>
            </Grid>
        </div>
    )
}

export default StackedLineChart