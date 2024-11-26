import React from 'react';
import { Container, Typography } from '@mui/material';
import AppBar from 'ui-component/extended/AppBar';

function Disclaimer() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <AppBar />
            <Typography variant="h1" align="center" gutterBottom sx={{ mt: 16 }}>
                CitizenX Nigeria Disclaimer
            </Typography>
            <Typography paragraph>
                CitizenX Nigeria is a platform designed to empower Nigerian citizens by providing tools to report local issues and
                incidents, as well as measure the key performance of local governance in their communities. Please note that CitizenX
                Nigeria is not affiliated with, endorsed by, or representative of any government entity.
            </Typography>
            <Typography paragraph>
                The information on this app, website, and dashboard is sourced from user-generated reports. All government-related
                information can be sourced from{' '}
                <a href="http://nigeria.gov.ng/" target="_blank" rel="noopener noreferrer">
                    http://nigeria.gov.ng/
                </a>
                , the official website of the Federal Government of Nigeria, and other official government websites.
            </Typography>
            <Typography paragraph>
                CitizenX Nigeria does not verify the accuracy or authenticity of user-submitted content and does not facilitate any official
                government services. For verified information, we encourage users to refer to official government sources.
            </Typography>
            <Typography paragraph>
                CitizenX Nigeria aims to foster a responsible, informed community. We advise users to exercise discretion when interpreting
                content within the app, dashboard, or website.
            </Typography>
            <Typography paragraph>
                Your engagement with CitizenX Nigeria contributes to a more connected, proactive community. However, any actions taken based
                on information from this platform are at your own discretion. Thank you for using CitizenX Nigeria!
            </Typography>
        </Container>
    );
}

export default Disclaimer;
