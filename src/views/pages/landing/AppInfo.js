// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Button, CardMedia, Container, Grid, Link, Stack, Typography } from '@mui/material';
import React from 'react';

// Project Imports
import FadeInWhenVisible from './Animation2';

// Assets
import AppleIcon from '@mui/icons-material/Apple';
import GooglePlay from 'assets/images/landing/playstore_300218.png';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import handApp from 'assets/images/landing/handApp.png';
import screenone from 'assets/images/landing/phone-image.png';
import screentwo from 'assets/images/landing/image44.png';
import screenthree from 'assets/images/landing/image45.png';

const AppInfo = () => {
    const theme = useTheme();

    // DOWLOAD APP BUTTONS
    const ButtonSX = {
        borderRadius: 20,
        backgroundColor: 'black',
        [theme.breakpoints.down('sm')]: {
            width: '300px'
        }
    };

    const StoreButton = ({ href, icon, label }) => (
        <Button component={Link} sx={ButtonSX} startIcon={icon} variant="contained" href={href} target="_blank" size="large">
            {label}
        </Button>
    );

    // LIST ITEMS
    const listSX = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
        padding: '10px 0',
        fontSize: '1rem',
        color: theme.palette.grey[900],
        svg: { color: '#17a877' }
    };

    const ListItem = ({ children }) => (
        <Typography sx={listSX}>
            <IconCircleCheckFilled size={20} /> {children}
        </Typography>
    );

    const Screensection = styled(Box)(({ theme }) => ({
        width: '100%',
        backgroundColor: '#E6FFE5',
        borderRadius: 20,
        padding: theme.spacing(10, 2, 0),
        margin: theme.spacing(0, 1),
        boxShadow: theme.shadows[0]
    }));

    const GooglePlayIcon = styled('img')({
        width: '20px',
        height: '20px'
    });

    const ScreeColumn = ({ title, caption, image }) => (
        <FadeInWhenVisible animationType="fadeIn" delay={0.4}>
            <Stack alignItems="left">
                <Typography variant="h4" fontWeight={800} align="left" marginLeft={12} marginBottom={1}>
                    {title}
                </Typography>
                <Typography align="left" marginLeft={12} color={theme.palette.text.secondary} paddingRight={10}>
                    {caption}
                </Typography>
                <img
                    src={image}
                    alt="Phone screen"
                    style={{
                        width: '100%',
                        height: 'auto',
                        transform: {
                            xs: 'scaleX(-1)',
                            md: 'none'
                        }
                    }}
                />
            </Stack>
        </FadeInWhenVisible>
    );

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Grid container justifyContent="space-between" alignItems="center" spacing={{ xs: 1.5, sm: 2.5, md: 3, lg: 5 }}>
                <Grid item xs={12} md={6} sx={{ img: { width: '100%' } }}>
                    <FadeInWhenVisible animationType="fadeInCenter" delay={0.3}>
                        <Box sx={{ width: '75%', mb: { xs: 0, lg: '-50px' }, mx: 'auto' }}>
                            <CardMedia component="img" image={handApp} alt="Layer" />
                        </Box>
                    </FadeInWhenVisible>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2.5}>
                        <Grid item xs={12}>
                            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, mb: 2 }}>
                                Citizen X App: <br />
                                Community for Change
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    zIndex: '99',
                                    pt: 1,
                                    lineHeight: 1.7,
                                    width: { xs: '100%', sm: '100%', md: 'calc(100% - 30%)' }
                                }}
                            >
                                Get involved, make your voice heard, and get rewards all at your fingertips!
                            </Typography>
                        </Grid>
                        {/* Icons */}
                        <Grid item xs={12}>
                            <ListItem>Report Incidents</ListItem>
                            <ListItem>Be part of the Community</ListItem>
                            <ListItem>Follow Up on Reports</ListItem>
                            <ListItem>See Top Reports Hotspots</ListItem>
                            <ListItem>Earn Rewards</ListItem>

                            {/* Buttons */}
                            <Stack direction="column" spacing={2} pt={2} pb={5} sx={{ width: '60%' }}>
                                <StoreButton href="" icon={<AppleIcon />} label="Coming soon on Apple Store " />
                                <StoreButton href="" icon={<GooglePlayIcon src={GooglePlay} />} label="Coming soon to the Google Play." />
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Phone Screens */}
                <Screensection>
                    <Grid container justifyContent="space-between">
                        <Grid item xs={12} md={4}>
                            <ScreeColumn
                                title="Report Incidents"
                                caption="Got a concern or event? Just take a photo, record a voice note, choose a category, add details, and submit."
                                image={screenone}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ScreeColumn
                                title="View Hotspots"
                                caption="Explore a stream of verified reports from fellow citizens and stay informed about key issues in your local community."
                                image={screentwo}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ScreeColumn
                                title="Earn Rewards"
                                caption="Get involved on CitizenX today, make your voice heard, and start earning rewards quickly!"
                                image={screenthree}
                            />
                        </Grid>
                    </Grid>
                </Screensection>
            </Grid>
        </Container>
    );
};

export default AppInfo;
