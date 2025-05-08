import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// project imports
import BajajAreaChartCard from './BajajAreaChartCardAll';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
// import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
// import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const PopularCard = ({ isLoading }) => {
    const dispatch = useDispatch();
    const { total_states } = useSelector((state) => state.graphs.graphs);
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [stateNames, setStateNames] = useState([]);
    const [reportCounts, setReportCounts] = useState([]);
    const [totalStates, setTotalStates] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const response = await fetch('https://citizenx-9hk2.onrender.com/api/v1/reports/states/top');
                const data = await response.json();
                
                // The last item is the total count
                const totalData = data.pop();
                dispatch(setTotalStates(totalData.total_states));
                
                // Sort data by report_count descending (just in case)
                const sortedData = data.sort((a, b) => b.report_count - a.report_count);
                
                setStateNames(sortedData.map(item => item.state_name));
                setReportCounts(sortedData.map(item => item.report_count));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching report data:', error);
                setLoading(false);
            }
        };

        fetchReportData();
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {isLoading || loading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Overall report in Nigeria</Typography>
                                    </Grid>
                                    <Grid item>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            sx={{
                                                color: theme.palette.primary[200],
                                                cursor: 'pointer'
                                            }}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}> Today</MenuItem>
                                            <MenuItem onClick={handleClose}> This Month</MenuItem>
                                            <MenuItem onClick={handleClose}> This Year </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ pt: '16px !important' }}>
                                <BajajAreaChartCard total={total_states} />
                            </Grid>
                            <Grid item xs={12}>
                                {stateNames.map((state, index) => (
                                    <React.Fragment key={state}>
                                        <Grid container direction="column">
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            {state}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Grid container alignItems="center" justifyContent="space-between">
                                                            <Grid item>
                                                                <Typography variant="subtitle1" color="inherit">
                                                                    {reportCounts[index].toLocaleString()}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Avatar
                                                                    variant="rounded"
                                                                    sx={{
                                                                        width: 16,
                                                                        height: 16,
                                                                        borderRadius: '5px',
                                                                        backgroundColor: theme.palette.success.light,
                                                                        color: theme.palette.success.dark,
                                                                        ml: 2
                                                                    }}
                                                                >
                                                                    <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                                                </Avatar>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                                                    {((reportCounts[index] / totalStates) * 100).toFixed(1)}% of total
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        {index < stateNames.length - 1 && <Divider sx={{ my: 1.5 }} />}
                                    </React.Fragment>
                                ))}
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;