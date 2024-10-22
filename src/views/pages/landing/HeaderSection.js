import { Link as RouterLink } from 'react-router-dom';
import { useMemo } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Button, Container, Grid, Link, Stack, Typography } from '@mui/material';
import Discuss from 'assets/images/landing/chat_1147963.png';
import Report from 'assets/images/landing/megaphone_477813.png';

// third party
import { motion } from 'framer-motion';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useConfig from 'hooks/useConfig';

// assets
import Hero from 'assets/images/landing/hero.png';
import BgDark from 'assets/images/landing/bg-hero-block-dark.png';
import BgLight from 'assets/images/landing/bg-hero-block-light.png';
import { DASHBOARD_PATH } from 'config';

// styles
const HeaderImage = styled('img')(({ theme }) => ({
    maxWidth: '80%',
    borderRadius: 20,
    transform: 'scale(1.7)',
    transformOrigin: theme.direction === 'rtl' ? '100% 50%' : '0 50%',
    [theme.breakpoints.down('xl')]: {
        transform: 'scale(1.5)',
        marginBottom: '-60px'
    },
    [theme.breakpoints.down('lg')]: {
        transform: 'scale(1.2)'
    }
}));

const HeaderAnimationImage = styled('img')({
    maxWidth: '80%',
    filter: 'drop-shadow(0px 0px 50px rgb(33 150 243 / 30%))'
});

// Icon style
const iconStyle = {
    padding: '20px'
};

const Icon = styled('img')({
    padding: '30px',
    filter: 'drop-shadow(0px 0px 50px rgb(33 150 243 / 30%))'
});

// ==============================|| LANDING - HEADER PAGE ||============================== //

const HeaderSection = () => {
    const theme = useTheme();
    const { rtlLayout } = useConfig();

    const headerSX = {
        fontSize: { xs: '2rem', sm: '3rem', md: '3rem', lg: '3rem' }
    };

    const HeaderAnimationImagememo = useMemo(
        () => (
            <HeaderAnimationImage
                src={theme.palette.mode === 'dark' ? BgDark : BgLight}
                alt="Berry"
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    position: 'absolute',
                    filter: 'none',
                    bottom: { lg: 0, md: 0 },
                    right: 0,
                    width: '50%',
                    transformOrigin: '50% 50%',
                    transform: rtlLayout ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
            />
        ),
        [rtlLayout, theme]
    );

    return (
        <Container sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: { xs: 10, sm: 6, md: 18.75 }, mb: { xs: 2.5, md: 10 } }}
            >
                <Grid item xs={12} md={5}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{ type: 'spring', stiffness: 150, damping: 30 }}
                            >
                                <Stack spacing={1}>
                                    <Typography textAlign={{ xs: 'center', md: 'left' }} variant="h1" sx={headerSX}>
                                        Revolutionizing Citizen Engagement in Nigeria
                                    </Typography>
                                </Stack>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: -2.5, textAlign: { xs: 'center', md: 'left' } }}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.2 }}
                            >
                                <Typography
                                    textAlign={{ xs: 'center', md: 'left' }}
                                    color="text.primary"
                                    variant="body1"
                                    sx={{ fontSize: { xs: '1rem', md: '1.125rem' } }}
                                >
                                    <Box component="span" sx={{ fontWeight: 'bold' }}>
                                        Your Reports, Your Community, Your Impact -
<<<<<<< HEAD
                                    </Box><br/>
                                    Join us in making a difference by engaging, reporting, and staying informed. 
=======
                                    </Box>
                                    <br />
                                    Join us in making a difference by engaging, reporting, and staying informed.
>>>>>>> upstream/main
                                </Typography>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.4 }}
                            >
                                <Grid container spacing={2} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                    <Grid item>
                                        <AnimateButton>
                                            <Button
                                                component={RouterLink}
                                                to={DASHBOARD_PATH}
                                                target="_blank"
                                                size="large"
                                                variant="contained"
                                                sx={{ backgroundColor: '#17a877', color: '#fff' }}
                                            >
                                                Explore Dashboard
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            component={Link}
                                            variant="outlined"
                                            href=""
                                            target="_blank"
                                            size="large"
                                            sx={{ color: '#17a877', borderColor: '#17a877' }}
                                        >
                                            Download App
                                        </Button>
                                    </Grid>
                                </Grid>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={7} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Box sx={{ position: 'relative', mt: 8.75, zIndex: 9 }}>
                        <HeaderImage src={Hero} alt="Berry" />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: { md: -35, lg: -110 },
                                right: theme.direction === 'rtl' ? 170 : { md: -50, lg: -140, xl: -220 },
                                width: { md: 220, lg: 290 },
                                animation: '10s slideY linear infinite'
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.2 }}
                            >
                                <Box style={iconStyle}></Box>
                                <Icon src={Discuss} width="50%" height="50%" />
                            </motion.div>
                        </Box>
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: { md: -20, lg: -90 },
                                left: { md: 60, lg: 60 },
                                width: { md: 220, lg: 280 },
                                animation: '10s slideY linear infinite',
                                animationDelay: '2s'
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.4 }}
                            >
                                <Box style={iconStyle}>
                                    <Icon width="80%" height="80%" src={Report} />
                                </Box>
                            </motion.div>
                        </Box>
                    </Box>
                    {HeaderAnimationImagememo}
                </Grid>
            </Grid>
        </Container>
    );
};

export default HeaderSection;
