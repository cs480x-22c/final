import { Container } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import footerBackground from '../milky-way.jpg';

function MainFooter() {

    const mystyle = {
        fontSize:48,
        color: "grey",
        backgroundColor: "cyan",
        borderRadius: 15
      };
      function handleGit(e) {
        e.preventDefault();
        window.open('https://github.com/orestropi','_blank');
      }
      function handleLinked(e) {
        e.preventDefault();
        window.open('https://www.linkedin.com/in/orest-ropi-480036231/','_blank');
      }
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
                        <Grid style={{paddingTop: '50px'}}item xs={2} sm={6} md={6}>
                            <button onClick={handleGit} style={mystyle}> <i class="fa fa-github"></i></button></Grid>
                            <Grid onclick="window.open('https://github.com/orestropi','_blank');" style={{paddingTop: '50px'}} item xs={12} sm={6} md={6}>
                            <button onClick={handleLinked} style={mystyle}> <i class="fa fa-linkedin-square"></i></button></Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography variant="h6" color="white" >
                                    Projects
                                </Typography>
                                <Typography variant="subtitle1" color="white" >
                                    <a target={'_blank'} href="https://rickandmortyfp.glitch.me/">P1: R&M Treemaps</a>
                                </Typography>
                                <Typography variant="subtitle1" color="white" >
                                    <a target={'_blank'} href="https://github.com/orestropi/GridGame">P2: GridGame</a>
                                </Typography>
                                <Typography variant="subtitle1" color="white" >
                                    <a target={'_blank'} href="https://github.com/orestropi/a3-orestropi">P3: ContactTracker</a>
                                </Typography>
                                <Typography variant="subtitle1" color="white" >
                                    <a target={'_blank'} href="https://github.com/BlueOcean090/final_project">P4: TaskManager </a>
                                </Typography>
                                <Typography variant="subtitle1" color="white" >
                                    <a target={'_blank'} href="https://github.com/orestropi/P2-OthelloAI/blob/main/agony.py">P5: OthelloAI</a>
                                </Typography>
                                <Typography variant="subtitle1" color="white" >
                                    <a target={'_blank'} href="https://github.com/orestropi/P2-Networking/blob/main/wireview.cpp">P6: WireView</a>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography variant="h6" color="white" >
                                    Work Experience
                                </Typography>
                                <Typography variant="subtitle1" color="white" >
                                    <a>none yet</a>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <Box textAlign={'center'} pt={{ xs: 5, sm: 10 }} pb={{ xs: 4 }}>
                    <Typography variant="body2" color="white">
                        Orest Ropi &reg; {new Date().getFullYear()}
                    </Typography>
                </Box>
            </div>
        </footer>
    )
}

export default MainFooter