import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Badge, Box } from '@mui/material';
import coinimg from './coin.png';
import { getAllRewardCount } from 'services/rewardService'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { setTotalQuantity } from 'store/slices/reward'; 

const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {}
}));

const FloatingCart = () => {
    const dispatch = useDispatch();
    const totalQuantity = useSelector((state) => state.reward.totalQuantity); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the reward count on component mount
        const serviceToken = localStorage.getItem('serviceToken');
        
        // Only fetch if user has a token (is authenticated)
        if (serviceToken) {
            getAllRewardCount()
                .then((count) => {
                    console.log('Reward count:', count); 
                    dispatch(setTotalQuantity(count)); 
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error fetching reward count:', err);
                    setError(err.message); 
                    setLoading(false);
                });
        } else {
            // No token found, user is not authenticated
            setLoading(false);
            dispatch(setTotalQuantity(0)); 
        }
    }, [dispatch]); 

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading rewards count: {error}</p>;
    }

    return (
        <Box sx={{ mr: 2, ml: 2 }}>
            <StyledBadge showZero badgeContent={totalQuantity} color="error">
                <img src={coinimg} alt="coin" style={{ width: 24, height: 24 }} />
            </StyledBadge>
        </Box>
    );
};

export default FloatingCart;
