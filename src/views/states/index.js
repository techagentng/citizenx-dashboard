import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, styled, MenuItem } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createState } from 'services/stateservice';
import { getStates, getLGAs } from 'services/reportService'; // Import getLgas

// Styled components (unchanged)
const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 900,
    margin: '0 auto',
    padding: theme.spacing(3),
    borderRadius: 16,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    background: '#fff',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)'
    }
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5, 4),
    borderRadius: 8,
    color: 'white',
    textTransform: 'none',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
    '&:hover': {
        background: 'linear-gradient(45deg, #1565c0, #1976d2)'
    },
    '&:disabled': {
        background: '#cccccc'
    }
}));

const FileInputLabel = styled('label')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    border: '2px dashed #ccc',
    borderRadius: 8,
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
    transition: 'border-color 0.3s ease',
    '&:hover': {
        borderColor: theme.palette.primary.main
    }
}));

const StateForm = () => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        state: '',
        governor: '',
        deputy_name: '',
        lgac: ''
    });
    const [files, setFiles] = useState({
        governor_image: null,
        deputy_image: null,
        lgac_image: null
    });
    const [errors, setErrors] = useState({});
    const [states, setStates] = useState([]); // Dynamic state options
    const [lgas, setLgas] = useState([]); // Dynamic LGA options
    const [selectedLgas, setSelectedLgas] = useState([]); // Multi-select LGAs

    // File input refs to avoid undefined errors
    const governorFileInput = useRef(null);
    const deputyFileInput = useRef(null);
    const lgacFileInput = useRef(null);

    // Fetch states on mount
    useEffect(() => {
        getStates()
            .then((stateData) => {
                const stateOptions = stateData.map((state) => ({
                    value: state.state,
                    label: state.state
                }));
                setStates(stateOptions);
            })
            .catch((error) => {
                console.error('Failed to fetch states:', error);
                setStates([]);
            });
    }, []);

    // Fetch LGAs when state changes
    useEffect(() => {
        if (formValues.state) {
            getLGAs(formValues.state)
                .then((lgaData) => {
                    const lgaOptions = lgaData.map((lga) => ({ value: lga, label: lga }));
                    setLgas(lgaOptions);
                })
                .catch((error) => {
                    console.error(`Failed to fetch LGAs for ${formValues.state}:`, error.message);
                    setLgas([]);
                });
        } else {
            setLgas([]);
            setSelectedLgas([]);
        }
    }, [formValues.state]);

    // Handle text field and dropdown changes
    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    // Handle LGA multi-select
    const handleLgaChange = (e) => {
        const value = e.target.value;
        setSelectedLgas(value);
        if (errors.lgas) {
            setErrors((prev) => ({ ...prev, lgas: '' }));
        }
    };

    // Handle file changes with refs
    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setFiles((prev) => ({ ...prev, [fieldName]: file }));
            if (errors[fieldName]) {
                setErrors((prev) => ({ ...prev, [fieldName]: '' }));
            }
        }
    };

    // Validation
    const validate = () => {
        const newErrors = {};
        if (!formValues.state) newErrors.state = 'State name is required';
        if (!formValues.governor) newErrors.governor = 'Governor name is required';
        if (!formValues.deputy_name) newErrors.deputy_name = 'Deputy name is required';
        if (!formValues.lgac) newErrors.lgac = 'LGA Chair name is required';
        if (selectedLgas.length === 0) newErrors.lgas = 'At least one LGA is required';
        if (!files.governor_image) newErrors.governor_image = 'Governor image is required';
        if (!files.deputy_image) newErrors.deputy_image = 'Deputy image is required';
        if (!files.lgac_image) newErrors.lgac_image = 'LGAC image is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const payload = {
                state: formValues.state,
                governor: formValues.governor,
                deputyName: formValues.deputy_name,
                lgac: formValues.lgac,
                lgas: selectedLgas, // Use selected LGAs array
                governorImage: files.governor_image,
                deputyImage: files.deputy_image,
                lgacImage: files.lgac_image
            };

            await createState(payload);
            alert('State data saved successfully!');
            setFormValues({ state: '', governor: '', deputy_name: '', lgac: '' });
            setSelectedLgas([]);
            setFiles({ governor_image: null, deputy_image: null, lgac_image: null });
            setErrors({});
            // Reset file inputs
            governorFileInput.current.value = '';
            deputyFileInput.current.value = '';
            lgacFileInput.current.value = '';
        } catch (error) {
            console.error('Error saving state data:', error);
            const errorMessage = error.response?.data?.error || 'Failed to save state data. Please try again.';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f8', py: 4 }}>
            <StyledCard>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        Add New State Data
                    </Typography>
                    <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 4 }}>
                        Fill in the details below to create a new state record.
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {/* State Dropdown */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="State Name"
                                    name="state"
                                    value={formValues.state}
                                    onChange={handleTextChange}
                                    error={!!errors.state}
                                    helperText={errors.state}
                                    variant="outlined"
                                    sx={{ bgcolor: '#fff' }}
                                >
                                    <MenuItem value="" disabled>
                                        Select State
                                    </MenuItem>
                                    {states.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* Governor */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Governor"
                                    name="governor"
                                    value={formValues.governor}
                                    onChange={handleTextChange}
                                    error={!!errors.governor}
                                    helperText={errors.governor}
                                    variant="outlined"
                                    sx={{ bgcolor: '#fff' }}
                                />
                            </Grid>

                            {/* Deputy Name */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Deputy Name"
                                    name="deputy_name"
                                    value={formValues.deputy_name}
                                    onChange={handleTextChange}
                                    error={!!errors.deputy_name}
                                    helperText={errors.deputy_name}
                                    variant="outlined"
                                    sx={{ bgcolor: '#fff' }}
                                />
                            </Grid>

                            {/* LGAC */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="LGA Chair Name"
                                    name="lgac"
                                    value={formValues.lgac}
                                    onChange={handleTextChange}
                                    error={!!errors.lgac}
                                    helperText={errors.lgac}
                                    variant="outlined"
                                    sx={{ bgcolor: '#fff' }}
                                />
                            </Grid>

                            {/* LGA Dropdown (Multi-Select) */}
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Local Government Areas"
                                    value={selectedLgas}
                                    onChange={handleLgaChange}
                                    error={!!errors.lgas}
                                    helperText={errors.lgas || 'Select one or more LGAs'}
                                    variant="outlined"
                                    sx={{ bgcolor: '#fff' }}
                                    SelectProps={{
                                        multiple: true,
                                        renderValue: (selected) => selected.join(', ')
                                    }}
                                    disabled={!formValues.state}
                                >
                                    {lgas.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* Governor Image */}
                            <Grid item xs={12} sm={4}>
                                <FileInputLabel>
                                    <CloudUploadIcon sx={{ mr: 1, color: '#1976d2' }} />
                                    Upload Governor Image
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        ref={governorFileInput}
                                        onChange={(e) => handleFileChange(e, 'governor_image')}
                                    />
                                </FileInputLabel>
                                {files.governor_image && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {files.governor_image.name}
                                    </Typography>
                                )}
                                {errors.governor_image && (
                                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                        {errors.governor_image}
                                    </Typography>
                                )}
                            </Grid>

                            {/* Deputy Image */}
                            <Grid item xs={12} sm={4}>
                                <FileInputLabel>
                                    <CloudUploadIcon sx={{ mr: 1, color: '#1976d2' }} />
                                    Upload Deputy Image
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        ref={deputyFileInput}
                                        onChange={(e) => handleFileChange(e, 'deputy_image')}
                                    />
                                </FileInputLabel>
                                {files.deputy_image && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {files.deputy_image.name}
                                    </Typography>
                                )}
                                {errors.deputy_image && (
                                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                        {errors.deputy_image}
                                    </Typography>
                                )}
                            </Grid>

                            {/* LGAC Image */}
                            <Grid item xs={12} sm={4}>
                                <FileInputLabel>
                                    <CloudUploadIcon sx={{ mr: 1, color: '#1976d2' }} />
                                    Upload LGAC Image
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        ref={lgacFileInput}
                                        onChange={(e) => handleFileChange(e, 'lgac_image')}
                                    />
                                </FileInputLabel>
                                {files.lgac_image && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {files.lgac_image.name}
                                    </Typography>
                                )}
                                {errors.lgac_image && (
                                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                        {errors.lgac_image}
                                    </Typography>
                                )}
                            </Grid>

                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <StyledButton type="submit" disabled={loading} fullWidth>
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Save State'}
                                </StyledButton>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </StyledCard>
        </Box>
    );
};

export default StateForm;