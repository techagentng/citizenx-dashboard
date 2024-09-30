import { Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';

// assets
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Link } from 'react-router-dom';
import FadeInWhenVisible from './Animation2';

const JumboContainer = styled(Paper)(({ theme }) => ({
    backgroundColor: '#0A4833',
    padding: '50px 10px',
    borderRadius: "20px",
    transform: 'scale(1)',
    [theme.breakpoints.down('xl')]: {
        transform: 'scale(1.1)',
    },
    [theme.breakpoints.down('lg')]: {
        transform: 'scale(1)',
        paddingX: 20
    },
}));

const Jumbo = () => {
    const theme = useTheme();
    return (
        <Container>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                    <FadeInWhenVisible animationType='fadeInCenter' delay={0.3}>
                    <JumboContainer elevation={2}>
                        <Stack
                            direction="column"
                            spacing={4}
                            sx={{
                                color: 'white',
                                textAlign: 'center',
                            }}
                        >
                            <FormatQuoteIcon sx={{
                                color: 'white',
                                fontSize: '4rem',
                                alignSelf: "center",
                            }} />
                            <Typography
                                variant="paragraph"
                                sx={{
                                    fontSize: { xs: '1.3rem', sm: '2rem', md: '2.1rem', lg: '2.1rem' },
                                    lineHeight: 1.5,
                                    paddingX: {xs: 5, md: 2}
                                }}
                            >
                                We are on a mission to leverage technology to revolutionize <br/>citizen engagement 
                                with governance, promote transparency and accountability, and empower communities.
                            </Typography>
                            <Button
                                component={Link}
                                to="/about"
                                variant="contained"
                                size="large"
                                sx={{
                                    backgroundColor: 'white',
                                    color: theme.palette.primary.main,
                                    marginBottom: '20px',
                                    width: 'auto',
                                    alignSelf: 'center',
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.light,
                                    },
                                }}
                            >
                                Learn More
                            </Button>
                        </Stack>
                    </JumboContainer>
                    </FadeInWhenVisible>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Jumbo;
