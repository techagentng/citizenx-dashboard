import { Box, Button, ButtonGroup, Container, Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import PublicationCard from '../components/PublicationCard'


// Import the images
import blogOneImage from 'assets/images/publication/blog/blog-1.png';
import blogTwoImage from 'assets/images/publication/blog/blog-2.png';
import blogThreeImage from 'assets/images/publication/blog/blog-3.png';
import blogFourImage from 'assets/images/publication/blog/blog-4.png';




import FadeInWhenVisible from 'views/pages/landing/Animation';

const data = [
    {
        id: 1,
        image: blogOneImage,
        title: 'Transforming Governance by Engaging Youths Digitally',
        postDate: '24th, May 2024',
        caption: 'Collaborating with government agencies, NGOs, and community-based organizations. Ensuring that government actions are open and accountable to the people.',
        category: 'health',
        postLink: '#',
    },
    {
        id: 2,
        image: blogTwoImage,
        title: 'Community Empowerment: Success Stories',
        postDate: '24th, June 2024',
        caption: 'Collaborating with government agencies, NGOs, and community-based organizations. Ensuring that government actions are open and accountable to the people.',
        category: 'crime',
        postLink: '#',
    },
    {
        id: 3,
        image: blogThreeImage,
        title: 'Transparency and Accountability in Action',
        postDate: '4th, July 2024',
        caption: 'Collaborating with government agencies, NGOs, and community-based organizations. Ensuring that government actions are open and accountable to the people.',
        category: 'politics',
        postLink: '#',
    },
    {
        id: 4,
        image: blogFourImage,
        title: 'Skill Empowerment for Students',
        postDate: '24th, August 2024',
        caption: 'Collaborating with government agencies, NGOs, and community-based organizations. Ensuring that government actions are open and accountable to the people.',
        category: 'education',
        postLink: '#',
    },
];

const Category = () => {
    const [category, setCategory] = useState(data);
    const [activeCategory, setActiveCategory] = useState('all');
    
    // Filter by category
    const filterCat = (cat) =>{

        setActiveCategory(cat)
        if (cat == 'all'){
            setCategory(data)
        }else{
            setCategory(
                data.filter((item)=>{
                    return item.category === cat;
                })
            );
        }  
    };

  return (
    <>
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                        Featured Publication
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                {/* filter row */}
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    {['all', 'crime', 'education', 'politics', 'health'].map((cat)=>(
                    
                        <Button key={cat}
                                onClick={()=> filterCat(cat)} 
                                sx={{
                                    color: activeCategory === cat ? 'white' : 'grey.600',
                                    backgroundColor: activeCategory === cat ? '#0A4833' : 'white',
                                    '&:hover': {
                                        backgroundColor: activeCategory === cat ? 'primary.light' : 'grey.100',
                                        color:"grey.600"
                                    },
                                }}>
                                    
                                    {cat.charAt(0).toLocaleUpperCase() + cat.slice(1)}
                        </Button>

                        )
                    )};
                    
                </ButtonGroup>
                </Grid>
                
                {category.map((card, index)=>{
                    return(
                        
                    <Grid key={index} item xs={12} md={3}>
                        <PublicationCard
                            title={card.title}
                            caption={card.caption}
                            image={card.image}
                            postDate={card.postDate}
                            postLink={card.postLink}
                        />
                    </Grid>
                    )
                })}
                {/* Divider */}
                <Grid item xs={12}>
                <FadeInWhenVisible>
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
                            View Publications
                        </Button>
                        <Divider sx={{ flexGrow: 1, borderColor: 'grey.300' }} />
                    </Box>
                    </FadeInWhenVisible>
                </Grid>
            </Grid>
            
            
        </Container>
    </>
  )
}

export default Category