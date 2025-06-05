import React from 'react';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import CompareForms from '../dashboard/CompareForms';

const CompareReportsPage = () => {
    return (
        <MainCard title="Compare reports">
            <Grid container spacing={2} style={{ width: '100%' }}>
                <Grid item xs={12}>
                    <CompareForms />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default CompareReportsPage;
