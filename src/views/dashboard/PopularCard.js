import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
// import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const PopularCard = ({ isLoading, title, data, type }) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [totalReportCount, setTotalReportCount] = useState(null);
    const [, setError] = useState('');
    const [, setLoading] = useState('');

    useEffect(() => {
        const fetchReportCount = async () => {
            try {
                const count = await getTotalReportCount();
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

    if (isLoading) return <SkeletonPopularCard />;

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
                                    <MenuItem onClick={handleClose}> Download pdf</MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ pt: '16px !important' }}>
                        <BajajAreaChartCard />
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
                        {data && data?.length > 0 ? (
                            data.map((item, index) => (
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
                            ))
                        ) : (
                            <Grid container spacing={2} justifyContent="center" alignItems="flex-end">
                                <Grid item xs={12}>
                                    <p>No data available for the selected state and LGA.</p>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
            {/* <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                <Button size="small" disableElevation>
                    View All
                    <ChevronRightOutlinedIcon />
                </Button>
            </CardActions> */}
        </MainCard>
    );
};

export default PopularCard;
