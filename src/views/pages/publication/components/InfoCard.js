import PropTypes from 'prop-types';
import SubCard from 'ui-component/cards/SubCard';
import { useTheme } from '@mui/material/styles';
import { CardMedia, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// ANIMATION
import FadeInWhenVisible from 'views/pages/landing/Animation2';

const InfoCard = ({image, title, postDate, postLink}) => {
    const theme = useTheme();

  return (
    <>
    <FadeInWhenVisible>
        <SubCard
            sx={{
                border: '1px solid',
                borderColor: theme.palette.grey[400],
                '&:hover': {
                    transform: 'scale3d(1.02, 1.02, 1)',
                    transition: 'all .4s ease-in-out',
                },
            }}
        >
            <Stack spacing={2.5}>
                <CardMedia component="img" src={image} sx={{ height: 300, borderRadius: 2 }} alt="Publication" />
                <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    {postDate}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 500 }}>
                    {title}
                </Typography>
                <Link to={postLink} style={{ color: theme.palette.success.main, textAlign: 'right' }}>
                    Preview
                </Link>
            </Stack>
        </SubCard>
        </FadeInWhenVisible>
    </>
  )
};

InfoCard.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    postDate: PropTypes.string,
    postLink: PropTypes.string,
};

export default InfoCard