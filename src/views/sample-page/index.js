// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import EarningCard from 'ui-component/cards/Skeleton/EarningCard';
import EarningIcon from 'assets/images/icons/earning.svg';
// project imports
// import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = ({ isLoading }) => (
    <>
        <MainCard title="Dashboard Page">
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <EarningCard count="106" details="Todays Report" icon={EarningIcon}></EarningCard>
                </Grid>
                <Grid item xs={3}>
                    <EarningCard count="3,323" details="Total Users" icon={EarningIcon}></EarningCard>
                </Grid>
                <Grid item xs={3}>
                    <EarningCard count="176" details="Active Users" icon={EarningIcon}></EarningCard>
                </Grid>
                <Grid item xs={3}>
                    <EarningCard count="230" details="Average Daily Users" icon={EarningIcon}></EarningCard>
                </Grid>
            </Grid>
        </MainCard>
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={10}>
                    {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
                </Grid>
                <Grid item xs={12} md={2}>
                    <PopularCard isLoading={isLoading} />
                </Grid>
            </Grid>
        </MainCard>
    </>
);

export default SamplePage;
