import React, { useState, useEffect } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Chip,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    CircularProgress,
    Alert
} from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    TrendingUp,
    TrendingDown,
    TrendingFlat,
    CompareArrows,
    Assessment
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getCategories, getStates, getComparisonData, getLGAs } from 'services/reportService';
import ComparisonChart from './ComparisonChart';
import ComparisonInsights from './ComparisonInsights';

const EnhancedComparison = () => {
    const [reportType, setReportType] = useState('');
    const [locations, setLocations] = useState([
        { id: 1, type: 'state', name: '', label: 'Location 1' }
    ]);
    const [dateRange, setDateRange] = useState({
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        end: new Date()
    });
    const [granularity, setGranularity] = useState('daily');
    
    const [categories, setCategories] = useState([]);
    const [states, setStates] = useState([]);
    const [lgas, setLgas] = useState({});
    const [comparisonData, setComparisonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setDataLoading(true);
        
        // Fetch categories and states on component mount
        Promise.all([
            getCategories().catch(err => {
                console.error('Failed to fetch categories:', err);
                return [];
            }),
            getStates().catch(err => {
                console.error('Failed to fetch states:', err);
                return [];
            })
        ])
        .then(([categoriesData, statesData]) => {
            console.log('Categories response:', categoriesData);
            console.log('States response:', statesData);
            
            // Set categories
            setCategories(categoriesData || []);
            
            // Handle different states response formats
            if (statesData && statesData.states) {
                setStates(statesData.states);
            } else if (statesData && Array.isArray(statesData)) {
                setStates(statesData);
            } else if (statesData && statesData.data && Array.isArray(statesData.data)) {
                setStates(statesData.data);
            } else {
                console.warn('Unexpected states format:', statesData);
                setStates([]);
            }
        })
        .catch(err => {
            console.error('Data loading error:', err);
            setError('Failed to load comparison data');
        })
        .finally(() => {
            setDataLoading(false);
        });
    }, []);

    const addLocation = () => {
        if (locations.length < 4) {
            setLocations([
                ...locations,
                {
                    id: Date.now(),
                    type: 'state',
                    name: '',
                    label: `Location ${locations.length + 1}`
                }
            ]);
        }
    };

    const removeLocation = (id) => {
        if (locations.length > 2) {
            setLocations(locations.filter(loc => loc.id !== id));
        }
    };

    const updateLocation = (id, field, value) => {
        const updatedLocations = locations.map(loc => {
            if (loc.id === id) {
                const updatedLoc = { ...loc, [field]: value };
                
                // If changing type to LGA, clear name and fetch LGAs for first available state
                if (field === 'type' && value === 'lga') {
                    updatedLoc.name = '';
                    updatedLoc.state = '';
                }
                
                // If setting state for LGA type, fetch LGAs for that state
                if (field === 'state' && loc.type === 'lga') {
                    fetchLGAsForState(value);
                }
                
                return updatedLoc;
            }
            return loc;
        });
        
        setLocations(updatedLocations);
    };

    const fetchLGAsForState = async (stateName) => {
        if (!stateName || lgas[stateName]) {
            return; // Already fetched or invalid state
        }
        
        try {
            const lgaData = await getLGAs(stateName);
            setLgas(prev => ({
                ...prev,
                [stateName]: Array.isArray(lgaData) ? lgaData : (lgaData.lgas || [])
            }));
        } catch (error) {
            console.error(`Failed to fetch LGAs for ${stateName}:`, error);
        }
    };

    const runComparison = () => {
        if (!reportType || locations.some(loc => !loc.name)) {
            setError('Please select a report type and fill in all locations');
            return;
        }

        setLoading(true);
        setError('');

        const requestBody = {
            report_type: reportType,
            locations: locations.map(loc => ({
                type: loc.type,
                name: loc.name,
                ...(loc.type === 'lga' && { state: loc.state })
            })),
            date_range: {
                start: dateRange.start.toISOString().split('T')[0],
                end: dateRange.end.toISOString().split('T')[0]
            },
            granularity
        };

        getComparisonData(requestBody)
            .then(data => {
                setComparisonData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || 'Failed to fetch comparison data');
                setLoading(false);
            });
    };

    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'increasing': return <TrendingUp color="success" />;
            case 'decreasing': return <TrendingDown color="error" />;
            default: return <TrendingFlat color="action" />;
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ p: 3 }}>
                {/* Header */}
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        <CompareArrows sx={{ verticalAlign: 'middle', mr: 1 }} />
                        Report Comparison
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Compare a single report type across multiple locations
                    </Typography>
                </Box>

                {/* Configuration Section */}
                {dataLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                        <CircularProgress />
                        <Typography sx={{ ml: 2 }}>Loading comparison data...</Typography>
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            {/* Debug Info */}
                            {process.env.NODE_ENV === 'development' && (
                                <Grid item xs={12}>
                                    <Alert severity="info" sx={{ mb: 2 }}>
                                        <Typography variant="body2">
                                            Debug Info: Found {states.length} states, {categories.length} categories, {Object.keys(lgas).length} states with LGAs loaded
                                        </Typography>
                                        {states.length > 0 && (
                                            <Typography variant="caption">
                                                First 3 states: {states.slice(0, 3).join(', ')}
                                            </Typography>
                                        )}
                                        {Object.keys(lgas).length > 0 && (
                                            <Typography variant="caption" display="block">
                                                LGAs loaded for: {Object.keys(lgas).join(', ')}
                                            </Typography>
                                        )}
                                    </Alert>
                                </Grid>
                            )}

                            {/* Report Type Selection */}
                            <Grid item xs={12} md={3}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            <Assessment sx={{ verticalAlign: 'middle', mr: 1 }} />
                                            Report Type
                                        </Typography>
                                        <FormControl fullWidth>
                                            <InputLabel>Select Report Type</InputLabel>
                                            <Select
                                                value={reportType}
                                                onChange={(e) => setReportType(e.target.value)}
                                                label="Select Report Type"
                                            >
                                                {categories.map(category => (
                                                    <MenuItem key={category} value={category}>
                                                        {category}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Locations Configuration */}
                            <Grid item xs={12} md={6}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                            <Typography variant="h6">
                                                <CompareArrows sx={{ verticalAlign: 'middle', mr: 1 }} />
                                                Locations to Compare
                                            </Typography>
                                            <IconButton 
                                                onClick={addLocation}
                                                disabled={locations.length >= 4}
                                                color="primary"
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Box>

                                        {locations.map((location) => (
                                            <Box key={location.id} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                    <Typography variant="subtitle2">{location.label}</Typography>
                                                    {locations.length > 2 && (
                                                        <IconButton 
                                                            size="small"
                                                            onClick={() => removeLocation(location.id)}
                                                            color="error"
                                                        >
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                    )}
                                                </Box>

                                                <Grid container spacing={1}>
                                                    <Grid item xs={4}>
                                                        <FormControl fullWidth size="small">
                                                            <InputLabel>Type</InputLabel>
                                                            <Select
                                                                value={location.type}
                                                                onChange={(e) => updateLocation(location.id, 'type', e.target.value)}
                                                                label="Type"
                                                            >
                                                                <MenuItem value="state">State</MenuItem>
                                                                <MenuItem value="lga">LGA</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    {location.type === 'lga' && (
                                                        <Grid item xs={4}>
                                                            <FormControl fullWidth size="small">
                                                                <InputLabel>State</InputLabel>
                                                                <Select
                                                                    value={location.state || ''}
                                                                    onChange={(e) => updateLocation(location.id, 'state', e.target.value)}
                                                                    label="State"
                                                                >
                                                                    {states.map(state => (
                                                                        <MenuItem key={state} value={state}>
                                                                            {state}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    )}
                                                    <Grid item xs={location.type === 'lga' ? 4 : 8}>
                                                        {location.type === 'state' ? (
                                                            <FormControl fullWidth size="small">
                                                                <InputLabel>State</InputLabel>
                                                                <Select
                                                                    value={location.name}
                                                                    onChange={(e) => updateLocation(location.id, 'name', e.target.value)}
                                                                    label="State"
                                                                >
                                                                    {states.map(state => (
                                                                        <MenuItem key={state} value={state}>
                                                                            {state}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        ) : (
                                                            <FormControl fullWidth size="small">
                                                                <InputLabel>LGA</InputLabel>
                                                                <Select
                                                                    value={location.name}
                                                                    onChange={(e) => updateLocation(location.id, 'name', e.target.value)}
                                                                    label="LGA"
                                                                    disabled={!location.state}
                                                                >
                                                                    {location.state && lgas[location.state] ? (
                                                                        lgas[location.state].map(lga => (
                                                                            <MenuItem key={lga} value={lga}>
                                                                                {lga}
                                                                            </MenuItem>
                                                                        ))
                                                                    ) : (
                                                                        <MenuItem disabled>
                                                                            {location.state ? 'Loading LGAs...' : 'Select a state first'}
                                                                        </MenuItem>
                                                                    )}
                                                                </Select>
                                                            </FormControl>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        ))}

                                        <Typography variant="caption" color="text.secondary">
                                            Add up to 4 locations for comparison
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Date and Granularity */}
                            <Grid item xs={12} md={3}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Time Period
                                        </Typography>
                                        
                                        <Box sx={{ mb: 2 }}>
                                            <DatePicker
                                                label="Start Date"
                                                value={dateRange.start}
                                                onChange={(newValue) => setDateRange(prev => ({ ...prev, start: newValue }))}
                                                renderInput={(params) => <TextField {...params} fullWidth size="small" sx={{ mb: 1 }} />}
                                            />
                                            <DatePicker
                                                label="End Date"
                                                value={dateRange.end}
                                                onChange={(newValue) => setDateRange(prev => ({ ...prev, end: newValue }))}
                                                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                                            />
                                        </Box>

                                        <FormControl fullWidth size="small">
                                            <InputLabel>Granularity</InputLabel>
                                            <Select
                                                value={granularity}
                                                onChange={(e) => setGranularity(e.target.value)}
                                                label="Granularity"
                                            >
                                                <MenuItem value="daily">Daily</MenuItem>
                                                <MenuItem value="weekly">Weekly</MenuItem>
                                                <MenuItem value="monthly">Monthly</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* Run Comparison Button */}
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={runComparison}
                                disabled={loading || !reportType || locations.some(loc => !loc.name)}
                                sx={{ px: 4, py: 1.5 }}
                            >
                                {loading ? (
                                    <>
                                        <CircularProgress size={20} sx={{ mr: 1 }} />
                                        Running Comparison...
                                    </>
                                ) : (
                                    <>
                                        <CompareArrows sx={{ mr: 1 }} />
                                        Run Comparison
                                    </>
                                )}
                            </Button>
                        </Box>

                        {/* Error Display */}
                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {/* Results Section */}
                        {comparisonData && !loading && (
                            <Grid container spacing={3}>
                                {/* Summary Cards */}
                                {comparisonData.data.locations.map((location, index) => (
                                    <Grid item xs={12} md={3} key={location.name}>
                                        <Card sx={{ 
                                            height: '100%',
                                            border: '2px solid',
                                            borderColor: index === 0 ? 'primary.main' : 'grey.200'
                                        }}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                        {location.name}
                                                    </Typography>
                                                    {getTrendIcon(location.trend)}
                                                </Box>
                                                
                                                <Typography variant="h4" color="primary.main" sx={{ mb: 1 }}>
                                                    {location.total_reports.toLocaleString()}
                                                </Typography>
                                                
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                    Total Reports
                                                </Typography>

                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <Typography variant="body2">
                                                        Daily Avg: {location.daily_average?.toFixed(1)}
                                                    </Typography>
                                                    {location.trend_percentage && (
                                                        <Chip
                                                            size="small"
                                                            label={`${location.trend_percentage > 0 ? '+' : ''}${location.trend_percentage.toFixed(1)}%`}
                                                            color={location.trend_percentage > 0 ? 'success' : location.trend_percentage < 0 ? 'error' : 'default'}
                                                            sx={{ ml: 1 }}
                                                        />
                                                    )}
                                                </Box>

                                                <Typography variant="caption" color="text.secondary">
                                                    {location.type === 'state' ? 'State' : 'LGA'} Comparison
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}

                                {/* Chart */}
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                Comparison Chart
                                            </Typography>
                                            <ComparisonChart data={comparisonData.data} />
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Insights */}
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                Key Insights
                                            </Typography>
                                            <ComparisonInsights insights={comparisonData.data.insights} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        )}
                    </>
                )}
            </Box>
        </LocalizationProvider>
    );
};

export default EnhancedComparison;
