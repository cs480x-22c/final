import { Card, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import TreeMapChart from './TreeMapChart'
import csv from '../Data/RickAndMortyScripts.csv';
import * as d3 from 'd3';

function MainBody() {

    return (
        <div>
            <div className='main-body-item' >
                <Grid direction="column" container spacing={10}>


                    <Grid item direction="row" height={'420vh'} style={{ marginBottom: '20%', maxHeight: 800 }} container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                            <h2>Tree Map vision per season</h2>

                        </Grid>
                        <p>For all the seasons Rick and Morty have the most screentime. Other characters from the family usually stay behind of them
                            and have less screentime. For Season 3, Picklerick has more screentime than the others family members execept for Morty
                            and Rick itself.
                        </p>
                        <iframe scrolling="no" id='iframe-chart' width="100%" height="100%" src="https://rickandmortyfinalp.glitch.me/" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </Grid>

                </Grid>
            </div>
        </div>
    )
}

export default MainBody