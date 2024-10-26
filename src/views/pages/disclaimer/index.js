import React from 'react';
import { Container, Typography } from '@mui/material';
import AppBar from 'ui-component/extended/AppBar';

function Disclaimer() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <AppBar />
            <Typography variant="h1" align="center" gutterBottom sx={{mt:16}}>
                CitizenX Disclaimer
            </Typography>
            <Typography paragraph>
                CitizenX is a platform designed to empower citizens by providing tools to report local issues and incidents. Please note that CitizenX is not affiliated with, endorsed by, or representative of any government entity.
            </Typography>
            <Typography paragraph>
                The information on this app, website, and dashboard is sourced from user-generated reports and publicly available data. CitizenX does not verify the accuracy or authenticity of user-submitted content and does not facilitate any official government services.
            </Typography>
            <Typography paragraph>
                For verified information, we encourage users to refer to official government sources. CitizenX aims to foster a responsible, informed community, and we advise users to use discretion when interpreting content within the app, dashboard, or website.
            </Typography>
            <Typography paragraph>
                Your engagement with CitizenX contributes to a more connected, proactive community. However, any actions taken based on information from this platform are at your own discretion. Thank you for using CitizenX!
            </Typography>
        </Container>
    );
}

export default Disclaimer;
