import React, { useState, useEffect, useCallback } from 'react';
import { Button, Grid, Stack, TextField, Typography, IconButton } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Autocomplete, Box, InputAdornment } from '@mui/material';
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
    const [loading, setLoading] = useState(false);
    const [, setError] = useState(false);
    const [states, setStates] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then((data) => {
                console.log('Fetched categories:', data);
                setCategories(data);
                setReportTypeInputs([{ id: Date.now(), types: [] }]); // Initialize with empty types
            })
            .catch((error) => {
                console.error('Failed to fetch categories:', error);
            });
    }, []);

    useEffect(() => {
        getStates()
            .then((states) => {
                setStates(states);
            })
            .catch((error) => {
                console.error('Failed to fetch states:', error);
            });
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
        (index) => {
            const updatedInputs = reportTypeInputs.filter((_, i) => i !== index);
            setReportTypeInputs(updatedInputs);
        },
        [reportTypeInputs]
    );

    const handleDeleteCompareInput = useCallback(
        (id) => {
            const updatedCompare = compare.filter((input) => input.id !== id);
            setCompare(updatedCompare);
        },
        [compare]
    );

    useEffect(() => {
        if (reportTypeInputs.length > 0 && compare.length > 0) {
            setLoading(true);
            const requestBody = {
                report_types: reportTypeInputs.flatMap((input) => input.types),
                states: compare.flatMap((input) => input.states)
                // start_date: valueBasic.toISOString(),
                // end_date: valueSecond.toISOString()
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <MainCard>
            <form>
                <Grid container md={12} spacing={3}>
                    <Grid item md={6} sx={{ mt: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            Compare Report Types
                        </Typography>
                        <Grid container spacing={2}>
                            {reportTypeInputs.map((input, index) => (
                                <Grid item xs={12} key={input.id} sx={{ mt: 2 }}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Autocomplete
                                            fullWidth
                                            value={input.types}
                                            disableClearable
                                            onChange={(event, newValue) => handleReportTypeChange(input.id, newValue)}
                                            filterOptions={(options, params) => {
                                                const filtered = createFilterOptions()(options, params);
                                                const { inputValue } = params;
                                                const isExisting = options.some((option) => inputValue === option);
                                                if (inputValue !== '' && !isExisting) {
                                                    filtered.push(`Add "${inputValue}"`);
                                                }
                                                return filtered;
                                            }}
                                            selectOnFocus
                                            clearOnBlur
                                            autoHighlight
                                            handleHomeEndKeys
                                            id={`free-solo-with-text-demo-${input.id}`}
                                            options={categories}
                                            getOptionLabel={(option) => option}
                                            renderOption={(props, option) => (
                                                <Box component="li" {...props}>
                                                    {option}
                                                </Box>
                                            )}
                                            freeSolo
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    name={`role-${index}`}
                                                    placeholder="Select Report Type"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        sx: { bgcolor: 'grey.0' },
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <ArrowDropDown sx={{ color: 'text.primary' }} />
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            )}
                                        />

                                        <IconButton aria-label="delete" onClick={() => handleDeleteReportTypeInput(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    variant="outlined"
                                    startIcon={<ControlPointIcon />}
                                    onClick={handleAddReportTypeInput}
                                    sx={{
                                        mt: 1,
                                        mb: 1,
                                        borderRadius: '8px',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                        }
                                    }}
                                >
                                    Add Report Type
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>

                    <Grid item md={6} sx={{ mt: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            Compare States
                        </Typography>
                        <Grid container spacing={2}>
                            {compare.map((input) => (
                                <Grid item xs={12} key={input.id} sx={{ mt: 2 }}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Autocomplete
                                            fullWidth
                                            value={input.states}
                                            disableClearable
                                            onChange={(event, newValue) => handleStateChange(input.id, newValue)}
                                            filterOptions={(options, params) => {
                                                const filtered = createFilterOptions()(options, params);
                                                const { inputValue } = params;
                                                const isExisting = options.some((option) => inputValue === option);
                                                if (inputValue !== '' && !isExisting) {
                                                    filtered.push(`Add "${inputValue}"`);
                                                }
                                                return filtered;
                                            }}
                                            selectOnFocus
                                            clearOnBlur
                                            autoHighlight
                                            handleHomeEndKeys
                                            id={`free-solo-with-text-demo-${input.id}`}
                                            options={states}
                                            getOptionLabel={(option) => {
                                                if (typeof option === 'string') {
                                                    return option;
                                                } else if (typeof option === 'object' && option.label) {
                                                    return option.label;
                                                } else {
                                                    return '';
                                                }
                                            }}
                                            renderOption={(props, option) => (
                                                <Box component="li" {...props}>
                                                    {option}
                                                </Box>
                                            )}
                                            freeSolo
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    name="states"
                                                    placeholder="Select State"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        sx: { bgcolor: 'grey.0' },
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <ArrowDropDown sx={{ color: 'text.primary' }} />
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            )}
                                        />

                                        <IconButton aria-label="delete" onClick={() => handleDeleteCompareInput(input.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    variant="outlined"
                                    startIcon={<ControlPointIcon />}
                                    onClick={handleAddStateInput}
                                    sx={{
                                        mt: 1,
                                        mb: 1,
                                        borderRadius: '8px',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                        }
                                    }}
                                >
                                    Add State
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>

                    <Grid item md={12} sx={{ mt: 2 }}>
                        <Grid container spacing={3} direction="column">
                            <Grid item container spacing={2} direction="row">
                                <Grid item>
                                    <Typography variant="h5" gutterBottom>
                                        First DateTime
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            slotProps={{ textField: { fullWidth: true } }}
                                            label="Date & Time"
                                            value={valueBasic}
                                            onChange={(newValue) => setValueBasic(newValue)}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5" gutterBottom>
                                        Second Date
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            slotProps={{ textField: { fullWidth: true } }}
                                            label="Date & Time"
                                            value={valueSecond}
                                            onChange={(newValue) => setValueSecond(newValue)}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            {/* <Grid item sx={{ mt: 2 }}>
                                <Button variant="contained" color="secondary" sx={{ width: '50%', backgroundColor: '#0e9b66' }}>
                                    Compare
                                </Button>
                            </Grid> */}
                        </Grid>
                    </Grid>

                    <Grid item md={12} sx={{ mt: 2 }}>
                        <CompareBarChart data={chartData} />
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default CompareForms;
