import PropTypes from 'prop-types';
import { cloneElement, useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    AppBar as MuiAppBar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    Link,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
    useScrollTrigger
} from '@mui/material';

// project imports
import Logo from 'ui-component/Logo';

// assets
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

// elevation scroll
function ElevationScroll({ children, window }) {
    const theme = useTheme();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window
    });

    return cloneElement(children, {
        elevation: trigger ? 1 : 0,
        style: {
            backgroundColor: theme.palette.mode === 'dark' && trigger ? theme.palette.dark[800] : theme.palette.background.default,
            color: theme.palette.text.dark
        }
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.node,
    window: PropTypes.object
};

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const AppBar = ({ ...others }) => {
    const [drawerToggle, setDrawerToggle] = useState(false);

    const drawerToggler = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerToggle(open);
    };

    return (
        <ElevationScroll {...others}>
            <MuiAppBar>
                <Container>
                    <Toolbar sx={{ py: 2.5, px: `0 !important` }}>
                        <Typography component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                            <Logo />
                        </Typography>
                        <Stack direction="row" sx={{ display: { xs: 'none', sm: 'block' } }} spacing={{ xs: 1.5, md: 2.5 }}>
                            <Button color="inherit" component={Link} href="/about" target="_blank">
                                About
                            </Button>
                            <Button color="inherit" component={Link} href="/publication" target="_blank">
                                Publications
                            </Button>
                            <Button color="inherit" component={RouterLink} to="/login" target="_blank">
                                Dashboard
                            </Button>
                            <Button color="inherit" component={Link} href="#" target="_blank">
                                Download App
                            </Button>
                            <Button component={RouterLink} to="/login" disableElevation variant="outlined" color="secondary">
                                Sign In
                            </Button>
                        </Stack>
                        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <IconButton color="inherit" onClick={drawerToggler(true)} size="large">
                                <MenuIcon />
                            </IconButton>
                            <Drawer anchor="top" open={drawerToggle} onClose={drawerToggler(false)}>
                                {drawerToggle && (
                                    <Box
                                        sx={{ width: 'auto' }}
                                        role="presentation"
                                        onClick={drawerToggler(false)}
                                        onKeyDown={drawerToggler(false)}
                                    >
                                        <List>
                                            <Link style={{ textDecoration: 'none' }} to="/" target="_blank">
                                                <ListItemButton component="a">
                                                    {/* <ListItemIcon>
                                                        <IconHome2 />
                                                    </ListItemIcon> */}
                                                    <ListItemText primary="Home" />
                                                </ListItemButton>
                                            </Link>
                                            <Link style={{ textDecoration: 'none' }} to="/about" target="_blank">
                                                <ListItemButton component="a">
                                                    {/* <ListItemIcon>
                                                        <IconHome2 />
                                                    </ListItemIcon> */}
                                                    <ListItemText primary="About Us" />
                                                </ListItemButton>
                                            </Link>
                                            <Link style={{ textDecoration: 'none' }} href="/login" target="_blank">
                                                <ListItemButton component="a">
                                                    {/* <ListItemIcon>
                                                        <IconDashboard />
                                                    </ListItemIcon> */}
                                                    <ListItemText primary="Dashboard" />
                                                </ListItemButton>
                                            </Link>
                                            <Link style={{ textDecoration: 'none' }} href="/publication" target="_blank">
                                                <ListItemButton component="a">
                                                    {/* <ListItemIcon>
                                                        <IconDashboard />
                                                    </ListItemIcon> */}
                                                    <ListItemText primary="Publications" />
                                                </ListItemButton>
                                            </Link>
                                            {/* Button */}
                                            <Link style={{ textDecoration: 'none' }} href="#" target="_blank">
                                                <ListItemButton component="a">
                                                    <ListItemIcon>
                                                        <PersonIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Sign In" />
                                                </ListItemButton>
                                            </Link>
                                        </List>
                                    </Box>
                                )}
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </MuiAppBar>
        </ElevationScroll>
    );
};

export default AppBar;
