import React from 'react'
// import PropTypes from 'propengagementIcon-types'; ..
import { useTheme } from '@mui/material/styles';
import { Box, Avatar, CardMedia, Container, Grid, Stack, Typography } from '@mui/material'

// Animation
import FadeInWhenVisible from '../landing/Animation2';

import engagementIcon from 'assets/images/about/icons/social-media_3930528.png';
import securityIcon from 'assets/images/about/icons/shield_508250.png';
import communityIcon from 'assets/images/about/icons/community_8987703.png';
 
const BoxContent =[
    {
        id: 1,
        title: 'Digital Engagement' ,
        caption: 'CitizenX uses cutting-edge technology to enhance digital engagement, enabling real-time reporting, community incident analysis, and active participation. Our platform modernizes how citizens interact with governance and stay informed.',
        image: engagementIcon 
    },
    {
        id: 2,
        title: 'Transparency & Accountability' ,
        caption: 'We promote transparency and accountability by making every report and feedback visible and actionable. This ensures that authorities and leaders are held accountable and that governance remains open and honest.',
        image: securityIcon 
    },
    {
        id: 3,
        title: 'Community Empowerment' ,
        caption: 'CitizenX empowers communities by providing tools for reporting issues, sharing insights, and participating in local decision-making. We help build resilient communities by giving citizens a voice and enabling them to drive change.',
        image: communityIcon 
    }
]

const IconBox = ({title, caption, image})=>{
    const theme = useTheme();
    const AvaterSx = { background: 'transparent', color: theme.palette.secondary.main, width: 56, height: 56 };
return(
        <FadeInWhenVisible animationType="fadeIn" delay={0.2}>
                    <Box
                        sx={{
                            height: '100%',
                            backgroundColor: 'inherit',
                            border: 'none',
                            padding: 2,
                            '&hover':{
                                boxShadow: 'none',
                            }
                        }}
                    >
                        <Stack spacing={4}>
                            <Avatar variant="rounded" sx={AvaterSx}>
                                <CardMedia component="img" src={image} alt="Focus Icons" />
                            </Avatar>
                            <Stack spacing={2}>
                                <Typography variant="h3" sx={{ fontWeight: 500 }}>
                                    {title}
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '1rem', width:'80%' }}>
                                    {caption}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </FadeInWhenVisible>
)
}

IconBox.propTypes = {
    title: PropTypes.string,
    caption: PropTypes.string,
    image: PropTypes.string
}

const Focus = () => {

  return (
    <Container 
            sx={{
                padding:'40px 20px',
                backgroundColor: '#c7f7e7',
                borderRadius: 5
            }} 
            >
        <Grid container spacing={5} justifyContent="left">
            <Grid item md={6} sx={{textAlign: "left"}}>
            <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                        <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, pl: 1 }}>
                            Focus Areas
                        </Typography>
                    </Grid>
                    </Grid>
            </Grid>
            <Grid item >
                <Grid container justifyContent="center" spacing={5} sx={{ '&> .MuiGrid-root > div': { height: '100%' } }}>
                    {BoxContent.map((data, index)=>{
                        return(
                            <Grid key={index} item xs={12} md={4} >
                                <IconBox title={data.title} caption={data.caption} image={data.image} />
                            </Grid>
                        );
                    })};
                    
                </Grid>
            </Grid>
        </Grid>

    </Container>
  )
}

export default Focus