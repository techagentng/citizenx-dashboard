import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, useMediaQuery, MenuItem, TextField, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/menu';
import { setState, setLga, getGraph } from 'store/slices/graphs';
import { getCategories, getStates, getLGAs } from 'services/reportService';

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
    const [states, setStates] = useState([]); // Full state objects
    const [lgas, setLgas] = useState([]);
    const [selectedState, setSelectedState] = useState('Anambra');
    const [selectedLga, setSelectedLga] = useState('Aguata');
    const [dateRange, setDateRange] = useState([null, null]);
    const [, setValue] = useState('');
    const [, setReportTypes] = useState(['Select type']);
    const selectedReportType = useSelector((state) => state.graphs.reportType);

    useEffect(() => {
        getStates()
            .then((response) => {
                console.log('Raw states response:', response);
                const stateArray = response.states || [];
                const stateOptions = stateArray
                    .filter((state) => state && state !== '') 
                    .map((state) => ({
                        value: state,
                        label: state
                    }));
                setStates(stateOptions);
    
                const defaultState = 'Anambra';
                if (stateOptions.some((s) => s.value === defaultState)) {
                    setSelectedState(defaultState);
                    dispatch(setState(defaultState));
                    getLGAs(defaultState)
                        .then((lgas) => {
                            const lgaOptions = lgas.map((lga) => ({ value: lga, label: lga }));
                            setLgas(lgaOptions);
                            dispatch(setLgasAction(lgaOptions));
                        })
                        .catch((error) => console.error('Error fetching default LGAs:', error));
                }
            })
            .catch((error) => console.error('Failed to fetch states:', error));
    }, [dispatch]);

    const handleStateChange = (event) => {
        const stateName = event.target.value;
        setSelectedState(stateName);
        dispatch(setState(stateName));
    
        getLGAs(stateName) // Fix typo: getLgas -> getLGAs
            .then((lgas) => {
                const lgaOptions = lgas.map((lga) => ({ value: lga, label: lga }));
                setLgas(lgaOptions);
                setSelectedLga('');
                dispatch(setLga(''));
            })
            .catch((error) => {
                console.error(`Error fetching LGAs for ${stateName}:`, error);
                setLgas([]);
                setSelectedLga('');
                dispatch(setLga(''));
            });
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
        dispatch(getGraph(selectedState, selectedLga, startDate?.format('YYYY-MM-DD'), endDate?.format('YYYY-MM-DD'), selectedReportType));
    }, [dispatch, selectedState, selectedReportType, selectedLga, dateRange]);

    useEffect(() => {
        if (selectedState && selectedLga && selectedState !== 'State' && selectedLga !== 'LGA') {
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
            <Grid item></Grid>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
                <TextField id="state-select" select value={selectedState} onChange={handleStateChange} label="Select State">
                    {states.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="lga-select"
                    select
                    value={selectedLga || 'LGA'}
                    onChange={handleLgaChange}
                    label="Select LGA"
                    disabled={!selectedState}
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
                <Box sx={{ width: '300px' }}>
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
