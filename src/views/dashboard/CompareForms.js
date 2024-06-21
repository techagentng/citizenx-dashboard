import { useDispatch } from 'store';
import { useState } from 'react';
// material-ui
import { Button, Grid, Stack, TextField } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
// import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';
import { Autocomplete, Box, InputAdornment } from '@mui/material';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createFilterOptions } from '@mui/material/Autocomplete';
import SubCard from 'ui-component/cards/SubCard';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// assets
// import LinkIcon from '@mui/icons-material/Link';
const filter = createFilterOptions();
const filter2 = createFilterOptions();
const filter3 = createFilterOptions();
/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required')
});
const roles = ['User', 'Admin', 'Staff', 'Manager'];
// ==============================|| FORM VALIDATION - LOGIN FORMIK ||============================== //

const LoginForms = () => {
    const dispatch = useDispatch();
    const [valueBasic, setValueBasic] = useState(new Date());
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

    return (
        <MainCard title="Incident information">
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={gridSpacing} direction="column">
                            <Grid item xs={12}>
                                <Autocomplete
                                    fullWidth
                                    value={formik.values.role}
                                    disableClearable
                                    onChange={(event, newValue) => {
                                        const jobExist = roles.includes(newValue);
                                        if (!jobExist) {
                                            const matchData = newValue.match(/"((?:\\.|[^"\\])*)"/);
                                            formik.setFieldValue('role', matchData && matchData[1]);
                                        } else {
                                            formik.setFieldValue('role', newValue);
                                        }
                                    }}
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
                                    id="free-solo-with-text-demo"
                                    options={roles}
                                    getOptionLabel={(option) => {
                                        let value = option;
                                        const jobExist = roles.includes(option);
                                        if (!jobExist) {
                                            const matchData = option.match(/"((?:\\.|[^"\\])*)"/);
                                            if (matchData && matchData[1]) value = matchData && matchData[1];
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
                                            error={formik.touched.role && Boolean(formik.errors.role)}
                                            helperText={formik.touched.role && formik.errors.role && formik.errors.role}
                                            placeholder="Select Role"
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
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    fullWidth
                                    value={formik.values.role}
                                    disableClearable
                                    onChange={(event, newValue) => {
                                        const jobExist = roles.includes(newValue);
                                        if (!jobExist) {
                                            const matchData = newValue.match(/"((?:\\.|[^"\\])*)"/);
                                            formik.setFieldValue('role', matchData && matchData[1]);
                                        } else {
                                            formik.setFieldValue('role', newValue);
                                        }
                                    }}
                                    filterOptions={(options, params) => {
                                        const filtered = filter2(options, params);
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
                                    options={roles}
                                    getOptionLabel={(option) => {
                                        let value = option;
                                        const jobExist = roles.includes(option);
                                        if (!jobExist) {
                                            const matchData = option.match(/"((?:\\.|[^"\\])*)"/);
                                            if (matchData && matchData[1]) value = matchData && matchData[1];
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
                                            error={formik.touched.role && Boolean(formik.errors.role)}
                                            helperText={formik.touched.role && formik.errors.role && formik.errors.role}
                                            placeholder="Select Role"
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
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    fullWidth
                                    value={formik.values.role}
                                    disableClearable
                                    onChange={(event, newValue) => {
                                        const jobExist = roles.includes(newValue);
                                        if (!jobExist) {
                                            const matchData = newValue.match(/"((?:\\.|[^"\\])*)"/);
                                            formik.setFieldValue('role', matchData && matchData[1]);
                                        } else {
                                            formik.setFieldValue('role', newValue);
                                        }
                                    }}
                                    filterOptions={(options, params) => {
                                        const filtered = filter3(options, params);
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
                                    options={roles}
                                    getOptionLabel={(option) => {
                                        let value = option;
                                        const jobExist = roles.includes(option);
                                        if (!jobExist) {
                                            const matchData = option.match(/"((?:\\.|[^"\\])*)"/);
                                            if (matchData && matchData[1]) value = matchData && matchData[1];
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
                                            error={formik.touched.role && Boolean(formik.errors.role)}
                                            helperText={formik.touched.role && formik.errors.role && formik.errors.role}
                                            placeholder="Select Role"
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
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction="row" justifyContent="flex-end">
                                    <AnimateButton>
                                        <Button variant="contained" type="submit">
                                            Verify & Submit
                                        </Button>
                                    </AnimateButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <SubCard title="Basic Datetime Picker">
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
                                </SubCard>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default LoginForms;
