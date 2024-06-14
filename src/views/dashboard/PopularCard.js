import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { useTheme } from '@mui/material/styles';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
// import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { gridSpacing } from 'store/constant';
import { getGraph } from 'store/slices/graphs'; // Import getGraph instead of fetchGraphData

const PopularCard = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { reportTypes, reportCounts, loading, error } = useSelector((state) => state.graphs);

    // Fetch data on component mount
    useEffect(() => {
        dispatch(getGraph()); // Dispatch getGraph to fetch data
    }, [dispatch]);

    const renderPopularItems = () => {
        if (loading || !reportTypes || !reportCounts) {
            return <SkeletonPopularCard />;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        return (
            <MainCard content={false}>
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignContent="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h4">Popular Incidents</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        {reportTypes.map((type) => (
                            <Grid item xs={12} key={type.id}>
                                <Divider sx={{ my: 1.5 }} />
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    {type?.name}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            {/* {reportCounts[index]?.count} */}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                    <Avatar
                                                            variant="rounded"
                                                            sx={{
                                                                width: 16,
                                                                height: 16,
                                                                borderRadius: '5px',
                                                                backgroundColor: theme.palette.orange.light,
                                                                color: theme.palette.orange.dark,
                                                                ml: 2
                                                            }}
                                                        >
                                                            <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                                        </Avatar>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
                <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                    <Button size="small" disableElevation>
                        View All
                        <ChevronRightOutlinedIcon />
                    </Button>
                </CardActions>
            </MainCard>
        );
    };

    return renderPopularItems();
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
