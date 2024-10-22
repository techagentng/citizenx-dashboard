import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import AppBar from 'ui-component/extended/AppBar';
function PrivacyPolicy() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <AppBar />
            <Typography variant="h3" align="center" gutterBottom>
                CitizenX Privacy Policy
            </Typography>
            <Typography paragraph>
                At CitizenX, we are committed to protecting your privacy and ensuring the security of your personal information. This
                Privacy Policy outlines how we collect, use, and safeguard the data you provide when using the CitizenX platform. By using
                our app and services, you agree to the terms outlined in this policy.
            </Typography>

            <Typography variant="h5" gutterBottom>
                1. Information We Collect
            </Typography>
            <Typography paragraph>We collect the following types of information to provide, improve, and protect our services:</Typography>
            <Box sx={{ mb: 3 }}>
                <ul>
                    <li>
                        <Typography>
                            <strong>Personal Information:</strong> When you register, we may collect information such as your name, email
                            address, phone number, and location.
                        </Typography>
                    </li>
                    <li>
                        <Typography>
                            <strong>Device Information:</strong> We may collect data about the device you use to access our app, including
                            your IP address, browser type, and operating system.
                        </Typography>
                    </li>
                    <li>
                        <Typography>
                            <strong>Location Data:</strong> To improve the accuracy of incident reports, we may collect and use your
                            location data if you grant permission for location services.
                        </Typography>
                    </li>
                    <li>
                        <Typography>
                            <strong>User-Generated Content:</strong> Any content you post, report, or share on the CitizenX platform,
                            including text, images, and videos, will be collected and stored.
                        </Typography>
                    </li>
                </ul>
            </Box>

            <Typography variant="h5" gutterBottom>
                2. How We Use Your Information
            </Typography>
            <Typography paragraph>We use the information we collect to:</Typography>
            <Box sx={{ mb: 3 }}>
                <ul>
                    <li>
                        <Typography>• Facilitate incident reporting and enable interaction with your local government.</Typography>
                    </li>
                    <li>
                        <Typography>
                            • Provide you with personalized features and services within the CitizenX app and dashboard.
                        </Typography>
                    </li>
                    <li>
                        <Typography>• Improve and analyze the performance of our platform and services.</Typography>
                    </li>
                    <li>
                        <Typography>• Communicate with you about updates, features, or changes to our services.</Typography>
                    </li>
                    <li>
                        <Typography>
                            • Ensure the safety and security of the platform by detecting and preventing fraudulent or illegal activities.
                        </Typography>
                    </li>
                </ul>
            </Box>

            <Typography variant="h5" gutterBottom>
                3. Sharing Your Information
            </Typography>
            <Typography paragraph>
                We do not sell or share your personal information with third parties for their marketing purposes. However, we may share
                your data in the following instances:
            </Typography>
            <Box sx={{ mb: 3 }}>
                <ul>
                    <li>
                        <Typography>• With local authorities or government bodies to help resolve reported incidents.</Typography>
                    </li>
                    <li>
                        <Typography>
                            • With third-party service providers who help us deliver our services (e.g., data storage, analytics).
                        </Typography>
                    </li>
                    <li>
                        <Typography>• When required by law or in response to legal processes.</Typography>
                    </li>
                </ul>
            </Box>

            <Typography variant="h5" gutterBottom>
                4. Data Security
            </Typography>
            <Typography paragraph>
                We take the security of your information seriously and use appropriate measures to protect it from unauthorized access,
                alteration, or disclosure. While we strive to safeguard your data, no method of transmission over the internet or electronic
                storage is 100% secure.
            </Typography>

            <Typography variant="h5" gutterBottom>
                5. Your Data Rights
            </Typography>
            <Typography paragraph>You have the right to:</Typography>
            <Box sx={{ mb: 3 }}>
                <ul>
                    <li>
                        <Typography>• Access and review the personal information we hold about you.</Typography>
                    </li>
                    <li>
                        <Typography>• Request corrections to inaccurate or incomplete information.</Typography>
                    </li>
                    <li>
                        <Typography>• Request the deletion of your personal data, subject to legal obligations.</Typography>
                    </li>
                    <li>
                        <Typography>• Opt out of receiving non-essential communications from us.</Typography>
                    </li>
                </ul>
            </Box>
            <Typography paragraph>To exercise any of these rights, please contact us at admin@citizenx.ng.</Typography>

            <Typography variant="h5" gutterBottom>
                6. Cookies and Tracking
            </Typography>
            <Typography paragraph>
                CitizenX uses cookies and similar tracking technologies to enhance user experience and analyze app performance. You can
                control the use of cookies through your browser settings.
            </Typography>

            <Typography variant="h5" gutterBottom>
                7. Changes to This Privacy Policy
            </Typography>
            <Typography paragraph>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. We will notify
                you of any significant changes by posting the updated policy on our app and website.
            </Typography>

            <Typography variant="h5" gutterBottom>
                8. Contact Us
            </Typography>
            <Typography paragraph>
                If you have any questions or concerns regarding this Privacy Policy or your personal data, please contact us at:
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Typography>Email: admin@citizenx.ng</Typography>
                <Typography>Address: 11 Herbert Macaulay Crescent, GRA Ikeja, Lagos, Nigeria</Typography>
            </Box>
            <Typography paragraph>
                By continuing to use CitizenX, you acknowledge that you have read and understood this Privacy Policy and agree to the
                collection and use of your information as described.
            </Typography>
        </Container>
    );
}

export default PrivacyPolicy;
