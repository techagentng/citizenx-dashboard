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
                console.log('Form values:', values);
                // Simulate API call
                setTimeout(() => {
                    alert('Password reset successful!');
                    setSubmitting(false);
                }, 1000);
            }}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="newPassword">New Password</label>
                        <Field
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter your new password"
                        />
                        {errors.newPassword && touched.newPassword && (
                            <div style={{ color: 'red' }}>{errors.newPassword}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Field
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your new password"
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                            <div style={{ color: 'red' }}>{errors.confirmPassword}</div>
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
