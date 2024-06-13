import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography, Stack, CardMedia } from '@mui/material';

// project imports
import FadeInWhenVisible from './Animation';
import SubCard from 'ui-component/cards/SubCard';
import Avatar from 'ui-component/extended/Avatar';

// assets
import Offer1 from 'assets/images/landing/features/image 1.png';
import Offer2 from 'assets/images/landing/features/image 2.png';
import Offer3 from 'assets/images/landing/features/image 3.png';
import Offer4 from 'assets/images/landing/features/image 4.png';

const OfferCard = ({ title, caption, image }) => {
    const theme = useTheme();
    const AvaterSx = { background: 'transparent', color: theme.palette.secondary.main, width: 56, height: 56 };
    return (
        <FadeInWhenVisible>
            <SubCard
                sx={{
                    bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.100',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.divider,
                    '&:hover': { boxShadow: 'none' },
                    height: '100%'
                }}
            >
                <Stack spacing={4}>
                    <Avatar variant="rounded" sx={AvaterSx}>
                        <CardMedia component="img" src={image} alt="Beautiful User Interface" />
                    </Avatar>
                    <Stack spacing={2}>
                        <Typography variant="h3" sx={{ fontWeight: 500 }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                            {caption}
                        </Typography>
                    </Stack>
                </Stack>
            </SubCard>
        </FadeInWhenVisible>
    );
};

OfferCard.propTypes = {
    title: PropTypes.string,
    caption: PropTypes.string,
    image: PropTypes.string
};

const Cards = () => {
  return (
    <Container>
        <Grid container spacing={7.5} justifyContent="left">
            {/* Heading */}
            <Grid item xs={12} md={6} sx={{textAlign: "left"}}>
                <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                        <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                            What&apos;s the buzz on Citizen X?
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            {/* Colums */}
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={5} sx={{ '&> .MuiGrid-root > div': { height: '100%' } }}>
                    <Grid item md={3} sm={6}>
                        <OfferCard
                            title="Incident Reporting"
                            caption="Easily report incidents and contribute to community safety and development"
                            image={Offer1}
                        />
                    </Grid> 

                    <Grid item md={3} sm={6}>
                        <OfferCard
                            title="Reward System"
                            caption="Earn rewards for your engagement and contributions"
                            image={Offer2}
                        />
                    </Grid> 

                    <Grid item md={3} sm={6}>
                        <OfferCard
                            title="Dashboard Data Analysis"
                            caption="Access insightful data to stay informed and make a difference"
                            image={Offer3}
                        />
                    </Grid> 

                    <Grid item md={3} sm={6}>
                        <OfferCard
                            title="Transparency and Accountability"
                            caption="Promoting open and honest governance"
                            image={Offer4}
                        />
                    </Grid> 
                </Grid>
            </Grid>

        </Grid>
    </Container>
  )
}

export default Cards