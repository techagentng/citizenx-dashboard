import React from 'react';
import { styled } from '@mui/material/styles';
import { Container, Grid, Stack, Typography } from '@mui/material';

// third party
import { motion } from 'framer-motion';

// Images
import Hero from 'assets/images/about/nupo-deyon-daniel-67ruAEYmp4c-unsplash 1 (1).png'

const HeaderImage = styled('img')({
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: '20px 5px',
    borderRadius: '30px',
    objectFit: 'cover',
  });

const HeaderSection = () => {
    const headerSX = { 
        fontSize: { xs: '2rem', sm: '2.5rem', md: '2.5rem', lg: '2.5rem' }, 
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
                                        Our Story 
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
                                    Citizen X Nigeria was founded with the belief that every citizen deserves a voice in governance. Our journey began in [Year], when a group of passionate individuals came together with the vision of creating a more transparent and accountable government. Since then, we are growing into a dynamic organization, making significant strides in citizen engagement and digital governance.
                                </Typography>
                            </motion.div>
                    </Grid>
                </Grid>
                </Grid>
                <Grid item xs={12}>
                    <HeaderImage src={Hero} />
                </Grid>
                <Grid item xs={12} sx={{textAlign:{xs:'center', md:'left'},  marginLeft:{xs: 0, md:'55%'}}}>
                <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{ type: 'spring', stiffness: 150, damping: 30 }}
                            >
                                <Stack spacing={1}>
                                    <Typography textAlign={{ xs: 'center', md: 'left' }} variant="h1" sx={headerSX}>
                                        Our Purpose 
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
                                    At CitizenX, our mission is to transform the way citizens engage with governance. We strive to promote transparency, accountability, and community empowerment through innovative digital solutions and active citizen participation.
                                </Typography>
                            </motion.div>
                </Grid>
            </Grid>
    </Container>
  )
}

export default HeaderSection