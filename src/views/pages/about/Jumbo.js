// material-ui 
import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import FadeInWhenVisible from '../landing/Animation2'

const PaperSX = {
    backgroundColor: '#0A4833',
    padding: '50px',
    borderRadius: "20px",
    transform: 'scale(1)'
}

const JumboContainer = ({title, caption, Jumbolink}) =>{
    const theme = useTheme();
    return(
        <FadeInWhenVisible animationType='FadeIn' delay={0.4}>
            <Paper elevation={2} sx={PaperSX}>
            <Stack spacing={3} >
                <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, mb: 2, textAlign: 'center', color: 'white' }}>
                        {title}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        color="white"
                        sx={{
                        fontSize: '1rem',
                        lineHeight: 1.5,
                        zIndex: '99',
                        textAlign: 'center',
                        paddingX: {xs: 3, md: 25}
                        }}
                    >
                    {caption}
                    </Typography>

                    <Button
                                component={Link}
                                to= {Jumbolink} 
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
            </Paper>
        </FadeInWhenVisible>
    )
};

JumboContainer.propTypes = {
    title: PropTypes.string,
    caption: PropTypes.string,
    Jumbolink: PropTypes.string
}


const Jumbo = () => {
  return (
    <Container>
        <JumboContainer
        title='Get Involved'
        caption='Join us in making a difference. Whether you want to volunteer, donate, or simply stay informed, there are many ways to get involved with Citizen X.'
        Jumbolink='#' />
    </Container>
  )
}

export default Jumbo