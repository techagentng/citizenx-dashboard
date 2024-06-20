import { styled } from '@mui/material/styles';
import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// image
import UserOne from 'assets/images/cards/card-1.jpg'

const TestimonialData = [
  {
    id: 1,
    image:UserOne,
    caption: 'Over 1,000 active citizens are keeping informed of our work within Nigerias governance; you should too!',
    name: 'Nucky Thompson',
    post: 'CEO'
  },
  {
    id: 2,
    image:UserOne,
    caption: 'Over 2,000 active citizens are keeping informed of our work within Nigerias governance; you should too!',
    name: 'Alhaji Dangote',
    post: 'Trustfund Baby'
  },
  {
    id: 3,
    image:UserOne,
    caption: 'Over 3,000 active citizens are keeping informed of our work within Nigerias governance; you should too!',
    name: 'Lawrence Aninh',
    post: 'Professional Looter'
  },
]


const Testimonial = () => {
  // const theme = useTheme();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  };

  const UserImg = styled('img')({
    width: '100%',
    height: 'auto',
    maxWidth: '350px',
    borderRadius: '20px',
    objectFit: 'cover',
});

  return (
    <Container >
      <Grid container spacing={3}>
       {/* Heading */}
       <Grid item xs={12} sx={{textAlign: "left"}}>
                <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                        <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                            What people are saying
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>


    <Grid item xs={12} >
      <Grid container justifyContent="center" >
        <Paper sx={{
            backgroundColor: '#E6FFE5',
            padding: { xs: '40px', md: '80px 80px' },
            maxWidth: '100%',
            margin: '0 auto',
        }}>
      
      <Slider {...settings}>
          {TestimonialData.map((data, index)=>{
            return(
                  <Box key={index} maxWidth='800px' sx={{marginLeft:{md: '80px', xs: '0px'}}} > 
                    <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                  }}>

                    
                    <Grid item xs={12} md={6} sx={{ alignSelf: 'end', mb: { xs: 2, md: 0 } }} >
                      <UserImg src={data.image} />
                    </Grid>
                    <Grid item xs={12} md={6} >
                      <Stack spacing={4} sx={{ px: { xs: 2, md: 4 } }}>
                        <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                          {data.caption}
                        </Typography>
                        
                        <Stack spacing={1}>
                          <Typography variant="h4" >
                            {data.name} 
                          </Typography>
                          <Typography variant="subtitle2">
                            {data.post}
                          </Typography>
                        </Stack>
                        
                      </Stack>
                    </Grid>
                </Box>
              </Box>
            )})}
      </Slider>

            </Paper>
          </Grid>
        </Grid>
      </Grid>

    </Container>
  )
}

export default Testimonial