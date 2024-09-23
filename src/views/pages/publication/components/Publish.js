import React from 'react';
import { Stack, Typography, Button, Grid, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import sectionImage from 'assets/images/publication/subscribe.webp'

const Publish = () => {
    const theme = useTheme();

  return (
    <Container>
        <Grid container>
            <Grid item xs={12} md={6} display='flex' flexDirection='column' justifyContent='center' gap={3} >
                
                    <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                    Contribute to Our Publications
                    </Typography>
                    <Typography 
                        variant="body2" align="left"
                        sx={{
                            fontSize: '1rem',
                            zIndex: '99',
                            pt: 1,
                            lineHeight: 1.7,
                            width: { xs: '100%', sm: '100%', md: 'calc(100% - 20%)' },
                        }}
                    >
                    We welcome contributions from our community. If you have insights or stories to share, please contact us.
                    </Typography>
                    <Stack direction="row" spacing={2}>
                    <Button
                        component={Link}
                        to="/submit-article"
                        variant="contained"
                        color="success"
                        sx={{ textTransform: 'none' }}
                    >
                        Submit Your Article
                    </Button>
                    <Button
                        component={Link}
                        to="/contact-us"
                        variant="outlined"
                        sx={{ textTransform: 'none' }}
                    >
                        Contact Us
                    </Button>
                    </Stack>
                
            </Grid>
            <Grid item xs={12} md={6}>
                <img
                    src={sectionImage}
                    alt="Contribute"
                    style={{
                        borderRadius: theme.shape.borderRadius,
                        width: '100%',
                        maxWidth: '500px',
                        height: '400px',
                        objectFit: 'cover',
                    }}
                    />
            </Grid>
        </Grid>
    </Container>
  )
}

export default Publish