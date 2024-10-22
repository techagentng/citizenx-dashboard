import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// material ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Stack, Typography, FormGroup, FormControlLabel, Checkbox, TextField, Box } from '@mui/material';
<<<<<<< HEAD
// Project 
=======
// Project
>>>>>>> upstream/main
import ReactDraftWysiwyg from './forms/ReactDraftWysiwyg';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { ArrowUpward } from '@mui/icons-material';
// utils
import axiosServices from 'utils/axios';
import JWTContext from 'contexts/JWTContext';
import { useDispatch } from 'react-redux';
import { openSnackbar } from 'store/slices/snackbar';

<<<<<<< HEAD
const apiUrl = "https://citizenx-9hk2.onrender.com/api/v1";
=======
const apiUrl = 'https://citizenx-9hk2.onrender.com/api/v1';
>>>>>>> upstream/main

const categories = [
    { name: 'crime', label: 'Crime' },
    { name: 'politics', label: 'Politics' },
    { name: 'entertainment', label: 'Entertainment' },
    { name: 'trasnport', label: 'Transport' },
    { name: 'foodstuff', label: 'Foodstuff' },
<<<<<<< HEAD
    { name: 'religion', label: 'Religion' },
=======
    { name: 'religion', label: 'Religion' }
>>>>>>> upstream/main
];

const Write = () => {
    const theme = useTheme();
    const { user } = useContext(JWTContext);
<<<<<<< HEAD
    const {postId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);
    // Check Edit Mode
    const [isEditMode, setIsEditMode] = useState(false);    
=======
    const { postId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);
    // Check Edit Mode
    const [isEditMode, setIsEditMode] = useState(false);
>>>>>>> upstream/main

    useEffect(() => {
        const token = localStorage.getItem('serviceToken');
        if (!token) {
<<<<<<< HEAD
            console.log("User is not logged in");
        }else {
                console.log("User is Logged in");
            }
        if (postId) {
            fetchPost();
        }
    }, [user, postId]);

    // Fetch Post
    const fetchPost= async()=>{
        try {
            const response = await axiosServices.get(`${apiUrl}/posts/${postId}`);            
=======
            console.log('User is not logged in');
        } else {
            console.log('User is Logged in');
        }
        if (postId) {
            fetchPost();
        }
    }, [user, postId, fetchPost]);

    // Fetch Post
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchPost = async () => {
        try {
            const response = await axiosServices.get(`${apiUrl}/posts/${postId}`);
>>>>>>> upstream/main
            const post = response.data;
            setTitle(post.title);
            setValue(post.post_description);
            setCat(post.post_category.split(', '));
            setIsEditMode(true);
<<<<<<< HEAD
            console.log('my titless', title, value, cat)
=======
            console.log('my titless', title, value, cat);
>>>>>>> upstream/main
        } catch (error) {
            console.error('Failed to fetch post:', error);
        }
    };

<<<<<<< HEAD

=======
>>>>>>> upstream/main
    const handleCategoryChange = (event) => {
        const categoryName = event.target.name;
        if (event.target.checked) {
            setCat([...cat, categoryName]);
        } else {
<<<<<<< HEAD
            setCat(cat.filter(item => item !== categoryName));
=======
            setCat(cat.filter((item) => item !== categoryName));
>>>>>>> upstream/main
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that title, description, and category are filled
<<<<<<< HEAD
    if (!title.trim()) {
        console.error('Title is required');
        dispatch(
            openSnackbar({
                open: true,
                message: 'Title is required',
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                close: true,
            })
        );
        return;
    }

    if (!value.trim()) {
        console.error('Description is required');
        dispatch(
            openSnackbar({
                open: true,
                message: 'Description is required',
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                close: true,
            })
        );
        return;
    }

    if (cat.length === 0) {
        console.error('At least one category must be selected');
        dispatch(
            openSnackbar({
                open: true,
                message: 'At least one category must be selected',
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                close: true,
            })
        );
        return;
    }
=======
        if (!title.trim()) {
            console.error('Title is required');
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Title is required',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
            return;
        }

        if (!value.trim()) {
            console.error('Description is required');
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Description is required',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
            return;
        }

        if (cat.length === 0) {
            console.error('At least one category must be selected');
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'At least one category must be selected',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
            return;
        }
>>>>>>> upstream/main

        try {
            // FormData Objects
            const formData = new FormData();
            formData.append('title', title);
            formData.append('post_description', value);
            formData.append('post_category', cat.join(', '));

<<<<<<< HEAD
            if(file){
=======
            if (file) {
>>>>>>> upstream/main
                formData.append('postImage', file);
            }

            // Determine if the request is for creating or updating
<<<<<<< HEAD
            const apiEndpoint = isEditMode 
            ? `${apiUrl}/posts/${postId}/edit`
            : `${apiUrl}/posts/create`; 
            
=======
            const apiEndpoint = isEditMode ? `${apiUrl}/posts/${postId}/edit` : `${apiUrl}/posts/create`;

>>>>>>> upstream/main
            // Fetch Token
            const token = localStorage.getItem('serviceToken');
            const response = await axiosServices.post(apiEndpoint, formData, {
                headers: {
<<<<<<< HEAD
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'multipart/form-data' 
=======
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
>>>>>>> upstream/main
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
<<<<<<< HEAD
                    close: true,
                })
            );
            
=======
                    close: true
                })
            );

>>>>>>> upstream/main
            // Redirect user after successful post creation or update
            navigate('/publication');
        } catch (error) {
            console.error(`Failed to ${isEditMode ? 'update' : 'create'} post:`, error);
<<<<<<< HEAD
            
=======

>>>>>>> upstream/main
            dispatch(
                openSnackbar({
                    open: true,
                    message: `Failed to ${isEditMode ? 'update' : 'create'} post, try again:`,
<<<<<<< HEAD
                    variant:'alert',
                    alert:{
                        color: 'error'
                    },
                    close: true, 
=======
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
>>>>>>> upstream/main
                })
            );
        }
    };

<<<<<<< HEAD

=======
>>>>>>> upstream/main
    return (
        <Box>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={8}>
<<<<<<< HEAD
                    <Stack spacing={gridSpacing}
=======
                    <Stack
                        spacing={gridSpacing}
>>>>>>> upstream/main
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
<<<<<<< HEAD
                        }}>
                        <Typography variant="h2">{isEditMode ? "Edit Publication" : "Add New Publication"}</Typography>
=======
                        }}
                    >
                        <Typography variant="h2">{isEditMode ? 'Edit Publication' : 'Add New Publication'}</Typography>
>>>>>>> upstream/main
                        <TextField
                            fullWidth
                            id="outlined-default-email-address"
                            placeholder="Enter Title"
                            value={title}
<<<<<<< HEAD
                            onChange={e => setTitle(e.target.value)}
                        />
                        <ReactDraftWysiwyg
                            value={value}
                            onChange={setValue}
                        />
=======
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <ReactDraftWysiwyg value={value} onChange={setValue} />
>>>>>>> upstream/main
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
<<<<<<< HEAD
                            <Stack direction="row" mt={5} justifyContent='space-between'>
=======
                            <Stack direction="row" mt={5} justifyContent="space-between">
>>>>>>> upstream/main
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
<<<<<<< HEAD
                                    onChange={e => setFile(e.target.files[0])}
                                />
                                <label htmlFor="upload-button-file" style={{ backgroundColor: '#1976d2', color: '#fff' }}>
                                     <Button
                                        variant="contained"
                                        color="primary"
                                        component="span"
                                        startIcon={<ArrowUpward />}
                                    >
=======
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <label htmlFor="upload-button-file" style={{ backgroundColor: '#1976d2', color: '#fff' }}>
                                    <Button variant="contained" color="primary" component="span" startIcon={<ArrowUpward />}>
>>>>>>> upstream/main
                                        Add image for Product
                                    </Button>
                                </label>
                            </Stack>
                        </MainCard>
                        <MainCard title="Categories">
<<<<<<< HEAD
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
=======
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
>>>>>>> upstream/main
                        </MainCard>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Write;
