import React, { useState, useEffect } from 'react';
import { Avatar, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import useAuth from 'hooks/useAuth';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { uploadProfileImage } from 'services/userService'; // Add getProfileImage
import Avatarr from 'ui-component/extended/Avatar';
const Profile = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [avatarSrc, setAvatarSrc] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            if (user.profileImage) {
                const profileImagePath = user.profileImage; // e.g., "./uploadImage/27_cx-logo.png"

                const fullImageUrl = `${process.env.REACT_APP_API_URL}/${profileImagePath}`;
                setAvatarSrc(fullImageUrl);
                console.log(fullImageUrl);
            } else {
                // Optionally, set a default avatar here if profileImage is not available
                setAvatarSrc(Avatarr);
            }
        }
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadClick = () => {
        if (selectedFile) {
            uploadProfileImage(selectedFile)
                .then((response) => {
                    console.log(response);
                    // Optionally, update the avatarSrc to the new uploaded file
                    setAvatarSrc(URL.createObjectURL(selectedFile));
                })
                .catch((error) => {
                    console.error('Upload failed:', error);
                });
        } else {
            console.warn('No file selected');
        }
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item sm={6} md={4}>
                <SubCard title="Profile Picture" contentSX={{ textAlign: 'center' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Avatar alt="User 1" src={avatarSrc} sx={{ width: 100, height: 100, margin: '0 auto' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" align="center">
                                Upload/Change Your Profile Image
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="file-input" />
                            <AnimateButton>
                                <label htmlFor="file-input">
                                    <Button variant="contained" size="small" component="span" onClick={handleUploadClick}>
                                        Choose and Upload Avatar
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
                        <Grid item xs={12}>
                            <TextField id="outlined-basic1" fullWidth label="Name" defaultValue={user?.name} helperText="Helper text" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic6" fullWidth label="Email address" defaultValue="name@example.com" />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField id="outlined-basic4" fullWidth label="Company" defaultValue="Materially Inc." />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField id="outlined-basic5" fullWidth label="Country" defaultValue="USA" />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField id="outlined-basic7" fullWidth label="Phone number" defaultValue="4578-420-410 " />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField id="outlined-basic8" fullWidth label="Birthday" defaultValue="31/01/2001" />
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row">
                                <AnimateButton>
                                    <Button variant="contained">Change Details</Button>
                                </AnimateButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default Profile;
