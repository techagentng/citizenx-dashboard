import React, { useState, useEffect } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Paper,
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
import { getCategories, getStates, getComparisonData } from 'services/reportService';
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
    const [comparisonData, setComparisonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch categories and states on component mount
        getCategories()
            .then(data => setCategories(data))
            .catch(err => setError('Failed to fetch categories'));

        getStates()
            .then(data => setStates(data.states || []))
            .catch(err => setError('Failed to fetch states'));
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
        setLocations(locations.map(loc => 
            loc.id === id ? { ...loc, [field]: value } : loc
        ));
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
                <Grid container spacing={3} sx={{ mb: 4 }}>
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

                                {locations.map((location, index) => (
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
                                            <Grid item xs={6}>
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
                                            <Grid item xs={6}>
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
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        label="LGA Name"
                                                        value={location.name}
                                                        onChange={(e) => updateLocation(location.id, 'name', e.target.value)}
                                                    />
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
            </Box>
        </LocalizationProvider>
    );
};

export default EnhancedComparison;
