import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    CardContent,
    Divider,
    Grid,
    Menu,
    MenuItem,
    Typography,
    CardActions,
    Button
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import BajajAreaChartCard from './BajajAreaChartCardAll';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { fetchTotalStates } from 'store/slices/graphs';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const PopularCard = ({ isLoading }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    // Get data from Redux store
    const { graphs, loading: reduxLoading, error } = useSelector((state) => state.graphs);
    const { topStates = [], total_states = 0 } = graphs || {};

    // Debug logs for API/Redux shape
    console.log('Redux graphs state:', graphs);
    console.log('topStates:', topStates);
    console.log('total_states:', total_states);

    const [anchorEl, setAnchorEl] = useState(null);
    const [processedStates, setProcessedStates] = useState([]);
    const [processedTotal, setProcessedTotal] = useState(0);
    const [showAll, setShowAll] = useState(false);

    // Fetch data on component mount
    useEffect(() => {
        dispatch(fetchTotalStates());
    }, [dispatch]);

    // Process topStates when data changes
    useEffect(() => {
        if (!Array.isArray(topStates)) {
            setProcessedStates([]);
            return;
        }

        const statesData = [...topStates]; // Create a new array
        const maybeTotal = statesData[statesData.length - 1];

        let total = total_states;
        if (maybeTotal?.total_states !== undefined) {
            total = maybeTotal.total_states;
            statesData.pop(); // remove the total object
        }

        const validStates = statesData.filter(
            (s) => s && s.state_name && typeof s.report_count === 'number'
        );

        setProcessedStates(validStates);
        setProcessedTotal(total);
    }, [topStates, total_states]);

    // Fetch on mount
    useEffect(() => {
        dispatch(fetchTotalStates());
    }, [dispatch]);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const getPercentage = (count) =>
        processedTotal > 0 ? ((count / processedTotal) * 100).toFixed(1) : 0;

    if (error) {
        console.log('PopularCardAll error:', error);
        return (
            <MainCard content={false}>
                <CardContent>
                    <Typography color="error">
                        Error loading data: {error.message || JSON.stringify(error) || 'Unknown error'}
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
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h4">Overall report in Nigeria</Typography>
                            </Grid>
                            <Grid item>
                                <MoreHorizOutlinedIcon
                                    fontSize="small"
                                    sx={{ color: theme.palette.primary[200], cursor: 'pointer' }}
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
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                >
                                    <MenuItem onClick={handleClose}>Today</MenuItem>
                                    <MenuItem onClick={handleClose}>This Month</MenuItem>
                                    <MenuItem onClick={handleClose}>This Year</MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ pt: '16px !important' }}>
                        <BajajAreaChartCard total={processedTotal} />
                    </Grid>

                    <Grid item xs={12}>
                        {processedStates.length > 0 ? (
                            (processedStates.slice(0, showAll ? processedStates.length : 7)).map((state, index) => (
                                <React.Fragment key={`${state.state_name}-${index}`}>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1">{state.state_name}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Grid container alignItems="center" spacing={1}>
                                                        <Grid item>
                                                            <Typography variant="subtitle1">
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
                                                                    color: theme.palette.success.dark
                                                                }}
                                                            >
                                                                <KeyboardArrowUpOutlinedIcon fontSize="small" />
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
                            <Typography variant="body2">No state data available</Typography>
                        )}
                    </Grid>

                    {!showAll && processedStates.length > 7 && (
                        <Grid item xs={12}>
                            <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                                <Button size="small" disableElevation onClick={() => setShowAll(true)}>
                                    View All
                                    <ChevronRightOutlinedIcon />
                                </Button>
                            </CardActions>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </MainCard>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
