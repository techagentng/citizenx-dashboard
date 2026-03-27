import React from 'react';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import EnhancedComparison from './EnhancedComparison';

const CompareReportsPage = () => {
    return (
        <MainCard title="Compare Reports">
            <Grid container spacing={2} style={{ width: '100%' }}>
                <Grid item xs={12}>
                    <EnhancedComparison />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default CompareReportsPage;
