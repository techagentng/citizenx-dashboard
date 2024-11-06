import React from 'react';
import { styled } from '@mui/material/styles';
import { Container, Grid, Stack, Typography } from '@mui/material';

// third party
import { motion } from 'framer-motion';

// Images
import Hero from 'assets/images/about/nupo-deyon-daniel-67ruAEYmp4c-unsplash 1 (1).png';

const HeaderImage = styled('img')({
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: '20px 5px',
    borderRadius: '30px',
    objectFit: 'cover'
});

const HeaderSection = () => {
    const headerSX = {
        fontSize: { xs: '2rem', sm: '2.5rem', md: '2.5rem', lg: '2.5rem' }
    };

    return (
        <Container>
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: { xs: 10, sm: 6, md: 18.75 }, mb: { xs: 2.5, md: 10 } }}
            >
                <Grid item xs={12}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{ type: 'spring', stiffness: 150, damping: 30 }}
                            >
                                <Stack spacing={1}>
                                    <Typography textAlign={{ xs: 'center', md: 'left' }} variant="h1" sx={headerSX}>
                                        Strengthening Voices for Accountability and Transparency
                                    </Typography>
                                </Stack>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.2 }}
                            >
                                <Typography
                                    textAlign={{ xs: 'center', md: 'left' }}
                                    color="text.primary"
                                    variant="body1"
                                    sx={{ fontSize: { xs: '0.8rem', md: '1rem' }, paddingY: '10px', width: '50%' }}
                                >
                                    CitizenX Nigeria was founded on the belief that every citizen deserves a voice in governance. By
                                    regularly monitoring and measuring performance over time, we aim to encourage accountability and
                                    transparency, making significant strides in citizen engagement and digital governance.
                                </Typography>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <HeaderImage src={Hero} />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: { xs: 'center', md: 'left' }, marginLeft: { xs: 0, md: '50%' } }}>
                    <motion.div
                        initial={{ opacity: 0, translateY: 550 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'spring', stiffness: 150, damping: 30 }}
                    >
                        <Stack spacing={1}>
                            <Typography textAlign={{ xs: 'center', md: 'left' }} variant="h1" sx={headerSX}>
                                Our Purpose: The Future of Citizen Engagement
                            </Typography>
                        </Stack>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, translateY: 550 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.2 }}
                    >
                        <Typography
                            textAlign={{ xs: 'center', md: 'left' }}
                            color="text.primary"
                            variant="body1"
                            sx={{ fontSize: { xs: '0.8rem', md: '1rem' }, paddingY: '10px', width: '100%' }}
                        >
                            As we look to the future, CitizenX Nigeria is committed to continuing its mission of empowering citizens and
                            enhancing community engagement. We are constantly evolving, adding new features, and finding innovative ways to
                            make your voice heard. The future of citizen engagement is here, and it’s in your hands. With the CitizenX
                            platform, you’re not just a spectator—you’re an active participant in shaping the future of your local community
                            in Nigeria. Join us and be part of the change.
                        </Typography>
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HeaderSection;
