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
import { getStateReportCountsAllx } from '../../services/reportService';
import BajajAreaChartCard from './BajajAreaChartCardAll';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const PopularCard = ({ isLoading }) => {
    const theme = useTheme();

    const [topStates, setTopStates] = useState({});
    const [totalStates, setTotalStates] = useState(0);

    // Fetch all-time state report data on mount
    useEffect(() => {
        getStateReportCountsAllx()
            .then((data) => {
                console.log('PopularCardAll getStateReportCountsAllx response:', data);
                setTopStates(Array.isArray(data.top_states) ? data.top_states : []);
                setTotalStates(typeof data.total_states === 'number' ? data.total_states : 0);
            })
            .catch(() => {
                setTopStates([]);
                setTotalStates(0);
            });
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const [processedStates, setProcessedStates] = useState([]);
    const [processedTotal, setProcessedTotal] = useState(0);
    const [showAll, setShowAll] = useState(false);

    // Process topStates
    useEffect(() => {
        if (!topStates || typeof topStates !== 'object') return;

        // Convert topStates object to array of {stateName, reportCount} objects
        const statesData = Object.entries(topStates).map(([stateName, reportCount]) => ({
            stateName,
            reportCount
        }));
        const maybeTotal = statesData[statesData.length - 1];

        let total = totalStates;
        if (maybeTotal?.total_states !== undefined) {
            total = maybeTotal.total_states;
            statesData.pop(); // remove the total object
        }

        const validStates = statesData.filter(
            (s) => s && s.stateName && typeof s.reportCount === 'number'
        );

        setProcessedStates(validStates);
        setProcessedTotal(total);
    }, [topStates, totalStates]);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const getPercentage = (count) =>
        processedTotal > 0 ? ((count / processedTotal) * 100).toFixed(1) : 0;

    if (isLoading) {
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
                                <React.Fragment key={`${state.stateName}-${index}`}>
    <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={6}>
            <Typography variant="subtitle1" color="textPrimary">
                {state.stateName || state.state_name}
            </Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Typography variant="h6" color="primary">
                {state.reportCount || state.report_count}
            </Typography>
            <Typography variant="caption" sx={{ color: 'success.dark' }}>
                {getPercentage(state.reportCount || state.report_count)}% of total
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
