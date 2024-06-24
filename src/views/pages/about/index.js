import React from 'react'
// material-ui
import { styled } from '@mui/material/styles';

import AppBar from 'ui-component/extended/AppBar';
import HeaderSection from './HeaderSection';
import Focus from './Focus';
import Partners from './Partners';
// import Footer from 'views/pages/landing/Footer';

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

const about = () => {
  return (
    <>
        {/* 1. header and hero section */}
        <HeaderWrapper id="home">
                <AppBar />
                <HeaderSection/>
            </HeaderWrapper>
         {/* 2. card section */}
         <SectionWrapper >
              <Focus/>
            </SectionWrapper>
        {/* 2. card section */}
        <SectionWrapper >
              <Partners/>
        </SectionWrapper>

            {/* 2. card section */}
         {/* <SectionWrapper >
                <Footer/>
            </SectionWrapper> */}
    </>
  )
}

export default about