import { styled } from '@mui/material/styles';
import AppBar from 'ui-component/extended/AppBar';
import Footer from 'views/pages/landing/Footer';

// Components
import HeaderSection from '../components/HeaderSection';
import LatestBlog from './LatestBlog';
import Documents from './Documents';
import Infographics from './Infographics';

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

              {/* 2. Featured publications */}
            <SectionWrapper>
                <LatestBlog />
            </SectionWrapper>

            {/* 2. Featured publications */}
            <SectionWrapper>
                <Documents />
            </SectionWrapper>

            {/* 2. Featured publications */}
            <SectionWrapper>
                <Infographics />
            </SectionWrapper>
              
              {/* 10. footer section */}
              <SectionWrapper sx={{ paddingTop: 0, paddingBottom: 0}}>
                  <Footer />
              </SectionWrapper>
        </>
    );
  };
  
  export default Home;