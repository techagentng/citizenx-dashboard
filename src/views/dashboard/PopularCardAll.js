import PropTypes from 'prop-types';
import React from 'react';
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
            total_states = 0, 
            topStates = [] // Ensure default is empty array
        }, 
        loading: reduxLoading,
        error
    } = useSelector((state) => state.graphs);
    
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);

    React.useEffect(() => {
        dispatch(fetchTotalStates());
    }, [dispatch]);

    // Debug the data structure
    React.useEffect(() => {
        console.log('Current topStates:', topStates);
        console.log('Type of topStates:', typeof topStates);
    }, [topStates]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getPercentage = (count) => {
        return total_states > 0 ? ((count / total_states) * 100).toFixed(1) : 0;
    };

    const normalizeStatesData = (data) => {
        // If data is already in correct format
        if (Array.isArray(data) && data.every(item => item.state_name && item.report_count)) {
            return data;
        }
        
        // If data is an object with top_states array
        if (data?.top_states && Array.isArray(data.top_states)) {
            return data.top_states;
        }
        
        // If data is an object with state names as keys
        if (data && typeof data === 'object' && !Array.isArray(data)) {
            return Object.entries(data).map(([state_name, report_count]) => ({
                state_name,
                report_count: Number(report_count) || 0
            }));
        }
        
        // Default fallback
        return [];
    };

    const renderStates = () => {
        const normalizedStates = normalizeStatesData(topStates);
        
        if (!normalizedStates.length) {
            return (
                <Typography variant="body2">
                    No state data available
                </Typography>
            );
        }

        return normalizedStates.map((state, index) => (
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
                {index < normalizedStates.length - 1 && <Divider sx={{ my: 1.5 }} />}
            </React.Fragment>
        ));
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

    return (
        <>
            {isLoading || reduxLoading ? (
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
                                {renderStates()}
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