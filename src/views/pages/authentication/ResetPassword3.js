import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { useDispatch } from 'store';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { openSnackbar } from 'store/slices/snackbar';

const AuthResetPassword = ({ ...others }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{
                newPassword: '',
                confirmPassword: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                newPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('New password is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                    .required('Confirm password is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    // Handle reset password logic here
                    // await resetPassword(values.newPassword);

                    setStatus({ success: true });
                    setSubmitting(false);
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Password reset successful',
                            variant: 'alert',
                            alert: { color: 'success' },
                            close: false
                        })
                    );
                } catch (err) {
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    {/* New Password Field */}
                    <FormControl
                        fullWidth
                        error={Boolean(touched.newPassword && errors.newPassword)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-new-password">New Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-new-password"
                            type="password"
                            value={values.newPassword}
                            name="newPassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="New Password"
                        />
                        {touched.newPassword && errors.newPassword && (
                            <FormHelperText error id="helper-text-new-password">
                                {errors.newPassword}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {/* Confirm Password Field */}
                    <FormControl
                        fullWidth
                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-confirm-password"
                            type="password"
                            value={values.confirmPassword}
                            name="confirmPassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Confirm Password"
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                            <FormHelperText error id="helper-text-confirm-password">
                                {errors.confirmPassword}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {/* Submission Error */}
                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}

                    {/* Submit Button */}
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button
                                disableElevation
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                Reset Passwordxx
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default AuthResetPassword;
