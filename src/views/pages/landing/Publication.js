import React from 'react';
import PublicationCard from './PublicationCard';
import { Container, Grid, Typography, Box, Divider, Button } from '@mui/material';

    // Import the images
    import cardOneImage from 'assets/images/cards/card-1.jpg';
    import cardSecondImage from 'assets/images/cards/card-2.jpg';
    import cardThirdImage from 'assets/images/cards/card-1.jpg';
    import cardFourthImage from 'assets/images/cards/card-3.jpg';
    
const cards = [
    {
        id: 1,
        image: cardOneImage,
        title: 'Transforming Governance by Engaging Youths Digitally',
        postDate: '24th, June 2024',
        caption: 'Collaborating with government agencies, NGOs, and community-based organizations. Ensuring that government actions are open and accountable to the people.',
        postLink: '#',
    },
    {
        id: 2,
        image: cardSecondImage,
        title: 'Transforming Governance by Engaging Youths Digitally',
        postDate: '24th, June 2024',
        caption: 'Collaborating with government agencies, NGOs, and community-based organizations. Ensuring that government actions are open and accountable to the people.',
        postLink: '#',
    },
    {
        id: 3,
        image: cardThirdImage,
        title: 'Transforming Governance by Engaging Youths Digitally',
        postDate: '24th, June 2024',
        caption: 'Collaborating with government agencies, NGOs, and community-based organizations. Ensuring that government actions are open and accountable to the people.',
        postLink: '#',
    },
    {
        id: 4,
        image: cardFourthImage,
        title: 'Transforming Governance by Engaging Youths Digitally',
        postDate: '24th, June 2024',
        caption: 'Collaborating with government agencies, NGOs, and community-based organizations. Ensuring that government actions are open and accountable to the people.',
        postLink: '#',
    },
];

const Publication = () => {
    return (
        <Container>
            <Grid container spacing={7.5} justifyContent="left">
                {/* Heading */}
                <Grid item xs={12} md={6} sx={{ textAlign: 'left' }}>
                    <Grid container spacing={1.5}>
                        <Grid item xs={12}>
                            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                                Publications
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    zIndex: '99',
                                    width: { xs: '100%', sm: '100%', md: 'calc(100% - 20%)' },
                                }}
                            >
                                Explore our data-driven dashboard for insights into citizen engagements and governance
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Columns */}
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={5} sx={{ '&> .MuiGrid-root > div': { height: '100%' } }}>
                        {cards.map((card, index) => (
                            <Grid key={index} item md={3} sm={6}>
                                <PublicationCard
                                    title={card.title}
                                    caption={card.caption}
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
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 5 }}>
                        <Divider sx={{ flexGrow: 1, borderColor: 'grey.300' }} />
                        <Button
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
                            View Publications
                        </Button>
                        <Divider sx={{ flexGrow: 1, borderColor: 'grey.300' }} />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Publication;
