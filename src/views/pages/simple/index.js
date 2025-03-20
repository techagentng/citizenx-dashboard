import React from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Button variant="contained" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
            </Button>
        </Box>
    );
};

export default HomePage;
