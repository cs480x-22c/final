import { Container } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import footerBackground from '../footer-background.png';

function MainFooter() {

    return (
        <footer className='footer'>
            <img
                class="demo-bg"
                src={footerBackground}
                alt=""
            ></img>
            <div class="demo-content">
                <Box>
                    <Container maxWidth="lg">
                        <Grid container textAlign={'center'} direction="row" spacing={2}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography variant="h6" color="white" >
                                    Contributors
                                </Typography>
                                <Typography variant="subtitle1" color="white" >
                                    <a href="https://github.com/dacs30">Danilo Correia </a>
                                </Typography>
                                <Typography variant="subtitle1" color="white" >
                                    <a href="https://github.com/cjdunn2">Craig James Dunn </a>
                                </Typography>
                                <Typography variant="subtitle1" color="white" >
                                    <a href="https://github.com/orestropi">Orest Ropi</a>
                                </Typography>
                                <Typography variant="subtitle1" color="white" >
                                    <a href="https://github.com/orestropi">Maddison Caten</a>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography variant="h6" color="white" >
                                    Explore
                                </Typography>
                                <Typography variant="subtitle1" color="white" >
                                    <a href="https://towardsdatascience.com/the-office-story-thats-what-the-data-said-224e8a6f47e">inspirations</a>
                                </Typography>
                                <Typography variant="subtitle1" color="white" >
                                    <a href="https://rickandmortyfp.glitch.me/">Embeded tree map</a>
                                </Typography>
                                <Typography variant="subtitle1" color="white" >
                                    <a href="https://www.youtube.com/watch?v=f_E5d9Gt5nM&ab_channel=BeforeSemicolon">Source 1 for Tree map</a>
                                </Typography>
                                <Typography variant="subtitle1" color="white" >
                                    <a href="https://www.d3-graph-gallery.com/graph/treemap_basic.html">Basic treemap in d3.js</a>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <Box textAlign={'center'} pt={{ xs: 5, sm: 10 }} pb={{ xs: 4 }}>
                    <Typography variant="body2" color="white">
                        CS480X Final Project &reg; {new Date().getFullYear()}
                    </Typography>
                </Box>
            </div>
        </footer>
    )
}

export default MainFooter