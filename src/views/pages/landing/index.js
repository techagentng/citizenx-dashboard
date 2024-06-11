// material-ui
import { styled } from '@mui/material/styles';

// Projects imports
import AppBar from 'ui-component/extended/AppBar';
import HeaderSection from './HeaderSection';

// custom stlye
const HeaderWrapper = styled('div')(({ theme }) => ({
    overflowX: 'hidden',
    overflowY: 'clip',
    background:
        theme.palette.mode === 'dark'
            ? theme.palette.background.default
            : `linear-gradient(360deg, ${theme.palette.grey[100]} 1.09%, ${theme.palette.background.paper} 100%)`,
    [theme.breakpoints.down('md')]: {}
}));




// =============================|| LANDING MAIN ||============================= //

const Landing = () => {
    // const theme = useTheme();

    return (
        <>
          {/* 1. header and hero section */}
          <HeaderWrapper id="home">
                <AppBar />
                <HeaderSection />
            </HeaderWrapper>
        </>
    );
};

export default Landing;
