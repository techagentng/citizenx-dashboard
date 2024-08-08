import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Badge, Box } from '@mui/material';
import coinimg from './coin.png';
import { getRewardBalance } from 'services/rewardService'; 

const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {}
}));

const FloatingCart = () => {
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the reward count on component mount
        getRewardBalance()
            .then((count) => {
                console.log('Reward count:', count); // Add this line to debug
                setTotalQuantity(count);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching reward count:', err);
                setError(err.message); // Update to display error message
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading rewards count: {error}</p>; // Display error message
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
