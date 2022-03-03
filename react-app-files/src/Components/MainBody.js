import { Card, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import TreeMapChart from './TreeMapChart'
import csv from '../Data/RickAndMortyScripts.csv';
import * as d3 from 'd3';
import StackedLineChart from './StackedLineChart';

function MainBody() {
    const [finalData, setFinalData] = React.useState([]);
    const [characters, setCharacters] = React.useState([]);

    const loadChartData = () => {
        d3.csv(csv).then(data => {

            // let hashmap = new Map();\

            // parsing all the data
            let s1 = [];
            let s2 = [];
            let s3 = [];

            data.forEach(function (d) {
                d['season no.'] = +d['season no.'];

                if (d['season no.'] === 1) {
                    s1.push(d);
                } else if (d['season no.'] === 2) {
                    s2.push(d);
                } else if (d['season no.'] === 3) {
                    s3.push(d)
                }
            });

            // create array of characters names
            let characters = [];
            data.forEach(function (d) {
                if (!characters.includes(d.name)) {
                    characters.push(d.name);
                }
            });

            // sum all character each time a character appears in a season
            let s1_characters = s1.reduce((acc, cur) => {
                if (acc[cur.name] === undefined) {
                    acc[cur.name] = 0;
                }
                acc[cur.name] += 1;
                return acc;
            }, {});

            s1_characters.season = 1;

            let s2_characters = s2.reduce((acc, cur) => {
                if (acc[cur.name] === undefined) {
                    acc[cur.name] = 0;
                }
                acc[cur.name] += 1;
                return acc;
            }, {});

            s2_characters.season = 2;

            let s3_characters = s3.reduce((acc, cur) => {
                if (acc[cur.name] === undefined) {
                    acc[cur.name] = 0;
                }
                acc[cur.name] += 1;
                return acc;
            }, {});

            s3_characters.season = 3;

            let dataFinal = [];

            let obj = {};
            obj.season = 1;
            for (var i = 0; i < characters.length; i++) {
                obj[characters[i]] = s1_characters[characters[i]] === undefined ? 0 : s1_characters[characters[i]];
            }
            dataFinal.push(obj);

            let obj2 = {};
            obj2.season = 2;
            for (var i = 0; i < characters.length; i++) {
                obj2[characters[i]] = s2_characters[characters[i]] === undefined ? 0 : s2_characters[characters[i]];
            }

            dataFinal.push(obj2);

            let obj3 = {};
            obj3.season = 3;
            for (var i = 0; i < characters.length; i++) {
                obj3[characters[i]] = s3_characters[characters[i]] === undefined ? 0 : s3_characters[characters[i]];
            }

            dataFinal.push(obj3);

            console.log(dataFinal);

            // set the final data to the state
            setFinalData([...dataFinal]);
            setCharacters([...characters]);

            console.log("CU", finalData);

        }).then(console.log("trying", finalData));
    }

    React.useEffect(() => {
        loadChartData();
    }, []);


    return (
        <div>
            <div className='main-body-item' >
                <Grid direction="column" container spacing={10}>

                    <Grid item direction="row" container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                            <h2>Characters screen time</h2>
                        </Grid>
                        <p> From the data analyzed, we can notice a decrease in Rick's screentime in season 2, that is mostly focused in Beth.
                            We can also notice that in season 3, Picklerick is introduced and have more screen time than any other family 
                            members besides Rick and Morty.
                        </p>
                        <Grid item xs={12} sm={12} md={12} style={{ display: "flex", justifyContent: "center" }}>
                            <Paper style={{ width: 1000, maxWidth: 1000, height: 600, paddingLeft : 40 }}>
                                {finalData.length > 0 && characters.length > 0 ? <StackedLineChart
                                    // center the component
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)"
                                    }}
                                    data={finalData} characters={characters} />
                                    : <div>Loading...</div>}
                            </Paper>
                        </Grid>
                    </Grid>


                    <Grid item direction="row" height={'100vh'} style={{ marginBottom: '20%', maxHeight: 800 }} container spacing={2}>
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