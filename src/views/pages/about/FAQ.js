// material-ui
// import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Accordion from 'ui-component/extended/Accordion';
import { gridSpacing } from 'store/constant';

import React from 'react'
import FadeInWhenVisible from '../landing/Animation2';



const basicData = [
    {
        id: 'basic1',
        title: 'What is CitizenX?',
        defaultExpand: true,
        content:
            'CitizenX is a digital platform designed to empower citizens by allowing them to report local issues, share insights, and stay informed about their communities. It promotes transparency, accountability, and community engagement by making every contribution visible and actionable.'
    },
    {
        id: 'basic2',
        title: 'How does CitizenX work?',
        content: 'CitizenX allows users to report incidents by submitting photos, voice notes, or written reports on local events, issues, or achievements. These reports are then made available for the community and local authorities to see and take action on. Users can also earn rewards for their contributions.'
    },
    {
        id: 'basic3',
        title: 'What type of incidents can I report?',
        content: 'You can report a wide range of issues, including safety concerns, public events, infrastructure problems, community achievements, and more. Simply choose the appropriate category when submitting your report.'
    },
    {
        id: 'basic4',
        title: 'How do I earn points on CitizenX?',
        content:
            'Users earn points by submitting reports, following up on existing reports, and engaging with the platform. These points can be redeemed for various rewards through the CitizenX Token Reward System.'
    },
    {
        id: 'basic5',
        title: 'Who can view the reports I submit?',
        content:
            'All reports are visible to other users in your community and local authorities, ensuring transparency and accountability. CitizenX ensures that reports are reviewed and addressed by relevant parties.'
    },
    {
        id: 'basic6',
        title: 'Can I update or follow up on a report I made?',
        content:
            'Yes, CitizenX encourages users to follow up on their reports by adding more details or context, which can enhance the credibility of the report. Following up also earns you additional points.'
    },
    {
        id: 'basic7',
        title: 'What rewards can I earn through CitizenX?',
        content:
            'CitizenX rewards users with points for their contributions. These points can be redeemed for airtime, data, or other tangible rewards. The more you engage, the more you earn.'
    },
    {
        id: 'basic8',
        title: 'How does CitizenX ensure that reports are addressed ?',
        content:
            'CitizenX promotes accountability by making reports visible to the public and relevant authorities. Local government representatives and community leaders can track issues through the platform and act on them accordingly.'
    },
    {
        id: 'basic9',
        title: 'Can I remain anonymous when submitting a report?',
        content:
            'Yes, CitizenX offers the option to submit reports anonymously. However, providing your details can help authorities follow up more effectively.'
    },
    {
        id: 'basic10',
        title: 'How do I get started with CitizenX?',
        content:
            'Simply download the CitizenX app, create an account, and start submitting reports. You can also browse reports from others in your community to stay informed about local issues.'
    },
    {
        id: 'basic11',
        title: 'Is CitizenX free to use?',
        content:
            'Yes, CitizenX is free to download and use. All features, including reporting and browsing incidents, are available to users at no cost.'
    },
    {
        id: 'basic12',
        title: 'How can I contact CitizenX for support or questions?',
        content:
            'For support, inquiries, or suggestions, you can reach out to us through the "Contact Us" section in the app or visit our website for more information.'
    }
];

const FAQ = () => {
    
  return (
    <Container>
        <Grid container justifyContent="center" spacing={gridSpacing}>
        <Grid item xs={12}>
                <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, textAlign: 'center', mb: 2 }}>
                    FAQ
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <FadeInWhenVisible animationType='FadeIn' delay={0.3} >
                <MainCard sx={{ textAlign: 'left' }} elevation={4} border={false} boxShadow shadow={4}>
                    <Accordion data={basicData} />
                </MainCard>
                </FadeInWhenVisible>
            </Grid>
        </Grid>
    </Container>
  )
}

export default FAQ