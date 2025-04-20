// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Button, Box, Typography, Grid, Stack, ButtonBase} from '@mui/material';

// third party
import { useTimer } from 'react-timer-hook';

// project imports

// assets
import AppImage from 'assets/images/landing/ab 1.png';
import Icon from 'assets/images/Logo-green-and-grey.svg';

import Facebook from 'assets/images/icons/socials/Facebook.png';
import Instagram from 'assets/images/icons/socials/Instagram.png';
import Twitter from 'assets/images/icons/socials/TwitterX.png';
import TikTok from 'assets/images/icons/socials/TikTok.png';

// styles
const ComingSoonCard = styled('div')({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    overflow: 'hidden',
    backgroundColor: '#f0fff4'
});

// Add keyframes for animations
const circleAnimations = {
    circle1: `@keyframes moveCircle1 {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(15px, 15px) scale(1.05); }
        100% { transform: translate(0, 0) scale(1); }
    }`,
    circle2: `@keyframes scaleCircle2 {
        0% { transform: translate(-30%, -50%) scale(1); }
        50% { transform: translate(-30%, -50%) scale(1.1); }
        100% { transform: translate(-30%, -50%) scale(1); }
    }`,
    circle3: `@keyframes moveCircle3 {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-10px, -10px) scale(1.05); }
        100% { transform: translate(0, 0) scale(1); }
    }`,
};

const Circle = styled('div')(({ color, position, zIndex, animation }) => ({
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: color,
    width: '700px',
    height: '700px',
    ...position,
    zIndex: zIndex,
    animation: `${animation} 15s ease-in-out infinite`,
}));

// background animation


// Content Wrapper
const ContentWrapper = styled(Box)({
    position: 'relative',
    zIndex: 4,
    textAlign: 'center',
    padding: '4rem 2rem',
    borderRadius: '8px', // optional: rounded corners
});

// Image Styles
const ImageWrapper = styled('img')({
    width: '581px',
    height: '400px',
    
});


const TimerWrapper = styled('div')(({theme}) => ({
    maxWidth: 500,
    margin: '2rem auto',
    textAlign: 'center',
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
    color: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.secondary.main,
    borderRadius: '12px',
    padding: '8px 10px',
    border: '1px solid #5A5A5A99'
}));


const TimeBlock = styled('div')(({ theme }) => ({
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
    color: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.secondary.main,
    borderRadius: '12px',
    padding: '12px 16px',
    textAlign: 'center',
    fontWeight: 700,
    fontSize: '2.5rem',
    width: '100px',
}));

const Label = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.text.secondary,
    fontSize: '1rem',
    marginTop: '0.5rem'
}));

const Footer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    textAlign: 'right',
    padding: '10px 20px',
    backgroundColor: 'transparent',
    zIndex: 1, 
}));

const FooterLine = styled('div')(({ theme }) => ({
    width: '100%',
    height: '1px',
    backgroundColor: '#0000004D', 
    marginBottom: '10px',
}));


// Social media links and icons array
const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com' },
    { name: 'Twitter', icon: Twitter, url: 'https://www.twitter.com' },
    { name: 'TikTok', icon: TikTok, url: 'https://www.tiktok.com' }
];


// ===========================|| COMING SOON 2 ||=========================== // 

const ComingSoon2 = () => {
    const time = new Date('2024-10-01T11:59:59');
    time.setSeconds(time.getSeconds() + 3600 * 24 * 2 - 3600 * 15.5);

    const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp: time });

    return (
        <ComingSoonCard>
            <style>
                {circleAnimations.circle1}
                {circleAnimations.circle2}
                {circleAnimations.circle3}
            </style>
            {/* Circles */}
            <Circle color="#E7FFE0" position={{ top: '-145px', left: '-131px' }} zIndex={3} animation="moveCircle1" />
            <Circle color="white" position={{ top: '50%', left: '40%', transform: 'translate(-30%, -50%)'}}  zIndex={2} animation="scaleCircle2" />
            <Circle color="#E7FFE0" position={{ bottom: '-120px', right: '-120px' }} zIndex={1} animation="moveCircle3" />

            {/* Contents */}
            <ContentWrapper>
                <Grid container spacing={4}>
                    {/* Left column larger */}
                    <Grid item xs={12} md={6}> 
                            <ImageWrapper src={AppImage} alt="Description of the image" />                            
                            <Box>
                                <Typography variant="h5" sx={{ marginBottom: '0.8rem', fontWeight:'bold', color: '#000000CC' }}>
                                        Countdown to Launch
                                    </Typography>
                                <TimerWrapper>
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item>
                                            <TimeBlock>{days}</TimeBlock>
                                            <Label>Days</Label>
                                        </Grid>
                                        <Grid item>
                                            <TimeBlock>{hours}</TimeBlock>
                                            <Label>Hours</Label>
                                        </Grid>
                                        <Grid item>
                                            <TimeBlock>{minutes}</TimeBlock>
                                            <Label>Minutes</Label>
                                        </Grid>
                                        <Grid item>
                                            <TimeBlock>{seconds}</TimeBlock>
                                            <Label>Seconds</Label>
                                        </Grid>
                                    </Grid>
                                </TimerWrapper>
                            </Box>
                    </Grid>
                    {/* Right column smaller */}
                    <Grid display='flex' flexDirection='column' justifyContent='center' item xs={12} md={6}>
                    <Stack spacing={5} maxWidth='70%'>
                        <Stack spacing={4} textAlign='left' >
                        
                        {/* logo */}
                        <img src={Icon} alt="Description of the icon" style={{ width: '40px', height: '40px' }} />
                       
                        <Typography variant="h1" sx={{ fontWeight: 'bold', color: '#57B053' }}>
                            Citizen X is Launching Soon!
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#000000CC' }}>
                            Empowering Communities, One Report at a Time.
                        </Typography>
                        <Typography variant="body1" sx={{ margin: '1rem 0', color: '#000000CC'  }}>
                            CitizenX is more than just an app—it’s a movement designed to transform how citizens engage with their communities and governments. 
                            With our cutting-edge mobile application and web dashboard, you’ll be able to report local issues, monitor government activities, and 
                            share real-time updates on events that matter to you. 
                            Together, we’ll build a more informed, active, and connected society.
                        </Typography>
                        </Stack>

                        <Stack spacing={2} textAlign='left' >
                            <Typography variant="body1" sx={{color: '#00000099' }}>
                                Empowering Communities, One Report at a Time.
                            </Typography>

                            
                            <Button variant="contained" color="success" size="large" sx={{ mt: 3, color:'white' }}>
                                 Sign Up
                            </Button>
                            

                            <Stack justifyContent='center' alignItems='center' direction='row' spacing={2}>
                                {socialLinks.map((social)=>(
                                    <ButtonBase
                                    key={social.name}
                                    component="a"
                                    href={social.url}
                                    target="_blank"
                                    aria-label={social.name}
                                >
                                    <img src={social.icon} alt={social.name} style={{ width: '30px', height: '30px' }} />
                                </ButtonBase>

                                ))}
                            
                            </Stack>
                        </Stack>

                    </Stack>  
                    </Grid>
                </Grid>
                <Footer>
                    <FooterLine />
                    <Typography variant="body2" sx={{ color: '#0000004D' }}>
                        © 2024 Citizen X. All Rights Reserved.
                    </Typography>
                </Footer>
            </ContentWrapper>

        </ComingSoonCard>
    );
};

export default ComingSoon2;