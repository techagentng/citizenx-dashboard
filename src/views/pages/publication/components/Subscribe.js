import { Button, Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import FadeInWhenVisible from 'views/pages/landing/Animation2';

const Jumbo = styled(Paper)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    margin: '0 auto',
    width: '100%',
    height: 'auto',
    borderRadius: '20px'
});

const ButtonSX = {
    borderRadius: 2,
    backgroundColor: 'success',
    color: 'white',
    padding: '10px 20px', // Add padding for better button spacing
    width: '50%'
};

const Subscribe = () => {
    return (
        <Container>
            <FadeInWhenVisible animationType="fadeIn" delay={0.3}>
                <Jumbo sx={{ paddingX: { xs: 5, md: 15 }, paddingY: 15 }} elevation={2}>
                    <Grid container spacing={5} sx={{ alignItems: 'center' }} direction={{ xs: 'column-reverse', md: 'row' }}>
                        <Grid item xs={12} md={6} sx={{ marginTop: { xs: '20px', md: '1px' } }}>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: '1.5rem', sm: '2.125rem' },
                                    mb: 2,
                                    textAlign: { xs: 'center', md: 'left' },
                                    color: 'white'
                                }}
                            >
                                Subscribe to our news letter for updates.
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                color="white"
                                sx={{
                                    fontSize: '1rem',
                                    zIndex: '99',
                                    width: { xs: '100%', md: 'calc(100% - 20%)' },
                                    textAlign: { xs: 'center', md: 'left' }
                                }}
                            >
                                Receive updates from all 774 local governments, with active citizens keeping you informed about your local
                                communities. Subscribe now!
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={4} maxWidth="full">
                                <TextField placeholder="Full Name" type="text" autoComplete="current-password" />

                                <TextField placeholder="Your Email Address" type="email" autoComplete="current-password" />

                                <Button variant="contained" color="success" sx={ButtonSX}>
                                    Subscribe
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Jumbo>
            </FadeInWhenVisible>
        </Container>
    );
};

export default Subscribe;
