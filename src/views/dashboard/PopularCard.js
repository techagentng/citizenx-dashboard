import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, CardContent, Divider, Grid, Menu, MenuItem, Typography, Button } from '@mui/material';
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { getTopStateReportCounts } from 'services/reportService';

const PopularCard = ({ isLoading, title, data = [], type, totalReportCount }) => {  // Default to an empty array
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [, setError] = useState('');
    const [, setLoading] = useState('');
    const [showAll, setShowAll] = useState(false);  // State to toggle the visibility of the entire list
    const [totalStateReports, setTotalStateReports] = useState(0);

    // Debug logging
    console.log('PopularCard - Props:', { isLoading, title, data, type, totalReportCount });
    console.log('PopularCard - Data items:', data);

    useEffect(() => {
        getTopStateReportCounts()
            .then((data) => {
                setTotalStateReports(data.total_states || 0);
            })
            .catch((error) => {
                console.error('Failed to fetch total state reports:', error);
            });
    }, []);

    // Limit for how many items to show initially
    const ITEM_LIMIT = 7;

    useEffect(() => {
        const fetchReportCount = async () => {
            try {
                const count = await getTotalReportCount(); // Assuming this is a function that gets the count
                setTotalReportCount(count);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchReportCount();
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleList = () => {
        setShowAll(!showAll); // Toggle between showing all items or just the first 7
    };

    if (isLoading) return <SkeletonPopularCard />;

    // Ensure data is an array before using slice or accessing properties
    const itemsToDisplay = showAll ? (Array.isArray(data) ? data : []) : (Array.isArray(data) ? data.slice(0, ITEM_LIMIT) : []);

    return (
        <MainCard content={false}>
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignContent="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h4">{title}</Typography>
                            </Grid>
                            <Grid item>
                                <MoreHorizOutlinedIcon
                                    fontSize="large"
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
                                    <MenuItem onClick={handleClose}>Download pdf</MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ pt: '16px !important' }}>
                        <BajajAreaChartCard totalStates={totalStateReports} totalReportCount={totalReportCount}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="subtitle1" color="inherit">
                                            {totalReportCount}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    {totalReportCount}
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
                        </Grid>
                        <Divider sx={{ my: 1.5 }} />
                        {itemsToDisplay && itemsToDisplay.length > 0 ? (
                            itemsToDisplay.map((item, index) => {
                                console.log('PopularCard - Rendering item:', item, 'with type:', type);
                                return (
                                    <Grid container direction="column" key={index}>
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        {type === 'reportTypes'
                                                            ? item.reportType
                                                            : type === 'states'
                                                              ? item.stateName
                                                              : item.lgaName}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item>
                                                            <Typography variant="subtitle1" color="inherit">
                                                                {type === 'reportTypes' ? item.reportCount : item.reportCount}
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
                                        <Divider sx={{ my: 1.5 }} />
                                    </Grid>
                                );
                            })
                        ) : (
                            <Grid container spacing={2} justifyContent="center" alignItems="flex-end">
                                <Grid item xs={12}>
                                    <p>No data available for the selected state and LGA.</p>
                                </Grid>
                            </Grid>
                        )}
                        {data?.length > ITEM_LIMIT && (
                            <Grid item xs={12} sx={{ pt: 2 }}>
                                <Button onClick={toggleList} sx={{ textTransform: 'none' }}>
                                    {showAll ? 'Read Less' : 'Read More'}
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </MainCard>
    );
};

export default PopularCard;
