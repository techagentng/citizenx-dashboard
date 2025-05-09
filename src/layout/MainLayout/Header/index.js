import React, { useCallback, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, useMediaQuery, MenuItem, TextField, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from 'store/slices/menu';
import { setState, setLga, getGraph } from 'store/slices/graphs';
import { getCategories } from 'services/reportService';
import { useStatesAndLgas } from 'hooks/useStatesAndLgas';

import LogoSection from '../LogoSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import FullScreenSection from './FullScreenSection';
import NotificationSection from './NotificationSection';
import LAYOUT_CONST from 'constant';
import useConfig from 'hooks/useConfig';
import FloatingCart from './FloatingCart';
import { IconMenu2 } from '@tabler/icons-react';

const Header = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);
    const { lgaState: { state, lga }, reportType: selectedReportType } = useSelector((state) => state.graphs);
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const { layout } = useConfig();
    const [dateRange] = React.useState([null, null]);
    const [, setReportTypes] = React.useState(['Select type']);

    // Use shared hook for states and LGAs
    const [selectedState, setSelectedState] = React.useState(state || '');
    const [selectedLga, setSelectedLga] = React.useState(lga || '');
    const { states, lgas } = useStatesAndLgas(selectedState);

    // Set default LGA when state or lgas change
    useEffect(() => {
        if (lgas.length > 0 && !selectedLga) {
            setSelectedLga(lgas[0].value);
            dispatch(setLga(lgas[0].value));
        }
    }, [selectedState, lgas, selectedLga, dispatch]);

    const handleStateChange = (event) => {
        const stateName = event.target.value;
        setSelectedState(stateName);
        dispatch(setState(stateName));
        setSelectedLga(''); // Reset LGA when state changes
    };

    const handleLgaChange = (event) => {
        const lgaName = event.target.value;
        setSelectedLga(lgaName);
        dispatch(setLga(lgaName));
    };

    // const handleDateRangeChange = (newValue) => {
    //     setDateRange(newValue);
    // };

    const handleSearch = useCallback(() => {
        const [startDate, endDate] = dateRange;
        dispatch(getGraph(state, lga, startDate?.format('YYYY-MM-DD'), endDate?.format('YYYY-MM-DD'), selectedReportType));
    }, [dispatch, state, lga, dateRange, selectedReportType]);

    useEffect(() => {
        if (state && lga && state !== 'State' && lga !== 'LGA') {
            handleSearch();
        }
    }, [state, lga, dateRange, handleSearch]);

    useEffect(() => {
        getCategories()
            .then((types) => {
                const reportTypeOptions = ['Select Report Type', ...types];
                setReportTypes(reportTypeOptions);
            })
            .catch((error) => {
                console.error('Failed to fetch categories:', error);
            });
    }, []);

    const percentCount = useSelector((state) => state.graphs.reportPercent);

    useEffect(() => {
        console.log('Percent Count:', percentCount);
    }, [percentCount]);

    return (
        <>
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>

                {layout === LAYOUT_CONST.VERTICAL_LAYOUT || (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd) ? (
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            overflow: 'hidden',
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                            color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                                color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
                            }
                        }}
                        onClick={() => dispatch(openDrawer(!drawerOpen))}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="20px" />
                    </Avatar>
                ) : null}
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />
            <Grid item></Grid>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
                <TextField
                    id="state-select"
                    select
                    value={selectedState}
                    onChange={handleStateChange}
                    label="Select State"
                >
                    <MenuItem value="" disabled>Select State</MenuItem>
                    {states.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="lga-select"
                    select
                    value={selectedLga}
                    onChange={handleLgaChange}
                    label="Select LGA"
                    disabled={!selectedState}
                >
                    <MenuItem value="" disabled>Select LGA</MenuItem>
                    {lgas.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                {/* <Box sx={{ width: '300px' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateRangePicker
                            localeText={{ start: 'Start Date', end: 'End Date' }}
                            value={dateRange}
                            onChange={handleDateRangeChange}
                        />
                    </LocalizationProvider>
                </Box> */}
            </Box>

            <NotificationSection />
            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                <FullScreenSection />
            </Box>
            <Box sx={{ display: { xs: 'block' } }}>
                <FloatingCart />
            </Box>
            <ProfileSection />
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
        </>
    );
};

export default Header;