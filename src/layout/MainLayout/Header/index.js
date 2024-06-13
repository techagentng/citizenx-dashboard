// material-ui
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, useMediaQuery, MenuItem, TextField } from '@mui/material';
// project imports
import LAYOUT_CONST from 'constant';
import useConfig from 'hooks/useConfig';
import LogoSection from '../LogoSection';
// import SearchSection from './SearchSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import FullScreenSection from './FullScreenSection';
// import LocalizationSection from './LocalizationSection';
// import MegaMenuSection from './MegaMenuSection';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import NotificationSection from './NotificationSection';

import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/menu';
import statesAndLgas from './statesAndLgas.json';
// assets
import { IconMenu2 } from '@tabler/icons-react';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
    const theme = useTheme();

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const { layout } = useConfig();
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('State');
    const [lgas, setLgas] = useState([]);
    const [selectedLga, setSelectedLga] = useState('LGA');

    useEffect(() => {
        // Load the state data from JSON
        const stateNames = statesAndLgas.map(state => ({ value: state.state, label: state.state }));
        setStates(stateNames);
    }, []);

    const handleStateChange = (event) => {
        const stateName = event.target.value;
        setSelectedState(stateName);
    
        // Find the selected state in the JSON data and update the LGA list
        const stateData = statesAndLgas.find(state => state.state === stateName);
        if (stateData) {
            const lgaOptions = stateData.lgas.map(lga => ({ value: lga, label: lga }));
            setLgas(lgaOptions);
        } else {
            setLgas([]);
        }
    };

    const handleLgaChange = (event) => {
        setSelectedLga(event.target.value);
    };

    return (
        <>
            {/* logo & toggler button */}
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

            {/* header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* mega-menu */}
            {/* <Box sx={{ display: { xs: 'none', sm: 'block' }, mr:3 }}>
                <MegaMenuSection />
            </Box> */}

            {/* live customization & localization */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
                <TextField
                    id="standard-select-currency-1"
                    select
                    value={selectedState}
                    onChange={handleStateChange}
                    label="Select State"
                >
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
                    disabled={!selectedState || selectedState === 'State'} // Disable if no state is selected
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
                        <DateRangePicker localeText={{ start: 'Start Date', end: 'End Date' }} />
                    </LocalizationProvider>
                </Box>
            </Box>

            {/* notification */}
            <NotificationSection />

            {/* full screen toggler */}
            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                <FullScreenSection />
            </Box>

            {/* profile */}
            <ProfileSection />

            {/* mobile header */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
        </>
    );
};

export default Header;
