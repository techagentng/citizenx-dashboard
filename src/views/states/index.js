import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Styled components for custom styling
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

    // Mock S3 upload function (replace with actual S3 logic later)
    const uploadImagesToS3 = async (values) => {
        // Placeholder: Return file names or dummy URLs until S3 is integrated
        return {
            governor_image: values.governor_image ? 's3://bucket/governor_image.jpg' : '',
            deputy_image: values.deputy_image ? 's3://bucket/deputy_image.jpg' : '',
            lgac_image: values.lgac_image ? 's3://bucket/lgac_image.jpg' : ''
        };
    };

    const formik = useFormik({
        initialValues: {
            state: '',
            governor: '',
            deputy_name: '',
            lgac: '',
            governor_image: null,
            deputy_image: null,
            lgac_image: null
        },
        validationSchema: Yup.object({
            state: Yup.string().required('State name is required'),
            governor: Yup.string().required('Governor name is required'),
            deputy_name: Yup.string().required('Deputy name is required'),
            lgac: Yup.string().required('LGA Chair name is required'),
            governor_image: Yup.mixed().required('Governor image is required'),
            deputy_image: Yup.mixed().required('Deputy image is required'),
            lgac_image: Yup.mixed().required('LGAC image is required')
        }),
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            try {
                const uploadedImages = await uploadImagesToS3(values);

                const payload = {
                    state: values.state,
                    governor: values.governor,
                    deputy_name: values.deputy_name,
                    lgac: values.lgac,
                    governor_image: uploadedImages.governor_image,
                    deputy_image: uploadedImages.deputy_image,
                    lgac_image: uploadedImages.lgac_image
                };

                await axios.post('https://citizenx-dashboard-sbqx.onrender.com/create/governor', payload);
                alert('State data saved successfully!');
                resetForm();
            } catch (error) {
                console.error('Error saving state data:', error);
                alert('Failed to save state data. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    });

    const handleImageChange = (event, fieldName) => {
        const file = event.target.files[0];
        formik.setFieldValue(fieldName, file);
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

                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            {/* State */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="State Name"
                                    name="state"
                                    value={formik.values.state}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.state && Boolean(formik.errors.state)}
                                    helperText={formik.touched.state && formik.errors.state}
                                    variant="outlined"
                                    sx={{ bgcolor: '#fff' }}
                                />
                            </Grid>

                            {/* Governor */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Governor"
                                    name="governor"
                                    value={formik.values.governor}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.governor && Boolean(formik.errors.governor)}
                                    helperText={formik.touched.governor && formik.errors.governor}
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
                                    value={formik.values.deputy_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.deputy_name && Boolean(formik.errors.deputy_name)}
                                    helperText={formik.touched.deputy_name && formik.errors.deputy_name}
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
                                    value={formik.values.lgac}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.lgac && Boolean(formik.errors.lgac)}
                                    helperText={formik.touched.lgac && formik.errors.lgac}
                                    variant="outlined"
                                    sx={{ bgcolor: '#fff' }}
                                />
                            </Grid>

                            {/* Governor Image */}
                            <Grid item xs={12} sm={4}>
                                <FileInputLabel>
                                    <CloudUploadIcon sx={{ mr: 1, color: '#1976d2' }} />
                                    Upload Governor Image
                                    <input
                                        type="file"
                                        name="governor_image"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, 'governor_image')}
                                    />
                                </FileInputLabel>
                                {formik.values.governor_image && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {formik.values.governor_image.name}
                                    </Typography>
                                )}
                                {formik.touched.governor_image && formik.errors.governor_image && (
                                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                        {formik.errors.governor_image}
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
                                        name="deputy_image"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, 'deputy_image')}
                                    />
                                </FileInputLabel>
                                {formik.values.deputy_image && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {formik.values.deputy_image.name}
                                    </Typography>
                                )}
                                {formik.touched.deputy_image && formik.errors.deputy_image && (
                                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                        {formik.errors.deputy_image}
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
                                        name="lgac_image"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, 'lgac_image')}
                                    />
                                </FileInputLabel>
                                {formik.values.lgac_image && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {formik.values.lgac_image.name}
                                    </Typography>
                                )}
                                {formik.touched.lgac_image && formik.errors.lgac_image && (
                                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                        {formik.errors.lgac_image}
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
