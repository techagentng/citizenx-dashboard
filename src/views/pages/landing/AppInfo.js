// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, CardMedia, Container, Grid, Link, Stack, Typography } from '@mui/material';
import React from 'react'

// Assets
import AppleIcon from '@mui/icons-material/Apple';
import { IconCircleCheck } from '@tabler/icons-react';
// import PlayStore from 'assets/images/landing/playStore.png';
import handApp from 'assets/images/landing/handApp.png'

const AppInfo = () => {
    const theme = useTheme();
    const listSX = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
        padding: '10px 0',
        fontSize: '1rem',
        color: theme.palette.grey[900],
        svg: { color: theme.palette.secondary.main }
    };

    const ButtonSX = {
        borderRadius: 'xl',
        backgroundColor: 'black'
    }
  return (
    <Container sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Grid container justifyContent="space-between" alignItems="center" spacing={{ xs: 1.5, sm: 2.5, md: 3, lg: 5 }}></Grid>
            <Grid item xs={12} md={6} sx={{ img: { width: '100%' } }}>
            <Stack sx={{ width: '75%', mb: 5, mx: 'auto' }}>
                        <CardMedia component="img" image={handApp} alt="Layer" />
                    </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container spacing={2.5}>
                    <Grid item xs={12}>
                        <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, mb: 2 }}>
                                Citizen X App: <br/>
                                ommunity for Change
                        </Typography>
                        <Typography sx={{
                            fontSize: '1rem',
                            zIndex: '99',
                            width:{ xs: '100%', sm: '100%', md: 'calc(100% - 20%)' }
                        }}>
                               Get involved, make your voice heard, and get rewards all at your fingertips!
                        </Typography>
                    </Grid>
                    {/* Icons */}
                    <Grid xs={12}>
                        <Typography sx={listSX}>
                            <IconCircleCheck size={20} /> Report Incidents
                        </Typography>
                        <Typography sx={listSX}>
                            <IconCircleCheck size={20} /> Be part of the Community
                        </Typography>
                        <Typography sx={listSX}>
                            <IconCircleCheck size={20} /> Follow Up on Reports
                        </Typography>
                        <Typography sx={listSX}>
                            <IconCircleCheck size={20} /> See Top Reports Hotspots
                        </Typography>
                        <Typography sx={listSX}>
                            <IconCircleCheck size={20} /> Earn Rewards
                        </Typography>

                        <Button component={Link} sx={ButtonSX} startIcon={<AppleIcon />} variant='contained' href="" target="_blank" size="large">
                            Available on Apple Store
                        </Button>
                        <Button component={Link} sx={ButtonSX} variant='contained' href="" target="_blank" size="large">
                            Available on Google Playstore
                        </Button>
                    </Grid>

                </Grid>
            </Grid>
        </Container>
  )
}

export default AppInfo