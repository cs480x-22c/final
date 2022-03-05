import { Typography } from '@mui/material'
import React from 'react'
import introductionGif from '../introduction-gif.gif'
import rickCover from '../rick-cover.gif'

function IntroductionsBlock() {
  return (
    <div style={{ height: '90vh' }}>
      <div style={{ zIndex: 2, position: 'relative', top: '30vh', left: 0, textAlign: 'center' }}>
        <Typography variant="h1" style={{ color: 'white', marginTop: 'auto' }}>
          Orest Ropi
        </Typography>
        <Typography variant="h4" style={{ color: 'white', marginTop: 'auto' }}>
          (Below are some project I made)
        </Typography>
      </div>
      <div className='introduction-block'>
      </div>
    </div>
  )
}

export default IntroductionsBlock