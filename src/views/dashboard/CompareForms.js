import { useDispatch } from 'store';
import { useState } from 'react';
// material-ui
import { Button, Grid, Stack, TextField, Typography, IconButton } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
// import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
// import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';
import { Autocomplete, Box, InputAdornment } from '@mui/material';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createFilterOptions } from '@mui/material/Autocomplete';
// import SubCard from 'ui-component/cards/SubCard';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CompareBarChart from './compareBarChart';
import DeleteIcon from '@mui/icons-material/Delete';
// import { getStateReportCounts } from './../../services/reportService';
// assets
// import LinkIcon from '@mui/icons-material/Link';
// const filter = createFilterOptions();
// const filter2 = createFilterOptions();
const filter = createFilterOptions();
/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required')
});
const states = ['Abia', 'Ondo', 'Lagos', 'Osun'];
const reportTypes = [
    'Crime',
    'Fake Products:',
    'Roads',
    'Hospitals',
    'Accidents',
    'Schools',
    'Power',
    'Portable Water',
    'Petrol',
    'Airports',
    'Transport',
    'Embassies',
    'Corruption',
    'Elections',
    'Environment',
    'Healthcare',
    'Employment',
    'Social Welfare',
    'Technology',
    'Trade and Commerce',
    'Community Development'
];
// const roles2 = ['User', 'Admin', 'Staff', 'Manager'];
// const roles3 = ['User', 'Admin', 'Staff', 'Manager'];
// ==============================|| FORM VALIDATION - LOGIN FORMIK ||============================== //
// const [reportVCounts, setVReportCounts] = useState([]);
// const [errorV, setVError] = useState(null);

// const fetchReportCounts = () => {
//     const criteria = {
//         report_type_category: "Election",
//         states: ["Lagos", "Ondo"]
//     };

//     getStateReportCounts(criteria)
//         .then((data) => {
//             setVReportCounts(data);
//         })
//         .catch((err) => {
//             setVError(err.message);
//         });
// };

const CompareForms = () => {
    const dispatch = useDispatch();
    const [valueBasic, setValueBasic] = useState(new Date());
    const [compare, setCompare] = useState([{ id: Date.now(), role: '' }]);
    const [reportTypeInputs, setReportTypeInputs] = useState([{ id: Date.now(), type: '' }]);

    const handleAddReportTypeInput = () => {
        if (reportTypeInputs.length < 4) {
            setReportTypeInputs([...reportTypeInputs, { id: Date.now(), type: '' }]);
        }
    };

    const handleReportTypeChange = (index, newValue) => {
        const updatedInputs = reportTypeInputs.map((input, i) => (i === index ? { ...input, type: newValue } : input));
        setReportTypeInputs(updatedInputs);
    };

    const handleAddInput = () => {
        setCompare([...compare, { id: Date.now(), role: '' }]);
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: () => {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Submit Success',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
        }
    });

    const handleDeleteReportTypeInput = (index) => {
        const updatedInputs = reportTypeInputs.filter((_, i) => i !== index);
        setReportTypeInputs(updatedInputs);
    };

    const handleDeleteCompareInput = (id) => {
        const updatedCompare = compare.filter((input) => input.id !== id);
        setCompare(updatedCompare);
    };

    return (
        <MainCard>
            <form onSubmit={formik.handleSubmit}>
                <Grid container md={12} spacing={gridSpacing}>
                    <Grid item md={6} spacing={gridSpacing}>
                        <Grid item sx={12} md={6}>
                            <Typography variant="h4" component="h2">
                                Compare state data
                            </Typography>
                            {reportTypeInputs.map((input, index) => (
                                <Grid item xs={12} key={input.id} sx={{ mt: 2 }}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Autocomplete
                                            fullWidth
                                            value={input.type}
                                            disableClearable
                                            onChange={(event, newValue) => handleReportTypeChange(index, newValue)}
                                            filterOptions={(options, params) => {
                                                const filtered = filter(options, params);
                                                const { inputValue } = params;
                                                const isExisting = options.some((option) => inputValue === option);
                                                if (inputValue !== '' && !isExisting) {
                                                    filtered.push(`Add "${inputValue}"`);
                                                }
                                                return filtered;
                                            }}
                                            selectOnFocus
                                            clearOnBlur
                                            autoHighlight
                                            handleHomeEndKeys
                                            id={`free-solo-with-text-demo-${input.id}`}
                                            options={reportTypes}
                                            getOptionLabel={(option) => {
                                                let value = option;
                                                const jobExist = reportTypes.includes(option);
                                                if (!jobExist) {
                                                    const matchData = option.match(/"((?:\\.|[^"\\])*)"/);
                                                    if (matchData && matchData[1]) value = matchData[1];
                                                }
                                                return value;
                                            }}
                                            renderOption={(props, option) => (
                                                <Box component="li" {...props}>
                                                    {option}
                                                </Box>
                                            )}
                                            freeSolo
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    name={`role-${index}`}
                                                    error={formik.touched.role && Boolean(formik.errors.role)}
                                                    helperText={formik.touched.role && formik.errors.role && formik.errors.role}
                                                    placeholder="Select Report Type"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        sx: { bgcolor: 'grey.0' },
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <ArrowDropDown sx={{ color: 'text.primary' }} />
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            )}
                                        />
                                        <IconButton aria-label="delete" onClick={() => handleDeleteReportTypeInput(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </Grid>
                            ))}
                            <Grid item xs={12} sx={{ mt: 1 }}>
                                <Stack direction="row" justifyContent="flex-start">
                                    <AnimateButton>
                                        <Button
                                            variant="outlined"
                                            startIcon={<ControlPointIcon />}
                                            onClick={handleAddReportTypeInput}
                                            sx={{
                                                mt: 1,
                                                mb: 1,
                                                borderRadius: '8px',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                                }
                                            }}
                                        >
                                            Add Report Type
                                        </Button>
                                    </AnimateButton>
                                </Stack>
                            </Grid>
                        </Grid>

                        <Grid container spacing={gridSpacing}>
                            {compare.map((input) => (
                                <Grid item xs={12} md={6} sx={{ mt: 1 }} key={input.id}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Autocomplete
                                            fullWidth
                                            value={input.role}
                                            disableClearable
                                            onChange={(event, newValue) => {
                                                const updatedCompare = compare.map((inp) =>
                                                    inp.id === input.id ? { ...inp, role: newValue } : inp
                                                );
                                                setCompare(updatedCompare);
                                            }}
                                            filterOptions={(options, params) => {
                                                const filtered = createFilterOptions()(options, params);
                                                const { inputValue } = params;
                                                const isExisting = options.some((option) => inputValue === option);
                                                if (inputValue !== '' && !isExisting) {
                                                    filtered.push(`Add "${inputValue}"`);
                                                }
                                                return filtered;
                                            }}
                                            selectOnFocus
                                            clearOnBlur
                                            autoHighlight
                                            handleHomeEndKeys
                                            id="free-solo-with-text-demo"
                                            options={states}
                                            getOptionLabel={(option) => {
                                                let value = option;
                                                const jobExist = states.includes(option);
                                                if (!jobExist) {
                                                    const matchData = option.match(/"((?:\\.|[^"\\])*)"/);
                                                    if (matchData && matchData[1]) value = matchData[1];
                                                }
                                                return value;
                                            }}
                                            renderOption={(props, option) => (
                                                <Box component="li" {...props}>
                                                    {option}
                                                </Box>
                                            )}
                                            freeSolo
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    name="role"
                                                    placeholder="Select State"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        sx: { bgcolor: 'grey.0' },
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <ArrowDropDown sx={{ color: 'text.primary' }} />
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            )}
                                        />
                                        <IconButton aria-label="delete" onClick={() => handleDeleteCompareInput(input.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>

                        <Grid item sx={{ mt: 2 }}>
                            <Stack direction="row" justifyContent="flex-start">
                                <AnimateButton>
                                    <Button
                                        variant="outlined"
                                        type="submit"
                                        startIcon={<ControlPointIcon />}
                                        onClick={handleAddInput}
                                        sx={{
                                            mb: 1,
                                            borderRadius: '8px',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                            }
                                        }}
                                    >
                                        Add state
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        </Grid>
                    </Grid>

                    <Grid item md={6} spacing={2}>
                        <Grid container spacing={2} direction="column">
                            <Grid item container spacing={2} direction="row">
                                <Grid item>
                                    <Typography variant="h5" gutterBottom>
                                        First DateTime
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            slotProps={{ textField: { fullWidth: true } }}
                                            label="Date & Time"
                                            value={valueBasic}
                                            onChange={(newValue) => {
                                                setValueBasic(newValue);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5" gutterBottom>
                                        Second Date
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            slotProps={{ textField: { fullWidth: true } }}
                                            label="Date & Time"
                                            value={valueBasic}
                                            onChange={(newValue) => {
                                                setValueBasic(newValue);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mt: 8 }}>
                                <Button variant="contained" color="secondary" sx={{ width: '50%', backgroundColor: '#0e9b66' }}>
                                    Compare
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container sx={{ mt: 2 }}>
                        <CompareBarChart />
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default CompareForms;
