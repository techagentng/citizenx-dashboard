import { Avatar, CardMedia, Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';

// 3rd Party
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Animation
import FadeInWhenVisible from '../landing/Animation2';

import PartnerOne from 'assets/images/landing/citizenX-logo.png';
import PartnerTwo from 'assets/images/landing/citizenX-logo.png';



const Images = [
    {
        id: 1,
        image: PartnerOne
    },
    {
        id: 2,
        image: PartnerTwo
    },
    {
        id: 3,
        image: PartnerOne
    },
];

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
};

const Partners = () => {
    const theme = useTheme();
    const AvatarSx = { background: 'transparent', color: theme.palette.secondary.main, paddingX:2 , width: 200, height: 100 };
    
    return (
        <Container>
            <Grid container>
                <Grid item xs={12} md={8}>
                <FadeInWhenVisible animationType="fadeInCenter" delay={0.2}>
                    <Stack spacing={2}>
                        <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, mb: 2 }}>
                            Citizen X Dashboard: <br />
                            Incident Reports & Analytics
                        </Typography>
                        <Typography sx={{
                            fontSize: '1rem',
                            zIndex: '99',
                            pt: 1,
                            lineHeight: 1.7,
                            width: { xs: '100%', sm: '100%', md: 'calc(100% - 20%)' }
                        }}>
                            Explore our data-driven dashboard for insights into<br /> citizen engagements and governance
                        </Typography>
                    </Stack>
                    </FadeInWhenVisible>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container>
                        <Grid item>
                        <FadeInWhenVisible animationType="fadeInLeft" delay={0.5}>
                            <Stack direction='row' alignItems='center' >
                                <Slider {...settings}>
                                    {Images.map((data, index) => (
                                        <Avatar key={index} variant="rounded" sx={AvatarSx}>
                                            <CardMedia
                                                component="img"
                                                image={data.image}
                                                alt="Partner Images"
                                            />
                                        </Avatar>
                                    ))}
                                </Slider>
                            </Stack>
                           </FadeInWhenVisible>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Partners;
