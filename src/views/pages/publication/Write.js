import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// material ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Stack, Typography, FormGroup, FormControlLabel, Checkbox, TextField, Container, Box } from '@mui/material';
// Project 
import ReactQuillDemo from './forms/ReactQuill';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { ArrowUpward } from '@mui/icons-material';
// utils
import axiosServices from 'utils/axios';
import JWTContext from 'contexts/JWTContext';
import { useDispatch } from 'react-redux';
import { openSnackbar } from 'store/slices/snackbar';

const apiUrl = "https://citizenx-dashboard-sbqx.onrender.com/api/v1";

const categories = [
    { name: 'crime', label: 'Crime' },
    { name: 'politics', label: 'Politics' },
    { name: 'entertainment', label: 'Entertainment' },
    { name: 'trasnport', label: 'Transport' },
    { name: 'foodstuff', label: 'Foodstuff' },
    { name: 'religion', label: 'Religion' },
];

const Write = () => {
    const theme = useTheme();
    const { user } = useContext(JWTContext);
    const {postId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);
    // Check Edit Mode
    const [isEditMode, setIsEditMode] = useState(false);    

    useEffect(() => {
        if (!user) {
            console.log("User is not logged in");
        }
        if (postId) {
            fetchPost();
        }
    }, [user, postId]);

    // Fetch Post
    const fetchPost= async()=>{
        try {
            const response = await axiosServices.get(`${apiUrl}/posts/create/${postId}`);            
            const post = response.data;
            setTitle(post.title);
            setValue(post.post_description);
            setCat(post.post_category.split(', '));
            setIsEditMode(true);
            console.log('my titless', title, value, cat)
        } catch (error) {
            console.error('Failed to fetch post:', error);
        }
    };

    // Upload Image
    // const UploadFile = async () => {
    //     try {
    //         const formData = new FormData();
    //         formData.append("file", file);
    //         const res = await axiosServices.post(`${apiUrl}/upload`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         return res.data;
    //     } catch (error) {
    //         console.log('Failed to Upload File:', error);
    //         dispatch(
    //             openSnackbar({
    //                 open: true,
    //                 message: 'Failed to upload file.',
    //                 variant:'alert',
    //                 alert:{
    //                     color: 'error'
    //                 },
    //                 close: true, 
    //             })
    //         );
    //         navigate('/publication');
    //     }
    // };


    const handleCategoryChange = (event) => {
        const categoryName = event.target.name;
        if (event.target.checked) {
            setCat([...cat, categoryName]);
        } else {
            setCat(cat.filter(item => item !== categoryName));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const post_img = file ? await UploadFile() : '';
            const payload = {
                title,
                body: value,
                author: user.username,
                post_img,
                category: cat.join(', '),
            };
            const response = isEditMode 
                    ? await axiosServices.post(`${apiUrl}/post/${postId}/edit`, payload, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('serviceToken')}`
                }
            }) 
            : await axiosServices.post(`${apiUrl}/post/create`, payload, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('serviceToken')}`
                }
            });
            console.log('Publication ${isEditMode ? `Edited` : `Created`}:', response.data);
            dispatch(
                openSnackbar({
                    open: true,
                    message: `Publication ${isEditMode ? 'updated' : 'created'} successfully!`,
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true,
                })
            );
        } catch (error) {
            console.error(`Failed to ${isEditMode ? 'update' : 'create'} post:`, error);
            
            dispatch(
                openSnackbar({
                    open: true,
                    message: `Failed to ${isEditMode ? 'update' : 'create'} post, try aain:`,
                    variant:'alert',
                    alert:{
                        color: 'error'
                    },
                    close: true, 
                })
            );
        }
    };


    return (
        <Box>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={8}>
                    <Stack spacing={gridSpacing}
                        sx={{
                            '& .quill': {
                                bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50',
                                borderRadius: '12px',
                                '& .ql-toolbar': {
                                    bgcolor: theme.palette.mode === 'dark' ? 'dark.light' : 'grey.100',
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : 'primary.light',
                                    borderTopLeftRadius: '12px',
                                    borderTopRightRadius: '12px'
                                },
                                '& .ql-container': {
                                    borderColor:
                                        theme.palette.mode === 'dark' ? `${theme.palette.dark.light + 20} !important` : 'primary.light',
                                    borderBottomLeftRadius: '12px',
                                    borderBottomRightRadius: '12px',
                                    '& .ql-editor': {
                                        minHeight: 500
                                    }
                                }
                            }
                        }}>
                        <Typography variant="h2">{isEditMode ? "Edit Publication" : "Add New Publication"}</Typography>
                        <TextField
                            fullWidth
                            id="outlined-default-email-address"
                            placeholder="Enter Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <ReactQuillDemo
                            value={value}
                            onChange={setValue}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={4} paddingX={3}>
                    <Stack>
                        <MainCard title="Publish">
                            <Stack spacing={3}>
                                <span>
                                    <b>Status:</b> Draft
                                </span>
                                <span>
                                    <b>Visibility:</b> Public
                                </span>
                            </Stack>
                            <Stack direction="row" mt={5} justifyContent='space-between'>
                                <Button variant="contained">Save as draft</Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        background: theme.palette.success.dark,
                                        '&:hover': { background: theme.palette.success.main }
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Publish
                                </Button>
                            </Stack>
                        </MainCard>
                        <MainCard title="Publication Image">
                            <Stack direction="row" ml={-2} spacing={2} alignItems="center">
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="upload-button-file"
                                    type="file"
                                    onChange={e => setFile(e.target.files[0])}
                                />
                                <label htmlFor="upload-button-file" style={{ backgroundColor: '#1976d2', color: '#fff' }}>
                                     <Button
                                        variant="contained"
                                        color="primary"
                                        component="span"
                                        startIcon={<ArrowUpward />}
                                    >
                                        Add image for Product
                                    </Button>
                                </label>
                            </Stack>
                        </MainCard>
                        <MainCard title="Categories">
                        <FormGroup>
                            {categories.map((category, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            name={category.name}
                                            onChange={handleCategoryChange}
                                            checked={cat.includes(category.name)} // Check if the category is included in the current state
                                        />
                                    }
                                    label={category.label}
                                />
                            ))}
                        </FormGroup>
                        </MainCard>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Write;
