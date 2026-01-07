import React from 'react';
import 'hero-slider/dist/index.css';
import HeroSlider, { Slide, Nav, Overlay } from 'hero-slider';
import Box from '@mui/material/Box';

export default function HeroSliderTest() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '600px',
        position: 'relative',
        backgroundColor: '#000',
      }}
    >
      <HeroSlider
        height="600px"
        autoplay={{
          autoplayDuration: 5000,
        }}
      >
        <Slide
          background={{
            backgroundImageSrc: 'https://via.placeholder.com/1920x1080/0066CC/FFFFFF?text=Slide+1',
          }}
        >
          <Overlay>
            <div style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '48px',
              fontWeight: 'bold',
            }}>
              Slide 1
            </div>
          </Overlay>
        </Slide>
        <Slide
          background={{
            backgroundImageSrc: 'https://via.placeholder.com/1920x1080/0099FF/FFFFFF?text=Slide+2',
          }}
        >
          <Overlay>
            <div style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '48px',
              fontWeight: 'bold',
            }}>
              Slide 2
            </div>
          </Overlay>
        </Slide>
        <Slide
          background={{
            backgroundImageSrc: 'https://via.placeholder.com/1920x1080/003366/FFFFFF?text=Slide+3',
          }}
        >
          <Overlay>
            <div style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '48px',
              fontWeight: 'bold',
            }}>
              Slide 3
            </div>
          </Overlay>
        </Slide>
        <Nav />
      </HeroSlider>
    </Box>
  );
}

