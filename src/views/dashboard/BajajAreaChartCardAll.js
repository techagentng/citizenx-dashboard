import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

const BajajAreaChartCard = ({ total }) => {
    const theme = useTheme();

    return (
        <Card sx={{ bgcolor: 'secondary.light' }}>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                                Total Reports
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                                {total?.toLocaleString() || '0'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

export default BajajAreaChartCard;