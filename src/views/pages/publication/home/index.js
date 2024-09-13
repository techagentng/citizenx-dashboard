import { styled } from '@mui/material/styles';
import AppBar from 'ui-component/extended/AppBar';
import Footer from 'views/pages/landing/Footer';

// Components
import HeaderSection from '../components/HeaderSection';

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
  
  const SectionWrapper = styled('div')({
    paddingTop: 100,
    paddingBottom: 100
  });

  const Home = () => {

    return (
        <>
            {/* 1. header and hero section */}
            <HeaderWrapper id="home">
                  <AppBar />
                  <HeaderSection/>
              </HeaderWrapper>
  
              
              {/* 10. footer section */}
              <SectionWrapper sx={{ paddingTop: 0, paddingBottom: 0}}>
                  <Footer />
              </SectionWrapper>
        </>
    );
  };
  
  export default Home;