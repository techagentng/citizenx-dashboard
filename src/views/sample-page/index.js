// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import EarningCard from 'ui-component/cards/Skeleton/EarningCard';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
    <MainCard title="Dashboard Page">
        <Grid container>
            <Grid item xs={3}>
                <EarningCard></EarningCard>
            </Grid>
        </Grid>
    </MainCard>
);

export default SamplePage;
