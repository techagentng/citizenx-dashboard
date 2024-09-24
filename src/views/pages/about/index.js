import React from 'react'
// material-ui
import { styled, useTheme } from '@mui/material/styles';

import AppBar from 'ui-component/extended/AppBar';
import HeaderSection from './HeaderSection';
import Focus from './Focus';
import Partners from './Partner';
import FAQ from './FAQ';
import Jumbo from './Jumbo';
import Trends from '../landing/Trends';
import Footer from 'views/pages/landing/Footer';

// custom stlye
const HeaderWrapper = styled('div')(({ theme }) => ({
    overflowX: 'hidden',
    overflowY: 'clip',
    background:
        theme.palette.mode === 'dark'
            ? theme.palette.background.default
            : `linear-gradient(360deg, #c7f7e7 1.09%, ${theme.palette.background.paper} 100%)`,
    [theme.breakpoints.down('md')]: {}
}));

const SectionWrapper = styled('div')({
    paddingTop: 100,
    paddingBottom: 100
});

const about = () => {
    const theme = useTheme()
  return (
    <>
        {/* 1. header and hero section */}
        <HeaderWrapper id="home">
            <AppBar />
            <HeaderSection/>
        </HeaderWrapper>

        {/* 2. Focus Section */}
        <SectionWrapper >
              <Focus/>
        </SectionWrapper>

        {/* 3. Partners section */}
        <SectionWrapper sx={{background: theme.palette.grey[100]}} >
              <Partners/>
        </SectionWrapper>

        {/* 6. Jumbo section */}
        <SectionWrapper >
              <Jumbo/>
        </SectionWrapper>

        {/* 7. FAQ section */}
        <SectionWrapper >
              <FAQ/>
        </SectionWrapper>

        {/* 8. Trends section */}
        <SectionWrapper >
              <Trends/>
        </SectionWrapper>
         

            {/* 9. card section */}
         <SectionWrapper sx={{ paddingTop: 0, paddingBottom: 0}}>
            <Footer/>
        </SectionWrapper>
    </>
  )
}

export default about