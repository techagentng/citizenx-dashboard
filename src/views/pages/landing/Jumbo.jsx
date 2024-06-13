import { Container, Grid, Paper } from '@mui/material';
import React from 'react'

// material-ui
import {styled } from '@mui/material/styles';

// assets
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const JumboContainer = styled(Paper)(({ theme }) => ({
    backgroundColor: '#0A4833',
    padding:"50px 20px",
    height: "500px",
    borderRadius: "md",
    [theme.breakpoints.down('xl')]: {
        transform: 'scale(1.5)'
    },
    [theme.breakpoints.down('lg')]: {
        transform: 'scale(1.2)'
    }
}));

const Jumbo = () => {
  return (
    <Container>
            <Grid container justifyContent="center" sx={{ textAlign: 'center' }}>
                <Grid item xs={12}>
                    <JumboContainer >
                    <FormatQuoteIcon sx={{
                        color: 'white',
                        fontAlign: 'center',
                    }} />
                        
                        <FormatQuoteIcon/>

                        <Typography>
                        We are on a mission to transform the way citizens engage with governance, ensuring transparency, accountability, and community empowerment.
                        </Typography>

                        <Button component={Link} variant='contained'
                         href="#" target="_blank" size="large">
                            Learn More
                        </Button>

                    </JumboContainer>
                </Grid>
            </Grid>
    </Container>
    
  )
}

export default Jumbo