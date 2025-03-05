// StateLgaDropdown.js
import React, { useState, useEffect } from 'react';
import { TextField, Box, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'store';
import { setState, setLga } from 'store/slices/graphs';
import statesAndLgas from './statesAndLgas.json';

const StateLgaDropdown = () => {
    const dispatch = useDispatch();
    const { state: selectedState, lga: selectedLga } = useSelector((state) => state.graphs);
    const [states, setStates] = useState([]);
    const [lgas, setLgas] = useState([]);

    useEffect(() => {
        const stateNames = statesAndLgas.map((state) => ({ value: state.state, label: state.state }));
        setStates(stateNames);

        const defaultState = selectedState || 'Anambra';
        const stateData = statesAndLgas.find((state) => state.state === defaultState);
        if (stateData) {
            const lgaOptions = stateData.lgas.map((lga) => ({ value: lga, label: lga }));
            setLgas(lgaOptions);
            if (!selectedState) dispatch(setState(defaultState));
            if (!selectedLga) dispatch(setLga('Aguata'));
        }
    }, [dispatch, selectedState, selectedLga]);

    const handleStateChange = (event) => {
        const stateName = event.target.value;
        dispatch(setState(stateName));
        const stateData = statesAndLgas.find((state) => state.state === stateName);
        setLgas(stateData ? stateData.lgas.map((lga) => ({ value: lga, label: lga })) : []);
    };

    const handleLgaChange = (event) => {
        dispatch(setLga(event.target.value));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField select value={selectedState || ''} onChange={handleStateChange} label="Select State" size="small">
                <MenuItem value="" disabled>
                    State
                </MenuItem>
                {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                select
                value={selectedLga || ''}
                onChange={handleLgaChange}
                label="Select LGA"
                disabled={!selectedState}
                size="small"
            >
                <MenuItem value="" disabled>
                    LGA
                </MenuItem>
                {lgas.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
};

export default StateLgaDropdown;
