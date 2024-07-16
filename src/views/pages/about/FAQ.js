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
        title: 'When do I need Extended License?',
        defaultExpand: true,
        content:
            'If your End Product which is sold - Then only your required Extended License. i.e. If you take subscription charges (monthly, yearly, etc...) from your end users in this case you required Extended License.'
    },
    {
        id: 'basic2',
        title: 'What Support Includes?',
        content: '6 Months of Support Includes with 1 year of free updates. We are happy to solve your bugs, issue.'
    },
    {
        id: 'basic3',
        title: 'Is Berry Support TypeScript?',
        content: 'Yes, Berry Support the TypeScript and it is only available in Plus and Extended License.'
    },
    {
        id: 'basic4',
        title: 'Is there any RoadMap for Berry?',
        content:
            'Berry is our flagship React Dashboard Template and we always add the new features for the long run. You can check the Roadmap in Documentation.'
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