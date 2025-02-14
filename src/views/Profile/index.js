import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Tab, Tabs } from '@mui/material';

// project imports
import Profile from './Profile';
import Billing from './Billing';
import Security from './Security';
import Notifications from './Notifications';
import MainCard from 'ui-component/cards/MainCard';

// tabs
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// ==============================|| PROFILE 3 ||============================== //

const Profile3 = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [rewardBalance, setRewardBalance] = useState(0);

    useEffect(() => {
        const fetchRewardBalance = async () => {
            try {
                const response = await getRewardBalance(); // Assuming the response contains the balance
                setRewardBalance(response.total_balance); // Update the balance
            } catch (error) {
                console.error('Error fetching reward balance:', error);
            }
        };

        fetchRewardBalance(); // Fetch the reward balance when the component mounts
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard title="Account">
            <div>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    onChange={handleChange}
                    sx={{
                        mb: 3,
                        minHeight: 'auto',
                        '& button': {
                            minWidth: 100
                        },
                        '& a': {
                            minHeight: 'auto',
                            minWidth: 10,
                            py: 1.5,
                            px: 1,
                            mr: 2.25,
                            color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900'
                        },
                        '& a.Mui-selected': {
                            color: 'primary.main'
                        }
                    }}
                    aria-label="simple tabs example"
                    variant="scrollable"
                >
                    <Tab component={Link} to="#" label="Profile" {...a11yProps(0)} />
                    <Tab component={Link} to="#" label="Billing" {...a11yProps(1)} />
                    <Tab component={Link} to="#" label="Security" {...a11yProps(2)} />
                    <Tab component={Link} to="#" label="Notifications" {...a11yProps(3)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Profile rewardBalance={rewardBalance} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Billing />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Security />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Notifications />
                </TabPanel>
            </div>
        </MainCard>
    );
};

export default Profile3;
