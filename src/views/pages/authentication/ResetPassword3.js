import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ResetPasswordForm = () => {
    return (
        <Formik
            initialValues={{
                newPassword: '',
                confirmPassword: ''
            }}
            validationSchema={Yup.object().shape({
                newPassword: Yup.string()
                    .min(8, 'Password must be at least 8 characters')
                    .required('New password is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                    .required('Confirm password is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                const payload = { newPassword: values.newPassword };

                // Simulate API call
                fetch('/api/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Failed to reset password');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        alert('Password reset successful!');
                        console.log('Server Response:', data);
                    })
                    .catch((error) => {
                        alert('Error resetting password: ' + error.message);
                        console.error(error);
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            }}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="newPassword">New Password</label>
                        <Field
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter your new password"
                            aria-describedby="newPasswordError"
                        />
                        {errors.newPassword && touched.newPassword && (
                            <div
                                id="newPasswordError"
                                style={{ color: 'red', marginTop: '0.5rem' }}
                            >
                                {errors.newPassword}
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Field
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your new password"
                            aria-describedby="confirmPasswordError"
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                            <div
                                id="confirmPasswordError"
                                style={{ color: 'red', marginTop: '0.5rem' }}
                            >
                                {errors.confirmPassword}
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Reset Password'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ResetPasswordForm;
