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
                            <h2>P1: RickAndMorty Treemaps</h2>
                            
                        </Grid>
                        <li>A java game that allows users to make moves until the center square is 11 or they are out of moves.</li>
                        <li>Fully tested using JUnit5 test cases.</li>
                        <li>An individual project created for my software engineering class that was written in Java using Java Swing for the GUI.</li>
                        <li>Uses The Model View Controller (MVC) design pattern for scalability and development efficiency.</li>
                        <iframe scrolling="no" id='iframe-chart' width="100%" height="100%" src="https://rickandmortyfinalp.glitch.me/" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </Grid>
                    <Grid item direction="row" height={'420vh'} style={{ marginBottom: '20%', maxHeight: 100 }} container spacing={2}>
                        
                        <Grid item xs={12} sm={12} md={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <h2>P2: GridGame</h2>

                        </Grid>
                        <li>A java game that allows users to make moves until the center square is 11 or they are out of moves.</li>
                        <li>Fully tested using JUnit5 test cases.</li>
                        <li>An individual project created for my software engineering class that was written in Java using Java Swing for the GUI.</li>
                        <li>Uses The Model View Controller (MVC) design pattern for scalability and development efficiency.</li>
                    </Grid>

                    <Grid item direction="row" height={'420vh'} style={{ marginBottom: '20%', maxHeight: 100 }} container spacing={2}>
                        
                        <Grid item xs={12} sm={12} md={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                            <h2>P3: ContactTracker</h2>

                        </Grid>
                        <li>A website that allows users to create accounts and record contacts.</li>
                        <li>An individual project for my webware class that used JavaScript, Node.js, Express.js, @hapi/joi, HTML, CSS, cookies, and mongoDB.</li>
                    </Grid>

                    <Grid item direction="row" height={'420vh'} style={{ marginBottom: '20%', maxHeight: 100 }} container spacing={2}>
                        
                        <Grid item xs={12} sm={12} md={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <h2>P4: GridGame</h2>

                        </Grid>
                        <li>A java game that allows users to make moves until the center square is 11 or they are out of moves.</li>
                        <li>Fully tested using JUnit5 test cases.</li>
                        <li>An individual project created for my software engineering class that was written in Java using Java Swing for the GUI.</li>
                        <li>Uses The Model View Controller (MVC) design pattern for scalability and development efficiency.</li>
                    </Grid>

                    <Grid item direction="row" height={'420vh'} style={{ marginBottom: '20%', maxHeight: 100 }} container spacing={2}>
                        
                        <Grid item xs={12} sm={12} md={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <h2>P5: GridGame</h2>

                        </Grid>
                        <li>A java game that allows users to make moves until the center square is 11 or they are out of moves.</li>
                        <li>Fully tested using JUnit5 test cases.</li>
                        <li>An individual project created for my software engineering class that was written in Java using Java Swing for the GUI.</li>
                        <li>Uses The Model View Controller (MVC) design pattern for scalability and development efficiency.</li>
                    </Grid>

                    <Grid item direction="row" height={'420vh'} style={{ marginBottom: '20%', maxHeight: 100 }} container spacing={2}>
                        
                        <Grid item xs={12} sm={12} md={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <h2>P6: GridGame</h2>

                        </Grid>
                        <li>A java game that allows users to make moves until the center square is 11 or they are out of moves.</li>
                        <li>Fully tested using JUnit5 test cases.</li>
                        <li>An individual project created for my software engineering class that was written in Java using Java Swing for the GUI.</li>
                        <li>Uses The Model View Controller (MVC) design pattern for scalability and development efficiency.</li>
                    </Grid>

                </Grid>
            </div>
        </div>
    )
}

export default MainBody