import React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Box, Container, Grid, IconButton, Link, Stack, Typography } from '@mui/material';
import {
    IconBrandFacebookFilled,
    IconBrandX,
    IconBrandTiktokFilled,
    IconBrandInstagram,
    IconMapPin,
    IconMailbox,
    IconPhone
} from '@tabler/icons-react';

import Logo from 'assets/images/landing/citizenX-logo.png';

const fadeIn = `
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 0.8; }
  }
`;

const FooterContainer = styled('div')({
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: '80px 20px',
    backgroundColor: '#C7F7E7',
    backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23c7d3f7' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%230a4833' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%2393b8d8' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%230c5a40' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23629cb3' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%230f6d4d' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23378189' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%2311805b' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%2317645e' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23149469' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%230a4833' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%2317a877' points='943 900 1210 900 971 687'/%3E%3C/svg%3E\")",
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'left',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const FooterFeet = styled('div')({
    bottom: 0,
    width: '100%',
    padding: '20px 40px',
    backgroundColor: '#0A4833',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
});

const Overlay = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#17A877',
    opacity: 0.8,
    animation: 'fadeIn 2s ease-in-out',
    zIndex: 0,
    ...fadeIn
});

const FooterContent = styled(Container)({
    position: 'relative',
    zIndex: 1
});

const FooterLogo = styled('img')({
    height: '60px',
    width: 'auto'
});

// Link - custom style
const FooterLink = styled(Link)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.text.hint,
    '&:hover': {
        color: theme.palette.primary.main
    },
    '&:active': {
        color: theme.palette.primary.main
    }
}));

const Footer = () => {
    const theme = useTheme();
    const ContactSX = {
        color: 'white',
        '&hover': {
            color: theme.palette.primary.main
        }
    };
    const textColor = theme.palette.mode === 'dark' ? 'text.secondary' : 'text.hint';
    return (
        <>
            <FooterContainer>
                <Overlay />
                <FooterContent>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Grid container spacing={8}>
                                <Grid item xs={12} md={4}>
                                    <Stack spacing={{ xs: 2, md: 5 }}>
                                        <Stack
                                            sx={{
                                                alignItems: 'center'
                                            }}
                                            direction="row"
                                            spacing={1}
                                        >
                                            <FooterLogo src={Logo} />
                                            <Typography variant="h2" align="center">
                                                CitizenX
                                            </Typography>
                                        </Stack>
                                        <Typography variant="body2" color={textColor} lineHeight={1.7}>
                                            Citizen X is dedicated to empowering citizens and enhancing community engagement. We
                                            continuously evolve by adding new features and innovative ways to amplify your voice. With
                                            Citizen X, no one is a spectator; every user is an active participant in shaping your local
                                            communitys future. Join us and be part of the change!
                                        </Typography>
                                        {/* Social Icons */}
                                        <Stack direction="row" alignItems="center" spacing={{ xs: 3, sm: 1.5, md: 2 }}>
                                            <IconButton size="small" component={Link} href="#" target="_blank" aria-label="facebook">
                                                <IconBrandFacebookFilled
                                                    sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                                                />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                component={Link}
                                                href="#"
                                                target="_blank"
                                                aria-label="twitter"
                                            >
                                                <IconBrandX sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }} />
                                            </IconButton>
                                            <IconButton size="small" component={Link} href="#" target="_blank" aria-label="tiktok">
                                                <IconBrandTiktokFilled
                                                    sx={{ color: 'text.secondary', '&:hover': { color: 'warning.main' } }}
                                                />
                                            </IconButton>
                                            <IconButton size="small" component={Link} href="#" target="_blank" aria-label="instagram">
                                                <IconBrandInstagram
                                                    sx={{ color: 'text.secondary', '&:hover': { color: 'warning.main' } }}
                                                />
                                            </IconButton>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Grid container spacing={{ xs: 5, md: 2 }} sx={{ mt: { xs: '0px', sm: '5px' } }}>
                                        <Grid item sm={4} xs={6}>
                                            <Stack spacing={{ xs: 3, md: 5 }}>
                                                <Typography variant="h3" color={textColor} sx={{ fontWeight: 600 }}>
                                                    Quick Links
                                                </Typography>
                                                <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                    <FooterLink href="/about" target="_blank" underline="none">
                                                        About Us
                                                    </FooterLink>
                                                    <FooterLink href="#" target="_blank" underline="none">
                                                        Download App
                                                    </FooterLink>
                                                    <FooterLink href="/dashboard" target="_blank" underline="none">
                                                        Dashboard
                                                    </FooterLink>
                                                    <FooterLink href="/publication" target="_blank" underline="none">
                                                        Publications
                                                    </FooterLink>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={6} sm={4}>
                                            <Stack spacing={{ xs: 3, md: 5 }}>
                                                {/* Title */}
                                                <Typography variant="h3" color={textColor} sx={{ fontWeight: 600 }}>
                                                    Contact Us
                                                </Typography>

                                                {/* Contact Boxes */}
                                                <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                    <Stack spacing={1} display="flex" alignItems="flex-start" direction="row">
                                                        <Box display="flex" alignItems="flex-start">
                                                            <IconMapPin size="25px" color="white" />
                                                        </Box>
                                                        <Typography variant="body1" sx={ContactSX}>
                                                            11 Herbert Macaulay Crescent GRA Ikeja, Lagos. Nigeria
                                                        </Typography>
                                                    </Stack>
                                                    <Stack spacing={1} display="flex" alignItems="flex-start" direction="row">
                                                        <Box display="flex" alignItems="center">
                                                            <IconMailbox size="25px" color="white" />
                                                        </Box>
                                                        <Typography variant="body1" sx={ContactSX} paddingTop={1}>
                                                            admin@citizenx.ng
                                                        </Typography>
                                                    </Stack>
                                                    <Stack spacing={1} display="flex" alignItems="flex-start" direction="row">
                                                        <Box display="flex" alignItems="center">
                                                            <IconPhone size="25px" color="white" />
                                                        </Box>
                                                        <Typography variant="body1" sx={ContactSX} paddingTop={1}>
                                                            +2347003151358
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </FooterContent>
            </FooterContainer>
            <FooterFeet>
                <Stack spacing={2} direction="row">
                    <Link
                        href="#"
                        target="_blank"
                        underline="hover"
                        sx={{ color: theme.palette.success.main, fontSize: '0.85rem', '&hover': { color: 'white' } }}
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        underline="hover"
                        sx={{ color: theme.palette.success.main, fontSize: '0.85rem', '&hover': { color: 'white' } }}
                    >
                        Terms & Conditions
                    </Link>
                </Stack>
                <Typography variant="span" align="center" sx={{ color: 'white', fontSize: '0.85rem', '&hover': { color: 'success' } }}>
                    © 2024 CitizenX - all rights reserved
                </Typography>
            </FooterFeet>
        </>
    );
};

export default Footer;
