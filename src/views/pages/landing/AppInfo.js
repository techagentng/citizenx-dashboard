// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Button, CardMedia, Container, Grid, Link, Stack, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

// Project Imports
import FadeInWhenVisible from './Animation'; // Ensure this path is correct and the component is exported properly

// Assets
import AppleIcon from '@mui/icons-material/Apple';
import GooglePlay from 'assets/images/landing/playstore_300218.png'
import { IconCircleCheckFilled } from '@tabler/icons-react';
import handApp from 'assets/images/landing/handApp.png';
import screenone from 'assets/images/landing/phone-image.png';
import screentwo from 'assets/images/landing/image44.png';
import screenthree from 'assets/images/landing/image45.png';

const AppInfo = () => {
    const theme = useTheme();

    const listSX = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
        padding: '10px 0',
        fontSize: '1rem',
        color: theme.palette.grey[900],
        svg: { color: '#17a877' }
    };

    const ButtonSX = {
        borderRadius: 20,
        backgroundColor: 'black',
    };

    const Screensection = styled(Box)(({theme}) => ({
        width: "100%",
        backgroundColor: theme.palette.primary.light,
        borderRadius: 20,
        padding: "80px 20px 0px 20px",
        margin: "0px 10px",
        overflow: 'none',
        boxShadow: theme.shadows[0]
        }));

        const GooglePlayIcon = styled('img')({
            width: '20px',
            height: '20px',
        });

    const ScreeColumn = ({ title, caption, image }) => (
        <FadeInWhenVisible>
            <Stack direction="column" alignItems="left">
                <Typography variant="h4" fontWeight={800} align="left" marginLeft={12} marginBottom={1}>{title}</Typography>
                <Typography align="left" marginLeft={12} color={theme.palette.text.secondary} paddingRight={10}>{caption}</Typography>
                <img src={image} alt="Phone screen" style={{ width: '100%', height: 'auto' }} />
            </Stack>    
        </FadeInWhenVisible>
    );

    ScreeColumn.propTypes = {
        title: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    };

    return (
        <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Grid container justifyContent="space-between" alignItems="center" spacing={{ xs: 1.5, sm: 2.5, md: 3, lg: 5 }}>
                <Grid item xs={12} md={6} sx={{ img: { width: '100%' } }}>
                    <Stack sx={{ width: '75%', mb: {xs: 0, lg:'-50px'}, mx: 'auto' }}>
                        <CardMedia component="img" image={handApp} alt="Layer" />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2.5}>
                        <Grid item xs={12}>
                            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, mb: 2 }}>
                                Citizen X App: <br />
                                Community for Change
                            </Typography>
                            <Typography sx={{
                                fontSize: '1rem',
                                zIndex: '99',
                                pt: 1,
                                lineHeight: 1.7,
                                width: { xs: '100%', sm: '100%', md: 'calc(100% - 30%)' },
                            }}>
                                Get involved, make your voice heard, and get rewards all at your fingertips!
                            </Typography>
                        </Grid>
                        {/* Icons */}
                        <Grid item xs={12}>
                            <Typography sx={listSX}>
                                <IconCircleCheckFilled size={20} /> Report Incidents
                            </Typography>
                            <Typography sx={listSX}>
                                <IconCircleCheckFilled size={20} /> Be part of the Community
                            </Typography>
                            <Typography sx={listSX}>
                                <IconCircleCheckFilled size={20} /> Follow Up on Reports
                            </Typography>
                            <Typography sx={listSX}>
                                <IconCircleCheckFilled size={20} /> See Top Reports Hotspots
                            </Typography>
                            <Typography sx={listSX}>
                                <IconCircleCheckFilled size={20} /> Earn Rewards
                            </Typography>
                            {/* Buttons */}
                            <Stack direction='column' spacing={2} pt={2} pb={5} sx={{width: '60%'}}>
                                <Button component={Link} sx={ButtonSX} startIcon={<AppleIcon />} variant='contained' href="" target="_blank" size="large">
                                    Available on Apple Store
                                </Button>
                                <Button component={Link} sx={ButtonSX} startIcon={<GooglePlayIcon src={GooglePlay}/>} variant='contained' href="" target="_blank" size="large">
                                    Available on Google Playstore
                                </Button>
                            </Stack>
                            
                        </Grid>
                    </Grid>
                </Grid>
                {/* Phone Screens */}
                <Screensection>
                    <Grid container justifyContent="space-between">
                        <Grid item xs={12} md={4}>
                            <ScreeColumn
                                title='Report Incidents'
                                caption="Get involved, make your voice heard, and get rewards all at your fingertips!"
                                image={screenone}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ScreeColumn
                                title='View Hotspots'
                                caption="Get involved, make your voice heard, and get rewards all at your fingertips!"
                                image={screentwo}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ScreeColumn
                                title='Earn Rewards'
                                caption="Get involved, make your voice heard, and get rewards all at your fingertips!"
                                image={screenthree}
                            />
                        </Grid>
                    </Grid>
                </Screensection>
            </Grid>
        </Container>
    );
}

export default AppInfo;
