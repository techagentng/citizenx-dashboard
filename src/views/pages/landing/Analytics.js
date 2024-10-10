import { Box, Button, Container, Grid, Typography, styled, useTheme } from '@mui/material';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

// Assets
import Dashboard from 'assets/images/landing/dashboard.png';
import FadeInWhenVisible from './Animation2';

const Lists = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row'
    }
}));

const Analytics = () => {
    const theme = useTheme();

    const listSX = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
        padding: '10px 0',
        fontSize: '1rem',
        color: theme.palette.grey[900],
        svg: { color: '#17a877' }
    };

    const ListItem = ({ children }) => (
        <Typography sx={listSX}>
            <IconCircleCheckFilled size={20} /> {children}
        </Typography>
    );

    return (
        <Container sx={{ py: 0 }}>
            <Grid container spacing={{ xs: 1.5, sm: 2.5, md: 3, lg: 5 }} justifyContent="space-between" alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, mb: 2 }}>
                        Citizen X Dashboard: <br />
                        Incident Reports & Analytics
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '1rem',
                            zIndex: '99',
                            pt: 1,
                            lineHeight: 1.7,
                            width: { xs: '100%', sm: '100%', md: 'calc(100% - 20%)' }
                        }}
                    >
                        Explore our data-driven dashboard for insights into
                        <br /> citizen engagements and governance
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Lists>
                        <Box>
                            <ListItem>View realtime reports</ListItem>
                            <ListItem>Export report data</ListItem>
                            <ListItem>Compare reports</ListItem>
                        </Box>
                        <Box>
                            <ListItem>View report location map</ListItem>
                            <ListItem>Visualize report data</ListItem>
                            <ListItem>Access analytics on our dashboard</ListItem>
                        </Box>
                    </Lists>
                    <Box sx={{ mt: 5, textAlign: 'left' }}>
                        <Button component={Link} sx={{ backgroundColor: '#17a877' }} variant="contained" to="/dashboard" size="large">
                            Explore Dashboard
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <FadeInWhenVisible animationType="fadeInCenter" delay={0.4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <img src={Dashboard} width="100%" alt="Dashboard" style={{ borderRadius: '30px', padding: 10 }} />
                        </Box>
                    </FadeInWhenVisible>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Analytics;
