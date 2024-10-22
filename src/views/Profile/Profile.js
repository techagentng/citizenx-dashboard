import React, { useState, useEffect } from 'react';
import { Avatar, Button, Grid, TextField, Box } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import CircularProgress from '@mui/material/CircularProgress';
import { updateUserProfile, getUserProfile, uploadToS3 } from 'services/userService';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { setAvatarUrl } from 'store/slices/users';
import { deleteUser } from './../../services/userService';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Profile = () => {
    const [avatarSrc, setAvatarSrc] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [initialValues, setInitialValues] = useState({
        fullname: '',
        email: '',
        username: '',
        state: '',
        lga: '',
        phone: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const defaultAvatarUrl = 'path/to/default/avatar.jpg'; // Update with actual default URL

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
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
                } catch (error) {
                    console.error('Upload failed:', error);
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Image upload failed.',
                            variant: 'alert',
                            alert: {
                                color: 'error'
                            },
                            close: true
                        })
                    );
                } finally {
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
            } catch (err) {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Failed to fetch user data',
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        close: true
                    })
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [dispatch]);

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

        try {
            await updateUserProfile(values);
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
            dispatch(
                openSnackbar({
                    open: true,
                    message: err.message,
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        setLoading(true);
        handleClose();
        deleteUser()
            .then((data) => {
                console.log('User deleted successfully:', data);
                alert('Your account has been deleted.');
                localStorage.removeItem('serviceToken');
                window.location.href = '/login';
            })
            .catch((error) => {
                console.error('Failed to delete user:', error);
                alert('Failed to delete account. Please try again later.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
            {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                    <Grid container spacing={3}>
                        <Grid item sm={6} md={4}>
                            <SubCard title="Profile Picture">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Avatar
                                            alt="User Avatar"
                                            src={avatarSrc || '/defaultAvatar.png'} // Update this to your default image
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
                                <Grid container spacing={3}>
                                    {/* Full Name */}
                                    <Grid item md={6} xs={12}>
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
                                    <Grid item md={6} xs={12}>
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
                                    <Grid item md={6} xs={12}>
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
                                    <Grid item md={6} xs={12}>
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
                                    <Grid item md={6} xs={12}>
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
                                    <Grid item md={6} xs={12}>
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
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <AnimateButton>
                                                <Button type="submit" variant="contained" size="large" disabled={loading}>
                                                    {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                                                </Button>
                                            </AnimateButton>
                                        </Box>
                                    </Grid>

                                    {/* Delete Account Button */}
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
                                            <AnimateButton>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="large"
                                                    onClick={handleClickOpen}
                                                    disabled={loading}
                                                >
                                                    Delete Account
                                                </Button>
                                            </AnimateButton>
                                        </Box>
                                    </Grid>

                                    {/* Confirmation Dialog */}
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{'Confirm Account Deletion'}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure you want to delete your account? This action is irreversible.
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={handleDelete} color="error" autoFocus>
                                                {loading ? 'Deleting...' : 'Confirm Delete'}
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
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
