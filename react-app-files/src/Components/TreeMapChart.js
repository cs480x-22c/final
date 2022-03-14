import React from 'react';
import { useD3 } from '../hooks/useD3';
import * as d3 from 'd3';

function TreeMapChart({ data }) {

    const ref = useD3(
        (svg) => {
            const margin = { top: 10, right: 10, bottom: 10, left: 10 },
                width = 600 - margin.left - margin.right,
                height = 600 - margin.top - margin.bottom;


        });


    return (
        <svg ref={ref} width={200} height={200}></svg>
    )
}

export default TreeMapChart