import React from 'react';
import { Container, Typography } from '@mui/material';
import AppBar from 'ui-component/extended/AppBar';

function Terms() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <AppBar />
            <Typography variant="h1" align="center" gutterBottom sx={{ mt: 16 }}>
                CitizenX Nigeria Privacy Policy
            </Typography>
            <Typography paragraph>
                At CitizenX Nigeria, we are committed to protecting your privacy and ensuring the security of your personal information.
                This Privacy Policy outlines how we collect, use, and safeguard the data you provide to us when using the CitizenX platform.
                By using our app and services, you agree to the terms outlined in this policy.
            </Typography>
            <Typography variant="h6" gutterBottom>
                1. Information We Collect
            </Typography>
            <Typography paragraph>
                · Personal Information: When you register, we may collect information such as your name, email address, phone number, and
                location.
            </Typography>
            <Typography paragraph>
                · Device Information: We may collect data about the device you use to access our app, including your IP address, browser
                type, and operating system.
            </Typography>
            <Typography paragraph>
                · Location Data: To improve the accuracy of incident reports, we may collect and use your location data if you grant
                permission for location services.
            </Typography>
            <Typography paragraph>
                · User-Generated Content: Any content you post, report, or share on the CitizenX platform, including text, images, and
                videos, will be collected and stored.
            </Typography>
            <Typography variant="h6" gutterBottom>
                2. How We Use Your Information
            </Typography>
            <Typography paragraph>· Facilitate incident reporting and allow you to interact with your local government.</Typography>
            <Typography paragraph>· Provide you with personalized features and services within the CitizenX app and dashboard.</Typography>
            <Typography paragraph>· Improve and analyze the performance of our platform and services.</Typography>
            <Typography paragraph>· Communicate with you about updates, features, or changes to our services.</Typography>
            <Typography paragraph>
                · Ensure the safety and security of the platform by detecting and preventing fraudulent or illegal activities.
            </Typography>
            <Typography variant="h6" gutterBottom>
                3. Sharing Your Information
            </Typography>
            <Typography paragraph>
                We do not sell or share your personal information with third parties for their marketing purposes. However, we may share
                your data in the following instances:
            </Typography>
            <Typography paragraph>· With local authorities or government bodies to help resolve reported incidents.</Typography>
            <Typography paragraph>
                · With third-party service providers who help us deliver our services (e.g., data storage, analytics).
            </Typography>
            <Typography paragraph>· When required by law or in response to legal processes.</Typography>
            <Typography variant="h6" gutterBottom>
                4. Data Security
            </Typography>
            <Typography paragraph>
                We take the security of your information seriously and use appropriate measures to protect it from unauthorized access,
                alteration, or disclosure. While we strive to safeguard your data, no method of transmission over the internet or electronic
                storage is 100% secure.
            </Typography>
            <Typography variant="h6" gutterBottom>
                5. Your Data Rights
            </Typography>
            <Typography paragraph>You have the right to:</Typography>
            <Typography paragraph>· Access and review the personal information we hold about you.</Typography>
            <Typography paragraph>· Request corrections to inaccurate or incomplete information.</Typography>
            <Typography paragraph>· Request deletion of your personal data, subject to legal obligations.</Typography>
            <Typography paragraph>· Opt-out of receiving non-essential communications from us.</Typography>
            <Typography paragraph>To exercise any of these rights, please contact us at [admin@citizenx.ng].</Typography>
            <Typography variant="h6" gutterBottom>
                6. Cookies and Tracking
            </Typography>
            <Typography paragraph>
                CitizenX Nigeria uses cookies and similar tracking technologies to enhance user experience and analyze app performance. You
                can control the use of cookies through your browser settings.
            </Typography>
            <Typography variant="h6" gutterBottom>
                7. Changes to This Privacy Policy
            </Typography>
            <Typography paragraph>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. We will notify
                you of any significant changes by posting the updated policy on our app and website.
            </Typography>
            <Typography variant="h6" gutterBottom>
                8. Contact Us
            </Typography>
            <Typography paragraph>
                If you have any questions or concerns regarding this Privacy Policy or your personal data, please contact us at:
            </Typography>
            <Typography paragraph>Email: admin@citizenx.ng</Typography>
            <Typography paragraph>Address: 11 Herbert Macaulay Crescent GRA Ikeja, Lagos, Nigeria.</Typography>
            <Typography paragraph align="center" sx={{ mt: 4 }}>
                By continuing to use CitizenX Nigeria, you acknowledge that you have read and understood this Privacy Policy and agree to
                the collection and use of your information as described.
            </Typography>
        </Container>
    );
}

export default Terms;
