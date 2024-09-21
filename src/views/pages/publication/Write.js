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
// import axiosServices from 'utils/axios';
import JWTContext from 'contexts/JWTContext';
// import { useDispatch } from 'react-redux';
// import { openSnackbar } from 'store/slices/snackbar';

const apiUrl = "http://localhost:5000";

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
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

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

   

    const handleCategoryChange = (event) => {
        const categoryName = event.target.name;
        if (event.target.checked) {
            setCat([...cat, categoryName]);
        } else {
            setCat(cat.filter(item => item !== categoryName));
        }
    };

    const handleSubmit = ()=>{
        console.log("submit")
    }


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
