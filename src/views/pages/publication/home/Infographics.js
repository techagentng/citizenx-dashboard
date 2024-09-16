import React from 'react';
import { Container, Grid, Typography, Box, Divider, Button } from '@mui/material';

//Animation
import FadeInWhenVisible from 'views/pages/landing/Animation2'; 

// Import the images
import cardOneImage from 'assets/images/publication/infographics/info-2.png';
import cardSecondImage from 'assets/images/publication/infographics/info-1.png';
// Page component
import InfoCard from '../components/InfoCard';

const cards = [
    {
        id: 1,
        image: cardOneImage,
        title: 'Citizen Engagement Overview',
        postDate: 'June 3rd, 2024',
        postLink: '#',
    },
    {
        id: 2,
        image: cardSecondImage,
        title: 'Governance Transparency Statistics',
        postDate: 'May 27, 2024',
        postLink: '#',
    },
    {
        id: 3,
        image: cardOneImage,
        title: 'Community Development Progress',
        postDate: 'May 27, 2024',
        postLink: '#',
    },
    
];

const Infographics = () => {
  return (
    <Container>
        <Grid container spacing={7.5} justifyContent="left">
            {/* Heading */}
            <Grid item xs={12} md={6} sx={{ textAlign: 'left' }}>
                    <Grid container spacing={1.5}>
                        <Grid item xs={12}>
                            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                                Infographics
                            </Typography>
                            
                        </Grid>
                    </Grid>
                </Grid>
                {/* Columns */}
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={5} sx={{ '&> .MuiGrid-root > div': { height: '100%' } }}>
                        {cards.map((card, index) => (
                            <Grid key={index} item md={4} sm={12}>
                                <InfoCard
                                    title={card.title}
                                    image={card.image}
                                    postDate={card.postDate}
                                    postLink={card.postLink}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                {/* Divider */}
                <Grid item xs={12}>
                <FadeInWhenVisible animationType='fadeIn' delay={0.3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 5 }}>
                        <Divider sx={{ flexGrow: 1, borderColor: 'grey.300' }} />
                        <Button href='/publication'
                            variant="outlined"
                            sx={{
                                borderRadius: 2,
                                mx: 2,
                                px: 3,
                                py: 1,
                                fontSize: '0.875rem',
                                fontWeight: 'bold',
                                borderColor: 'grey.300',
                                color: 'grey.600',
                                '&:hover': {
                                    borderColor: 'grey.400',
                                    backgroundColor: 'grey.50',
                                },
                            }}
                        >
                            Load More
                        </Button>
                        <Divider sx={{ flexGrow: 1, borderColor: 'grey.300' }} />
                    </Box>
                    </FadeInWhenVisible>
                </Grid>
        </Grid>
    </Container>
  )
}

export default Infographics