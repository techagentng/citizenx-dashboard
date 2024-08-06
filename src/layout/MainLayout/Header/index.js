import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, useMediaQuery, MenuItem, TextField, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/menu';
import { setState, setLga, setReportType, getGraph, getPercentCount } from 'store/slices/graphs';
import statesAndLgas from './statesAndLgas.json';
import { getCategories } from 'services/reportService';

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
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const { layout } = useConfig();
    const [states, setStates] = useState([]);
    const [lgas, setLgas] = useState([]);
    const [selectedState, setSelectedState] = useState('Anambra');
    const [selectedLga, setSelectedLga] = useState('Aguata');
    const [dateRange, setDateRange] = useState([null, null]);
    const [value, setValue] = useState('');
    const [reportTypes, setReportTypes] = useState(['Select type']);

    useEffect(() => {
        const stateNames = statesAndLgas.map((state) => ({ value: state.state, label: state.state }));
        setStates(stateNames);
    }, []);

    const handleStateChange = (event) => {
        const stateName = event.target.value;
        setSelectedState(stateName);
        dispatch(setState(stateName));

        const stateData = statesAndLgas.find((state) => state.state === stateName);
        if (stateData) {
            const lgaOptions = stateData.lgas.map((lga) => ({ value: lga, label: lga }));
            setLgas(lgaOptions);
        } else {
            setLgas([]);
        }
    };

    const handleLgaChange = (event) => {
        const lgaName = event.target.value;
        setSelectedLga(lgaName);
        dispatch(setLga(lgaName));
    };

    const handleDateRangeChange = (newValue) => {
        setDateRange(newValue);
    };

    const handleSearch = useCallback(() => {
        const [startDate, endDate] = dateRange;
        dispatch(getGraph(selectedState, selectedLga, startDate?.format('YYYY-MM-DD'), endDate?.format('YYYY-MM-DD'), reportTypes));
    }, [dispatch, selectedState, selectedLga, dateRange, reportTypes]);

    useEffect(() => {
        if (selectedState !== 'State' && selectedLga !== 'LGA') {
            handleSearch();
        }
    }, [selectedState, selectedLga, dateRange, handleSearch]);

    useEffect(() => {
        getCategories()
            .then((types) => {
                const reportTypeOptions = ['Select Report Type', ...types];
                setReportTypes(reportTypeOptions);
                setValue(reportTypeOptions[0]);
            })
            .catch((error) => {
                console.error('Failed to fetch categories:', error);
            });
    }, []);

    const handleReportTypeChange = (event) => {
        const reportType = event.target.value;
        setValue(reportType);
        console.log('Selected Report Type:', reportType);
        dispatch(setReportType(reportType));
        dispatch(getPercentCount(reportType, selectedState));
    };

    const percentCount = useSelector((state) => state.graphs.percentCount);

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
            <Grid item>
                <TextField id="standard-select-currency" select value={value} onChange={handleReportTypeChange}>
                    <MenuItem value=""></MenuItem>
                    {reportTypes.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
                <TextField id="standard-select-currency-1" select value={selectedState} onChange={handleStateChange} label="Select State">
                    <MenuItem value="State" disabled>
                        State
                    </MenuItem>
                    {states.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="standard-select-currency-2"
                    select
                    value={selectedLga}
                    onChange={handleLgaChange}
                    label="Select LGA"
                    disabled={!selectedState || selectedState === 'State'}
                >
                    <MenuItem value="LGA" disabled>
                        LGA
                    </MenuItem>
                    {lgas.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateRangePicker
                            localeText={{ start: 'Start Date', end: 'End Date' }}
                            value={dateRange}
                            onChange={handleDateRangeChange}
                        />
                    </LocalizationProvider>
                </Box>
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
