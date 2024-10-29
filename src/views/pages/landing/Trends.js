import React from 'react';
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// Icons
import AppleIcon from '@mui/icons-material/Apple';
import GooglePlay from 'assets/images/landing/playstore_300218.png';

// Images
import BarcodeI from 'assets/images/landing/image 14.png';
import HandImg from 'assets/images/landing/Free iPhone 15 Pro Hand Mockup (Mockuuups Studio).png';
import FadeInWhenVisible from './Animation2';

const HeaderAnimationImage = styled('img')({
    maxWidth: '100%',
    filter: 'drop-shadow(0px 0px 50px rgb(33 150 243 / 30%))'
});

const ButtonSX = {
    borderRadius: 20,
    backgroundColor: 'black'
};

const BarcodeImg = styled('img')({
    width: '100%',
    height: 'auto',
    maxWidth: '150px',
    borderRadius: '20px',
    objectFit: 'cover'
});

const GooglePlayIcon = styled('img')({
    width: '20px',
    height: '20px'
});

const Trends = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                py: 4
            }}
        >
            <Grid container justifyContent="space-between" alignItems="center" spacing={{ xs: 1.5, sm: 2.5, md: 3, lg: 5 }}>
                <Grid item xs={12}>
                    <Grid container spacing={2.5} direction={{ xs: 'column-reverse', md: 'row' }}>
                        <Grid item xs={12} md={6}>
                            <FadeInWhenVisible animationType="fadeInCenter" delay={0.2}>
                                <Typography
                                    variant="h2"
                                    sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, mb: 2, textAlign: { xs: 'center', md: 'left' } }}
                                >
                                    Engage with Key Issues in Your Local Government <br />
                                    Join our waitlist below:
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    color="text.primary"
                                    sx={{
                                        fontSize: '1rem',
                                        zIndex: '99',
                                        width: { xs: '100%', md: 'calc(100% - 20%)' },
                                        textAlign: { xs: 'center', md: 'left' }
                                    }}
                                >
                                    Download now to become part of a vibrant community dedicated to driving meaningful change. Together, we
                                    can create a brighter future. Your voice matters, join Citizen X today and start making an impact!
                                </Typography>
                                <Stack
                                    direction={{ md: 'row', xs: 'column' }}
                                    sx={{ alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}
                                    spacing={3}
                                    pt={3}
                                    pb={5}
                                >
                                    <Stack direction="column" spacing={2}>
                                        <Button
                                            component={Link}
                                            sx={ButtonSX}
                                            startIcon={<AppleIcon />}
                                            variant="contained"
                                            href=""
                                            target="_blank"
                                            size="large"
                                        >
                                            Coming soon to the Apple App Store
                                        </Button>
                                        <Button
                                            component={Link}
                                            sx={ButtonSX}
                                            startIcon={<GooglePlayIcon src={GooglePlay} />}
                                            variant="contained"
                                            href=""
                                            target="_blank"
                                            size="large"
                                        >
                                            Coming soon to the Google Play Store.
                                        </Button>
                                    </Stack>
                                    <BarcodeImg src={BarcodeI} />
                                </Stack>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {/* <CardMedia component="img" image={HandImg} alt="Layer" sx={{ width: '70%' }} /> */}
                            <FadeInWhenVisible animationType="fadeInLeft" delay={0.5}>
                                <HeaderAnimationImage src={HandImg} alt="CitizenX" />
                            </FadeInWhenVisible>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Trends;
