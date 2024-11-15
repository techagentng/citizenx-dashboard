import React from 'react';
import { styled } from '@mui/material/styles';
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

const FooterContainer = styled('div')(() => ({
    position: 'relative',
    width: '100%',
    padding: '80px 20px',
    backgroundColor: '#C7F7E7',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23c7d3f7' points='957 450 539 900 1396 900'/%3E...")`,
    backgroundSize: 'cover',
    backgroundPosition: 'left',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const FooterFeet = styled('div')({
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
    '@keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 0.8 }
    }
});

const FooterContent = styled(Container)({
    position: 'relative',
    zIndex: 1
});

const FooterLogo = styled('img')({
    height: '60px',
    width: 'auto'
});

const FooterLink = styled(Link)(({ theme }) => ({
    color: theme.palette.text.secondary,
    '&:hover': {
        color: theme.palette.primary.main
    }
}));

const Footer = () => {
    return (
        <>
            <FooterContainer>
                <Overlay />
                <FooterContent>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Grid container spacing={8}>
                                <Grid item xs={12} md={4}>
                                    <Stack spacing={5}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <FooterLogo src={Logo} alt="CitizenX Logo" />
                                            <Typography variant="h2">CitizenX</Typography>
                                        </Stack>
                                        <Typography variant="body2" lineHeight={1.7}>
                                            Citizen X is dedicated to empowering citizens and enhancing community engagement. Join us and be
                                            part of the change!
                                        </Typography>
                                        <Stack direction="row" spacing={2}>
                                            {[
                                                { icon: IconBrandFacebookFilled, label: 'Facebook', href: '#' },
                                                { icon: IconBrandX, label: 'Twitter', href: '#' },
                                                { icon: IconBrandTiktokFilled, label: 'TikTok', href: '#' },
                                                { icon: IconBrandInstagram, label: 'Instagram', href: '#' }
                                            ].map((social, idx) => (
                                                <IconButton
                                                    key={idx}
                                                    size="small"
                                                    component={Link}
                                                    href={social.href}
                                                    aria-label={social.label}
                                                >
                                                    <social.icon />
                                                </IconButton>
                                            ))}
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Grid container spacing={5}>
                                        <Grid item sm={4}>
                                            <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                <FooterLink href="https://www.citizenx.ng/about" target="_blank">
                                                    About Us
                                                </FooterLink>
                                                <FooterLink href="https://www.citizenx.ng/terms" target="_blank">
                                                    Terms & Conditions
                                                </FooterLink>
                                                <FooterLink href="https://www.citizenx.ng/disclaimer" target="_blank">
                                                    Disclaimer
                                                </FooterLink>
                                                <FooterLink href="https://www.citizenx.ng/cookies" target="_blank">
                                                    Cookie Policy
                                                </FooterLink>
                                                <FooterLink href="https://www.citizenx.ng/guidelines" target="_blank">
                                                    Community Guidelines
                                                </FooterLink>
                                            </Stack>
                                        </Grid>
                                        <Grid item sm={4}>
                                            <Stack spacing={3}>
                                                <Typography variant="h3" sx={{ fontWeight: 600 }}>
                                                    Contact Us
                                                </Typography>
                                                <Stack spacing={2}>
                                                    {[
                                                        { icon: IconMapPin, text: '11 Herbert Macaulay Crescent, Lagos' },
                                                        { icon: IconMailbox, text: 'admin@citizenx.ng' },
                                                        { icon: IconPhone, text: '+2347003151358' }
                                                    ].map((contact, idx) => (
                                                        <Stack key={idx} direction="row" spacing={1} alignItems="center">
                                                            <Box>
                                                                <contact.icon size="25px" />
                                                            </Box>
                                                            <Typography variant="body1">{contact.text}</Typography>
                                                        </Stack>
                                                    ))}
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
                <Stack direction="row" spacing={2}>
                    {['Privacy Policy', 'Terms & Conditions'].map((text, idx) => (
                        <FooterLink key={idx} href="#">
                            {text}
                        </FooterLink>
                    ))}
                </Stack>
                <Typography sx={{ color: 'white' }}>&copy; 2024 CitizenX - All rights reserved</Typography>
            </FooterFeet>
        </>
    );
};

export default Footer;
