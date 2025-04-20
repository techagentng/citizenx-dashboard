import PropTypes from 'prop-types';
import { cloneElement, useState } from 'react';
import { Link } from 'react-router-dom'; // Use react-router-dom for internal routing
import { useTheme } from '@mui/material/styles';
import {
    AppBar as MuiAppBar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Stack,
    Toolbar,
    Typography,
    useScrollTrigger
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import Logo from 'ui-component/Logo';

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
                            <Button color="inherit" component={Link} to="/about">
                                About
                            </Button>
                            <Button color="inherit" component={Link} to="/publication">
                                Publications
                            </Button>
                            <Button color="inherit" component={Link} to="/dashboard">
                                Dashboard
                            </Button>
                            <Button
                                color="inherit"
                                component="a"
                                href="https://expo.dev/artifacts/eas/4e14uvcDzVrzVqe1NsfTMR.apk"
                                target="_blank"
                            >
                                Download App
                            </Button>
                            <Button component={Link} to="/login" disableElevation variant="outlined" color="secondary">
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
                                            <ListItemButton component={Link} to="/">
                                                <ListItemText primary="Home" />
                                            </ListItemButton>
                                            <ListItemButton component={Link} to="/about">
                                                <ListItemText primary="About Us" />
                                            </ListItemButton>
                                            <ListItemButton component={Link} to="/dashboard">
                                                <ListItemText primary="Dashboard" />
                                            </ListItemButton>
                                            <ListItemButton component={Link} to="/publication">
                                                <ListItemText primary="Publications" />
                                            </ListItemButton>
                                            <ListItemButton component={Link} to="/login">
                                                <ListItemIcon>
                                                    <PersonIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Sign In" />
                                            </ListItemButton>
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
