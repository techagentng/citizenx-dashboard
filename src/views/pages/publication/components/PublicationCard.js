import React from 'react';
import SubCard from 'ui-component/cards/SubCard';
import { useTheme } from '@mui/material/styles';
import { CardMedia, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

 //aNIMATION
 import FadeInWhenVisible from 'views/pages/landing/Animation';

const PublicationCard = ({ image, title, caption, postDate, postLink }) => {
    const theme = useTheme();

    return (
        <FadeInWhenVisible>
        <SubCard
            sx={{
                height:'500px',
                border: '1px solid',
                borderColor: theme.palette.grey[400],
                '&:hover': {
                    transform: 'scale3d(1.02, 1.02, 1)',
                    transition: 'all .4s ease-in-out',
                },
            }}
        >
            <Stack spacing={2.5}>
                <CardMedia component="img" src={image} sx={{ height: 200, borderRadius: 2 }} alt="Publication" />
                <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    {postDate}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 500 }}>
                    {title}
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.primary.main }}>
                    {caption}
                </Typography>
                <Link to={postLink} style={{ color: theme.palette.success.main, textAlign: 'right' }}>
                    Read More
                </Link>
            </Stack>
        </SubCard>
        </FadeInWhenVisible>
    );
};

export default PublicationCard;
