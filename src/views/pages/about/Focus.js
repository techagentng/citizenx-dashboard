import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, Avatar, CardMedia, Container, Grid, Stack, Typography } from '@mui/material';

// Animation
import FadeInWhenVisible from '../landing/Animation2';

import engagementIcon from 'assets/images/about/icons/social-media_3930528.png';
import securityIcon from 'assets/images/about/icons/shield_508250.png';
import communityIcon from 'assets/images/about/icons/community_8987703.png';

const BoxContent = [
    {
        id: 1,
        title: 'Digital Engagement',
        caption: 'Leveraging technology to enhance citizen interaction with governance processes.',
        image: engagementIcon
    },
    {
        id: 2,
        title: 'Transparency & Accountability',
        caption: 'Ensuring that government actions are open and accountable to the people',
        image: securityIcon
    },
    {
        id: 3,
        title: 'Community Empowerment',
        caption: 'Empowering local communities to voice their needs and participate in governance.',
        image: communityIcon
    }
];

const IconBox = ({ title, caption, image }) => {
    const theme = useTheme();
    const AvaterSx = { background: 'transparent', color: theme.palette.secondary.main, width: 56, height: 56 };
    return (
        <FadeInWhenVisible animationType="fadeIn" delay={0.2}>
            <Box
                sx={{
                    height: '100%',
                    backgroundColor: 'inherit',
                    border: 'none',
                    padding: 2,
                    '&hover': {
                        boxShadow: 'none'
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
                        <Typography variant="body2" sx={{ fontSize: '1rem', width: '80%' }}>
                            {caption}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </FadeInWhenVisible>
    );
};

IconBox.propTypes = {
    title: PropTypes.string,
    caption: PropTypes.string,
    image: PropTypes.string
};

const Focus = () => {
    // const theme = useTheme();

    return (
        <Container
            sx={{
                padding: '40px 20px',
                backgroundColor: '#c7f7e7',
                borderRadius: 5
            }}
        >
            <Grid container spacing={5} justifyContent="left">
                <Grid item md={6} sx={{ textAlign: 'left' }}>
                    <Grid container spacing={1.5}>
                        <Grid item xs={12}>
                            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, pl: 1 }}>
                                Focus Areas
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justifyContent="center" spacing={5} sx={{ '&> .MuiGrid-root > div': { height: '100%' } }}>
                        {BoxContent.map((data, index) => {
                            return (
                                <Grid key={index} item xs={12} md={4}>
                                    <IconBox title={data.title} caption={data.caption} image={data.image} />
                                </Grid>
                            );
                        })}
                        ;
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Focus;
