import PropTypes from 'prop-types';
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography, useMediaQuery } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: '#104833',
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            width: 150,
            height: 150,
            top: -65,
            right: -75
        },
        [theme.breakpoints.down('xs')]: {
            width: 120,
            height: 120,
            top: -55,
            right: -65
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background:
            theme.palette.mode === 'dark'
                ? `linear-gradient(140.9deg, ${theme.palette.secondary.dark} -14.02%, rgba(144, 202, 249, 0) 85.50%)`
                : theme.palette.secondary[800] || '#1976d2', // Fallback color
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            width: 150,
            height: 150,
            top: -85,
            right: -10
        },
        [theme.breakpoints.down('xs')]: {
            width: 120,
            height: 120,
            top: -75,
            right: -5
        }
    }
}));

const EarningCard = ({ count, details, isLoading }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isExtraSmall = useMediaQuery(theme.breakpoints.down('xs'));

    const getFontSize = () => {
        if (isExtraSmall) return '1.5rem';
        if (isMobile) return '1.75rem';
        return '2.125rem';
    };

    const getDetailsFontSize = () => {
        if (isExtraSmall) return '0.875rem';
        if (isMobile) return '0.925rem';
        return '1rem';
    };

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false}>
                    <Box
                        sx={{
                            p: isMobile ? 1 : 1.25,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        <Grid container direction="column" spacing={isMobile ? 1 : 2}>
                            <Grid item>
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item>
                                        <Typography
                                            sx={{
                                                fontSize: getFontSize(),
                                                fontWeight: 500,
                                                mr: 1,
                                                mt: isMobile ? 1 : 1.75,
                                                mb: isMobile ? 0.5 : 0.75
                                            }}
                                        >
                                            {count}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            sx={{
                                                cursor: 'pointer',
                                                width: isMobile ? 24 : 32,
                                                height: isMobile ? 24 : 32,
                                                backgroundColor: theme.palette.secondary[200] || '#e0e0e0', // Fallback color
                                                color: theme.palette.secondary.dark || '#000' // Fallback color
                                            }}
                                        >
                                            <ArrowUpwardIcon
                                                fontSize={isMobile ? 'small' : 'inherit'}
                                                sx={{ transform: 'rotate(45deg)' }}
                                            />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: isMobile ? 0.75 : 1.25 }}>
                                <Typography
                                    sx={{
                                        fontSize: getDetailsFontSize(),
                                        fontWeight: 500,
                                        color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.secondary[200] || '#e0e0e0', // Fallback color
                                        lineHeight: 1.3
                                    }}
                                >
                                    {details}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool,
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    details: PropTypes.string.isRequired
};

export default EarningCard;