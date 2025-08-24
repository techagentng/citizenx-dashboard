import React, { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, useMediaQuery, MenuItem, TextField, Grid } from '@mui/material';
// import KDateFilter from './KDateFilter';
// import { LocalizationProvider, DateRangePicker } from '@mui/x-date-pickers-pro';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from 'store/slices/menu';
import { setState, setLga } from 'store/slices/graphs';
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
    const { lgaState: { state, lga } } = useSelector((state) => state.graphs);
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const { layout } = useConfig();
    const [, setReportTypes] = React.useState(['Select type']);

    // React Query: Fetch all states
    const { data: states = [] } = useQuery({
        queryKey: ['states'],
        queryFn: () => statesAndLgas.NigeriaStates.map((state) => ({
            value: state.value,
            label: state.label
        }))
    });

    // React Query: Fetch LGAs for selected state
    const { data: lgas = [] } = useQuery({
        queryKey: ['lgas', state],
        queryFn: () => {
            const lgasArr = statesAndLgas.LocalGovernment[state] || [];
            return lgasArr.map((lga) => ({ value: lga, label: lga }));
        },
        enabled: !!state
    });

    // Set default LGA when state or lgas change
    useEffect(() => {
        if (lgas.length > 0 && !lga) {
            dispatch(setLga(lgas[0].value));
        }
    }, [state, lgas, lga, dispatch]);

    const handleStateChange = (event) => {
        const newState = event.target.value;
        dispatch(setState(newState));
        dispatch(setLga('')); // Reset LGA when state changes
    };

    const handleLgaChange = (event) => {
        const lgaName = event.target.value;
        dispatch(setLga(lgaName));
    };

    // const handleDateRangeChange = (newValue) => {
    //     setDateRange(newValue);
    // };

    const handleSearch = useCallback(() => {
        // Search functionality is now handled by the dashboard component
        // through Redux state updates
    }, []);

    useEffect(() => {
        if (state && lga && state !== 'State' && lga !== 'LGA') {
            handleSearch();
        }
    }, [state, lga, handleSearch]);

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
            {/* Responsive controls for state, LGA, and date filter */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'stretch', sm: 'center' },
                    gap: 2,
                    width: { xs: '100%', sm: 'auto' },
                    mt: { xs: 2, sm: 0 },
                    mb: { xs: 2, sm: 0 }
                }}
            >
                <TextField
                    id="state-select"
                    select
                    fullWidth
                    size="small"
                    value={state || 'Anambra'}
                    onChange={handleStateChange}
                    label="Select State"
                    sx={{ minWidth: 120 }}
                >
                    {states.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="lga-select"
                    select
                    fullWidth
                    size="small"
                    value={lga || 'Aguata'}
                    onChange={handleLgaChange}
                    label="Select LGA"
                    disabled={!state}
                    sx={{ minWidth: 120 }}
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