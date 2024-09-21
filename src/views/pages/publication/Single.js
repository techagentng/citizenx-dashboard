import { Box, CardMedia, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import useConfig from 'hooks/useConfig';
import Avatar from 'ui-component/extended/Avatar';

import Cover from 'assets/images/profile/img-profile-bg.png';
import User1 from 'assets/images/users/img-user.png';

import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import axiosServices from 'utils/axios';
import JWTContext from 'contexts/JWTContext';

const apiUrl = "http://localhost:5000";

const Single = () => {
    const { user } = useContext(JWTContext);
    const location = useLocation();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { borderRadius } = useConfig();
    const postId = location.pathname.split("/")[2];

    // useEffect(() => {
    //     const fetchPost = async () => {
    //         try {
    //             const response = await axiosServices.get(`${apiUrl}/post/${postId}`);
    //             setPost(response.data);
    //         } catch (error) {
    //             console.error('Failed to fetch post:', error);
    //             setError('Failed to fetch post data.');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (postId) {
    //         fetchPost();
    //     }
    // }, [postId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent
    }

    const canEditOrDelete = user && user.username === post?.author;

    return (
        <Container>
            <Grid container>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <img src={post ? `../assets/upload/${post.post_img}` : Cover} height='400px' />
                            <CardMedia
                                component="img"
                                image={post ? `${apiUrl}/uploads/${post.post_img}` : Cover}
                                sx={{ borderRadius: `${borderRadius}px`, overflow: 'hidden', mb: 3 }}
                                alt="post cover"
                            />
                            
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Stack direction='row'>
                                    <Avatar
                                        alt="User Avatar"
                                        src={User1}
                                        sx={{ width: { xs: 52, sm: 80, md: 100 }, height: { xs: 52, sm: 80, md: 100 } }}
                                    />
                                    <Stack>
                                        <Typography align="left" variant="h5" component="div">
                                            {user ? user.username : post.author}
                                        </Typography>
                                        <Typography align="left" variant="caption">
                                            <FiberManualRecordIcon sx={{ width: '10px', height: '10px', opacity: 0.5, m: '0 5px' }} />
                                            {new Date(post.date_created).toLocaleDateString()}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                {canEditOrDelete && (
                                    <Stack>
                                        <Link to={`/edit/${postId}`} > edit</Link>
                                        <IconButton aria-label="edit" color="primary" size="large">
                                            <EditNoteRoundedIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" color="error" size="large">
                                            <DeleteRoundedIcon />
                                        </IconButton>
                                    </Stack>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <Typography variant='h3'>{post.title}</Typography>
                                <Typography variant='body'>{getText(post.body)}</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}></Grid>
            </Grid>
        </Container>
    );
};

export default Single;
