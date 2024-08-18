import React, { useState, useEffect } from 'react';
import { Avatar, Button, Grid, TextField } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import CircularProgress from '@mui/material/CircularProgress';
import { updateUserProfile, getUserProfile, uploadToS3 } from 'services/userService';
import { gridSpacing } from 'store/constant';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { setAvatarUrl } from 'store/slices/users'; 

const Profile = () => {
    const [avatarSrc, setAvatarSrc] = useState('');
    const [loading, setLoading] = useState(false);
    const [, setError] = useState('');
    const dispatch = useDispatch();
    const { avatarUrl } = useSelector((state) => state.user);
    const [initialValues, setInitialValues] = useState({
        fullname: '',
        email: '',
        username: '',
        state: '',
        lga: '',
        phone: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const defaultAvatarUrl = 'defaultAvatarUrl'; // Update with actual default URL

    useEffect(() => {
        setAvatarSrc(avatarUrl || defaultAvatarUrl);
    }, [avatarUrl]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setAvatarSrc(fileReader.result);
            };
            fileReader.readAsDataURL(file);
            setSelectedFile(file);
        }
    };

    useEffect(() => {
        if (selectedFile) {
            const uploadImage = async () => {
                try {
                    setLoading(true);
                    const uploadResponse = await uploadToS3(selectedFile);
                    const s3Url = uploadResponse.url;
                    localStorage.setItem('avatarSrc', s3Url);
                    setAvatarSrc(s3Url);
                    dispatch(setAvatarUrl(s3Url));
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Image upload completed.',
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: true
                        })
                    );
                    setLoading(false);
                } catch (error) {
                    console.error('Upload failed:', error);
                    setLoading(false);
                }
            };

            uploadImage();
        }
    }, [selectedFile, dispatch]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const userData = await getUserProfile();
                setInitialValues({
                    fullname: userData.name || '',
                    email: userData.email || '',
                    username: userData.username || '',
                    state: userData.state || '',
                    lga: userData.lga || '',
                    phone: userData.phone || ''
                });
                const storedAvatarSrc = localStorage.getItem('avatarSrc');
                setAvatarSrc(storedAvatarSrc || userData.profileImage || defaultAvatarUrl);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch user data');
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        username: Yup.string().required('Username is required'),
        state: Yup.string().required('State is required'),
        lga: Yup.string().required('LGA is required'),
        phone: Yup.string().required('Phone number is required')
    });

    const handleSubmit = async (values) => {
        setLoading(true);
        setError('');

        try {
            await updateUserProfile(values);
            setLoading(false);
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Profile updated successfully.',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
            {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                    <Grid container spacing={gridSpacing}>
                        <Grid item sm={6} md={4}>
                            <SubCard title="Profile Picture" contentSX={{ textAlign: 'center' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Avatar
                                            alt="User Avatar"
                                            src={avatarSrc || defaultAvatarUrl}
                                            sx={{ width: 100, height: 100, margin: '0 auto' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                            id="file-input"
                                        />
                                        <AnimateButton>
                                            <label htmlFor="file-input">
                                                <Button variant="contained" size="small" component="span" disabled={loading}>
                                                    Choose Avatar
                                                </Button>
                                            </label>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                        <Grid item sm={6} md={8}>
                            <SubCard title="Edit Account Details">
                                <Grid container spacing={gridSpacing}>
                                    {/* Form Fields */}
                                    {/* Full Name */}
                                    <Grid item xs={12}>
                                        <TextField
                                            id="fullname"
                                            name="fullname"
                                            label="Full Name"
                                            fullWidth
                                            value={values.fullname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.fullname && Boolean(errors.fullname)}
                                            helperText={touched.fullname && errors.fullname}
                                        />
                                    </Grid>
                                    {/* Email */}
                                    <Grid item xs={12}>
                                        <TextField
                                            id="email"
                                            name="email"
                                            label="Email Address"
                                            fullWidth
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                    </Grid>
                                    {/* Username */}
                                    <Grid item xs={12}>
                                        <TextField
                                            id="username"
                                            name="username"
                                            label="Username"
                                            fullWidth
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.username && Boolean(errors.username)}
                                            helperText={touched.username && errors.username}
                                        />
                                    </Grid>
                                    {/* State */}
                                    <Grid item xs={12}>
                                        <TextField
                                            id="state"
                                            name="state"
                                            label="State"
                                            fullWidth
                                            value={values.state}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.state && Boolean(errors.state)}
                                            helperText={touched.state && errors.state}
                                        />
                                    </Grid>
                                    {/* LGA */}
                                    <Grid item xs={12}>
                                        <TextField
                                            id="lga"
                                            name="lga"
                                            label="LGA"
                                            fullWidth
                                            value={values.lga}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.lga && Boolean(errors.lga)}
                                            helperText={touched.lga && errors.lga}
                                        />
                                    </Grid>
                                    {/* Phone */}
                                    <Grid item xs={12}>
                                        <TextField
                                            id="phone"
                                            name="phone"
                                            label="Phone Number"
                                            fullWidth
                                            value={values.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.phone && Boolean(errors.phone)}
                                            helperText={touched.phone && errors.phone}
                                        />
                                    </Grid>
                                    {/* Submit Button */}
                                    <Grid item xs={12} sx={{ textAlign: 'right' }}>
                                        <AnimateButton>
                                            <Button type="submit" variant="contained" disabled={loading}>
                                                {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default Profile;
