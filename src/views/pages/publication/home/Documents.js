import React from 'react';
import { Container, Grid, Typography } from '@mui/material';


// Import the images
import cardOneImage from 'assets/images/publication/pdf 1.png';
import PdfCard from '../components/PdfCard';

const cards = [
    {
        id: 1,
        image: cardOneImage,
        title: 'Annual Report 2023',
        caption: 'Collaborating with government agencies, NGOs, and community-based organizations. Ensuring that government actions are open and accountable to the people.',
        postLink: '#',
    },
    {
        id: 2,
        image: cardOneImage,
        title: 'Community Impact Study',
        caption: 'Collaborating with government agencies, NGOs, and community-based organizations. Ensuring that government actions are open and accountable to the people.',
        postLink: '#',
    },
    {
        id: 3,
        image: cardOneImage,
        title: 'Digital Engagement Metrics',
        caption: 'Collaborating with government agencies, NGOs, and community-based organizations. Ensuring that government actions are open and accountable to the people.',
        postLink: '#',
    },
    
];
const Documents = () => {
  return (
    <Container>
        <Grid container spacing={7.5} justifyContent="left">
            {/* Heading */}
            <Grid item xs={12} md={6} sx={{ textAlign: 'left' }}>
                    <Grid container spacing={1.5}>
                        <Grid item xs={12}>
                            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                                Reports and Research
                            </Typography>
                            
                        </Grid>
                    </Grid>
                </Grid>
                {/* Columns */}
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={5} sx={{ '&> .MuiGrid-root > div': { height: '100%' } }}>
                        {cards.map((card, index) => (
                            <Grid key={index} item md={4} sm={12}>
                                <PdfCard
                                    title={card.title}
                                    image={card.image}
                                    caption={card.caption}
                                    postLink={card.postLink}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                
        </Grid>
    </Container>
  )
}

export default Documents