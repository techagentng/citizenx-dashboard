import { useTheme } from '@mui/material/styles';
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types';
import React from 'react'
import SubCard from 'ui-component/cards/SubCard';
import FadeInWhenVisible from './Animation';

// Assets
import Team from 'assets/images/landing/group-afro-americans-working-together 1.png';

const ImpactCard = ({ title, caption}) => {
    const theme = useTheme();
    return (
        <FadeInWhenVisible>
            <SubCard
                sx={{
                    bgcolor: theme.palette.primary.main,
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.divider,
                    '&:hover': { boxShadow: 'none' },
                    height: '100%'
                }}
            >
                    <Stack spacing={2}>
                        <Typography variant="h3" sx={{ fontWeight: 500 }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                            {caption}
                        </Typography>
                    </Stack>
            </SubCard>
        </FadeInWhenVisible>
    );
};

ImpactCard.propTypes = {
    title: PropTypes.string,
    caption: PropTypes.string,
};

const Impact = () => {
  return (
    <Container>
        <Grid container spacing={{ xs: 1.5, sm: 2.5, md: 3, lg: 5 }} justifyContent="space-between" alignItems="center">
            {/* Heading */}
            <Grid item xs={12} md={6}>
                <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                        <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                            What&apos;s the buzz on Citizen X?
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={5} sx={{ '&> .MuiGrid-root > div': { height: '100%' } }}>
                 <Grid item xs={6} md={6}>
                    <ImpactCard 
                    title='Nigerian Citizens to be Registered'
                    caption='We aim to reach 756 local goverment areas, ensuring accessibility and engagement.'/>
                 </Grid>
                 <Grid item xs={6} md={6}>
                    <ImpactCard 
                    title='Nigerian Citizens to be Registered'
                    caption='We aim to reach 756 local goverment areas, ensuring accessibility and engagement.'/>
                 </Grid>
                 <Grid item xs={6} md={6}>
                    <ImpactCard 
                    title='Nigerian Citizens to be Registered'
                    caption='We aim to reach 756 local goverment areas, ensuring accessibility and engagement.'/>
                 </Grid>
                 <Grid item xs={6} md={6}>
                    <ImpactCard 
                    title='Nigerian Citizens to be Registered'
                    caption='We aim to reach 756 local goverment areas, ensuring accessibility and engagement.'/>
                 </Grid>

                </Grid>
            </Grid>

            <Grid item xs={12}>
                    <Box sx={{ textAlign: 'center' }}>
                        <img src={Team} width="100%" alt="Dashboard" style={{ borderRadius: '12px' }} />
                    </Box>
                </Grid>
        </Grid>
    </Container>
  )
}

export default Impact