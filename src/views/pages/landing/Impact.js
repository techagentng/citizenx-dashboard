import { useTheme } from '@mui/material/styles';
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import SubCard from 'ui-component/cards/SubCard';
import FadeInWhenVisible from './Animation2';

// Assets
import Team from 'assets/images/landing/group-afro-americans-working-together 1.png';

const Cards = [
    {
    id: 1,
    title: 'Nigerian Citizens to be Reached',
    caption: 'We aim to reach 756 local government areas, ensuring accessibility and engagement.'
},
{
    id: 2,
    title: 'Communities to be Supported',
    caption: 'Supporting rural communities to ensure their voices are heard'
},
{
    id: 3,
    title: 'Institutional Partnerships',
    caption: 'Collaborating with government agencies, NGOs, and community-based organizations.'
},
{
    id: 4,
    title: 'Core Personnel',
    caption: 'Our dedicated team of experts in technology, community development, and governance.'
}
]

const ImpactCard = ({ title, caption}) => {
    const theme = useTheme();
    return (
        <FadeInWhenVisible animationType='fadeIn' delay={0.3} >
            <SubCard
                sx={{
                    backgroundColor: '#E6FFE5',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.divider,
                    '&:hover': { boxShadow: 'none' },
                    height: '100%',
                    padding: '20px 10px'
                }}
            >
                    <Stack spacing={2}>
                        <Typography variant="h3" sx={{ fontWeight: 500 }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '1rem', maxWidth:'90%' }}>
                            {caption}
                        </Typography>
                    </Stack>
            </SubCard>
        </FadeInWhenVisible>
    );
};


const Impact = () => {
  return (
    <Container>
        <Grid container spacing={{ xs: 1.5, sm: 2.5, md: 3, lg: 5 }} justifyContent="space-between" alignItems="center">
            {/* Heading */}
            <Grid item xs={12}>
                <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                        <Typography variant="h2" sx={{ textAlign:'center', fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                            Our Impact Projections
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={5} sx={{ '&> .MuiGrid-root > div': { height: '100%' } }}>
                 {Cards.map((data, index)=>{
                    return(
                    <Grid key={index} item xs={6} md={6}>
                        <ImpactCard 
                        title={data.title}
                        caption={data.caption}/>
                    </Grid>
                    )
                 })}
                 
                 
                </Grid>
            </Grid>

            <Grid item xs={12}>
                    <Box sx={{ textAlign: 'center' }}>
                        <FadeInWhenVisible animationType='fadeInCenter' delay={0.3}>
                        <img src={Team} width="100%" alt="Dashboard" style={{ borderRadius: '10px', padding: 10 }} />
                        </FadeInWhenVisible>
                    </Box>
                </Grid>
        </Grid>
    </Container>
  )
}

export default Impact