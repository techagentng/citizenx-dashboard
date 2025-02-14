// material-ui
import { useTheme, styled } from '@mui/material/styles';

// Projects imports
import AppBar from 'ui-component/extended/AppBar';
import HeaderSection from './HeaderSection';
import Jumbo from './Jumbo';
import Cards from './Cards';
import AppInfo from './AppInfo';
import Analytics from './Analytics';
import Impact from './Impact';
import LatestBlog from '../publication/home/LatestBlog';
import Trends from './Trends';
import Subscribe from './Subscribe';
import Footer from './Footer';

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




// =============================|| LANDING MAIN ||============================= //

const Landing = () => {
    const theme = useTheme();

    return (
        <>
          {/* 1. header and hero section */}
          <HeaderWrapper id="home">
                <AppBar />
                <HeaderSection />
            </HeaderWrapper>

            {/* 2. Jumbo section */}
            <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'background.default' }}>
                <Jumbo />
            </SectionWrapper>

            {/* 3. Whats the buzz section */}
            <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'background.default' }}>
                <Cards />
            </SectionWrapper>

            {/* 4. Community for change and phone screens section */}
            <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'background.default' }}>
                <AppInfo />
            </SectionWrapper>

            {/* 5. Analytics */}
            <SectionWrapper >
                <Analytics />
            </SectionWrapper>

            {/* 6. Impact Projections */}
            <SectionWrapper>
                <Impact />
            </SectionWrapper>
            
            {/* 7. Publications */}
            <SectionWrapper>
                <LatestBlog />
            </SectionWrapper>

            {/* 8. Trends */}
            <SectionWrapper>
                <Trends />
            </SectionWrapper>

            {/* 9. Trends & Download */}
            <SectionWrapper >
                <Subscribe />
            </SectionWrapper>

            {/* 10. footer section */}
            <SectionWrapper sx={{ paddingTop: 0, paddingBottom: 0}}>
                <Footer />
            </SectionWrapper>
        </>
    );
};

export default Landing;