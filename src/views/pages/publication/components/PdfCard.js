import PropTypes from 'prop-types';
import SubCard from 'ui-component/cards/SubCard';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// ANIMATION
import FadeInWhenVisible from 'views/pages/landing/Animation2';


const PdfCard = ({ image, title, caption, postLink }) => {
const theme = useTheme();
    
  return (
    <FadeInWhenVisible animationType='fadeIn' delay={0.4}>
        <SubCard
            sx={{
                backgroundColor: theme.palette.grey[900],
                color: theme.palette.common.white,
                padding: 2,
                borderRadius: 2,
                transition: 'transform 0.4s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.02)',
                },
            }}
        >
            <Stack spacing={2.5}>
                <img src={image} height={50} width={50} alt="Pdf icon" />
                <Typography variant="h4" sx={{ fontWeight: 500, color: 'white' }}>
                    {title}
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.primary.main }}>
                    {caption}
                </Typography>
                <Link to={postLink} style={{ color: theme.palette.success.main, textAlign: 'right' }}>
                    Download Report
                </Link>
            </Stack>
        </SubCard>
        </FadeInWhenVisible>
    );
};

PdfCard.propTypes = {
    title: PropTypes.string,
    caption: PropTypes.string,
    image: PropTypes.string,
    postDate: PropTypes.string,
    postLink: PropTypes.string,
};
    

export default PdfCard