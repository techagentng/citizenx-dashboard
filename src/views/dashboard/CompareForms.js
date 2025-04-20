import React, { useState, useEffect, useCallback } from 'react';
import { Button, Grid, Stack, TextField, Typography, IconButton } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Autocomplete, Box, InputAdornment, Paper } from '@mui/material';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CompareBarChart from './compareBarChart';
import DeleteIcon from '@mui/icons-material/Delete';
import { getBarChartData, getCategories, getStates } from 'services/reportService';

const CompareForms = () => {
    const defaultReportType = ['Election'];
    const defaultState = ['Lagos', 'Ondo'];

    const [valueBasic, setValueBasic] = useState(new Date());
    const [valueSecond, setValueSecond] = useState(new Date());
    const [compare, setCompare] = useState([{ id: Date.now(), states: defaultState }]);
    const [reportTypeInputs, setReportTypeInputs] = useState([{ id: Date.now(), types: defaultReportType }]);
    const [, setLoading] = useState(false);
    const [, setError] = useState(false);
    const [states, setStates] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then((data) => {
                console.log('Fetched categories:', data);
                setCategories(data);
                setReportTypeInputs([{ id: Date.now(), types: [] }]);
            })
            .catch((error) => console.error('Failed to fetch categories:', error));
    }, []);

    useEffect(() => {
        getStates()
            .then((states) => setStates(states))
            .catch((error) => console.error('Failed to fetch states:', error));
    }, []);

    const handleAddReportTypeInput = useCallback(() => {
        if (reportTypeInputs.length < 4) {
            setReportTypeInputs([...reportTypeInputs, { id: Date.now(), types: [] }]);
        }
    }, [reportTypeInputs]);

    const handleReportTypeChange = useCallback(
        (id, newValue) => {
            const updatedInputs = reportTypeInputs.map((input) => (input.id === id ? { ...input, types: newValue } : input));
            setReportTypeInputs(updatedInputs);
        },
        [reportTypeInputs]
    );

    const handleAddStateInput = useCallback(() => {
        if (compare.length < 4) {
            setCompare([...compare, { id: Date.now(), states: '' }]);
        }
    }, [compare]);

    const handleStateChange = useCallback(
        (id, newValue) => {
            const updatedCompare = compare.map((input) => (input.id === id ? { ...input, states: newValue } : input));
            setCompare(updatedCompare);
        },
        [compare]
    );

    const handleDeleteReportTypeInput = useCallback(
        (index) => setReportTypeInputs(reportTypeInputs.filter((_, i) => i !== index)),
        [reportTypeInputs]
    );

    const handleDeleteCompareInput = useCallback((id) => setCompare(compare.filter((input) => input.id !== id)), [compare]);

    useEffect(() => {
        if (reportTypeInputs.length > 0 && compare.length > 0) {
            setLoading(true);
            const requestBody = {
                report_types: reportTypeInputs.flatMap((input) => input.types),
                states: compare.flatMap((input) => input.states)
            };
            getBarChartData(requestBody)
                .then((data) => {
                    setChartData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [reportTypeInputs, compare, valueBasic, valueSecond]);

    return (
        <MainCard sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <form>
                <Grid container spacing={4}>
                    {/* Report Types Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                            Compare Report Types
                        </Typography>
                        <Paper elevation={1} sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>
                            {reportTypeInputs.map((input, index) => (
                                <Stack key={input.id} direction="row" spacing={2} sx={{ mb: 2 }}>
                                    <Autocomplete
                                        fullWidth
                                        value={input.types}
                                        disableClearable
                                        onChange={(event, newValue) => handleReportTypeChange(input.id, newValue)}
                                        filterOptions={createFilterOptions()}
                                        options={categories}
                                        getOptionLabel={(option) => option}
                                        renderOption={(props, option) => (
                                            <Box component="li" {...props} sx={{ py: 1 }}>
                                                {option}
                                            </Box>
                                        )}
                                        freeSolo
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Select Report Type"
                                                variant="outlined"
                                                InputProps={{
                                                    ...params.InputProps,
                                                    sx: {
                                                        bgcolor: 'white',
                                                        borderRadius: 1,
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': { borderColor: 'grey.300' },
                                                            '&:hover fieldset': { borderColor: 'primary.main' }
                                                        }
                                                    },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <ArrowDropDown sx={{ color: 'text.secondary' }} />
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        )}
                                        sx={{ flexGrow: 1 }}
                                    />
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDeleteReportTypeInput(index)}
                                        sx={{ alignSelf: 'center' }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            ))}
                            <AnimateButton>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<ControlPointIcon />}
                                    onClick={handleAddReportTypeInput}
                                    fullWidth
                                    disabled={reportTypeInputs.length >= 4}
                                    sx={{
                                        borderRadius: 1,
                                        textTransform: 'none',
                                        py: 1,
                                        '&:hover': { bgcolor: 'primary.light', color: 'primary.contrastText' }
                                    }}
                                >
                                    Add Report Type
                                </Button>
                            </AnimateButton>
                        </Paper>
                    </Grid>

                    {/* States Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                            Compare States
                        </Typography>
                        <Paper elevation={1} sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>
                            {compare.map((input) => (
                                <Stack key={input.id} direction="row" spacing={2} sx={{ mb: 2 }}>
                                    <Autocomplete
                                        fullWidth
                                        value={input.states}
                                        disableClearable
                                        onChange={(event, newValue) => handleStateChange(input.id, newValue)}
                                        filterOptions={createFilterOptions()}
                                        options={states}
                                        getOptionLabel={(option) => (typeof option === 'string' ? option : option?.label || '')}
                                        renderOption={(props, option) => (
                                            <Box component="li" {...props} sx={{ py: 1 }}>
                                                {option}
                                            </Box>
                                        )}
                                        freeSolo
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Select State"
                                                variant="outlined"
                                                InputProps={{
                                                    ...params.InputProps,
                                                    sx: {
                                                        bgcolor: 'white',
                                                        borderRadius: 1,
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': { borderColor: 'grey.300' },
                                                            '&:hover fieldset': { borderColor: 'primary.main' }
                                                        }
                                                    },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <ArrowDropDown sx={{ color: 'text.secondary' }} />
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        )}
                                        sx={{ flexGrow: 1 }}
                                    />
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDeleteCompareInput(input.id)}
                                        sx={{ alignSelf: 'center' }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            ))}
                            <AnimateButton>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<ControlPointIcon />}
                                    onClick={handleAddStateInput}
                                    fullWidth
                                    disabled={compare.length >= 4}
                                    sx={{
                                        borderRadius: 1,
                                        textTransform: 'none',
                                        py: 1,
                                        '&:hover': { bgcolor: 'primary.light', color: 'primary.contrastText' }
                                    }}
                                >
                                    Add State
                                </Button>
                            </AnimateButton>
                        </Paper>
                    </Grid>

                    {/* Date Pickers Section */}
                    <Grid item xs={12}>
                        <Paper elevation={1} sx={{ p: 3, borderRadius: 2, bgcolor: 'background.default' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
                                        Start Date & Time
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    variant: 'outlined',
                                                    sx: {
                                                        '& .MuiOutlinedInput-root': {
                                                            bgcolor: 'white',
                                                            borderRadius: 1,
                                                            '& fieldset': { borderColor: 'grey.300' },
                                                            '&:hover fieldset': { borderColor: 'primary.main' }
                                                        }
                                                    }
                                                }
                                            }}
                                            label="Select Date & Time"
                                            value={valueBasic}
                                            onChange={(newValue) => setValueBasic(newValue)}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
                                        End Date & Time
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    variant: 'outlined',
                                                    sx: {
                                                        '& .MuiOutlinedInput-root': {
                                                            bgcolor: 'white',
                                                            borderRadius: 1,
                                                            '& fieldset': { borderColor: 'grey.300' },
                                                            '&:hover fieldset': { borderColor: 'primary.main' }
                                                        }
                                                    }
                                                }
                                            }}
                                            label="Select Date & Time"
                                            value={valueSecond}
                                            onChange={(newValue) => setValueSecond(newValue)}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Chart Section */}
                    <Grid item xs={12}>
                        <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                            <CompareBarChart data={chartData} />
                        </Paper>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default CompareForms;
