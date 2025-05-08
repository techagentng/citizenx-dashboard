import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import BajajAreaChartCard from './BajajAreaChartCardAll';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { fetchTotalStates } from 'store/slices/graphs';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

const PopularCard = ({ isLoading }) => {
    const dispatch = useDispatch();
    const { 
        graphs: { 
            topStates = []
        }, 
        loading: reduxLoading,
        error
    } = useSelector((state) => state.graphs);
    
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [processedStates, setProcessedStates] = useState([]);
    const [processedTotal, setProcessedTotal] = useState(0);

    // Process the data when topStates changes
    useEffect(() => {
        if (!topStates || !Array.isArray(topStates)) return;
        
        // The last item is the total count
        const statesData = [...topStates]; // Create a copy
        const totalData = statesData.pop(); // Remove and get the last item
        
        // Filter out any invalid entries
        const validStates = statesData.filter(state => 
            state && state.state_name && typeof state.report_count === 'number'
        );
        
        setProcessedStates(validStates);
        setProcessedTotal(totalData?.total_states || 0);
    }, [topStates]);

    // Fetch data on mount
    useEffect(() => {
        dispatch(fetchTotalStates());
    }, [dispatch]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getPercentage = (count) => {
        return processedTotal > 0 ? ((count / processedTotal) * 100).toFixed(1) : 0;
    };

    if (error) {
        return (
            <MainCard content={false}>
                <CardContent>
                    <Typography color="error">
                        Error loading data: {error.message || 'Unknown error'}
                    </Typography>
                </CardContent>
            </MainCard>
        );
    }

    if (isLoading || reduxLoading) {
        return <SkeletonPopularCard />;
    }

    return (
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
                        <BajajAreaChartCard total={processedTotal} />
                    </Grid>
                    <Grid item xs={12}>
                        {processedStates.length > 0 ? (
                            processedStates.map((state, index) => (
                                <React.Fragment key={`${state.state_name}-${index}`}>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        {state.state_name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item>
                                                            <Typography variant="subtitle1" color="inherit">
                                                                {state.report_count.toLocaleString()}
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
                                                {getPercentage(state.report_count)}% of total
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    {index < processedStates.length - 1 && <Divider sx={{ my: 1.5 }} />}
                                </React.Fragment>
                            ))
                        ) : (
                            <Typography variant="body2">
                                No state data available
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </MainCard>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;