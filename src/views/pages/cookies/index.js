import React from 'react';
import { Container, Typography } from '@mui/material';
import AppBar from 'ui-component/extended/AppBar';

function Cookies() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <AppBar />
            <Typography variant="h1" align="center" gutterBottom sx={{ mt: 16 }}>
                CitizenX Nigeria Cookies Policy
            </Typography>
            <Typography variant="subtitle1" align="center" paragraph>
                Last Updated: November 3, 2024
            </Typography>
            <Typography paragraph>
                At CitizenX Nigeria, we use cookies and similar technologies to enhance your experience on our app and dashboard, analyze
                our traffic, and understand how our services are used. This Cookies Policy explains what cookies are, how we use them, the
                types of cookies we use, and your choices regarding cookie settings.
            </Typography>
            <Typography variant="h6" gutterBottom>
                1. What Are Cookies?
            </Typography>
            <Typography paragraph>
                Cookies are small text files that are placed on your device when you visit a website or use an app. They are widely used to
                make websites and apps work more efficiently, as well as to provide information to the site owners.
            </Typography>
            <Typography variant="h6" gutterBottom>
                2. How We Use Cookies
            </Typography>
            <Typography paragraph>We use cookies for various purposes, including:</Typography>
            <Typography paragraph>
                <strong>Essential Cookies:</strong> These cookies are necessary for the app and dashboard to function properly. They enable
                you to navigate and use the features of our services.
            </Typography>
            <Typography paragraph>
                <strong>Performance Cookies:</strong> We use these cookies to analyze how our users interact with our app and dashboard.
                This information helps us improve our services and enhance user experience.
            </Typography>
            <Typography paragraph>
                <strong>Functional Cookies:</strong> These cookies allow our app to remember choices you make (such as your username or
                language) and provide enhanced features and personalization.
            </Typography>
            <Typography paragraph>
                <strong>Advertising Cookies:</strong> While we do not sell your data to third parties, we may use cookies to help us deliver
                advertisements relevant to you and your interests.
            </Typography>
            <Typography variant="h6" gutterBottom>
                3. Types of Cookies We Use
            </Typography>
            <Typography paragraph>
                <strong>Session Cookies:</strong> These are temporary cookies that remain on your device until you close your browser. They
                are used to remember your activities on our app during a single session.
            </Typography>
            <Typography paragraph>
                <strong>Persistent Cookies:</strong> These cookies remain on your device for a longer period or until you delete them. They
                are used to remember your preferences for future visits.
            </Typography>
            <Typography variant="h6" gutterBottom>
                4. Third-Party Cookies
            </Typography>
            <Typography paragraph>
                We may also use third-party cookies provided by our trusted partners. These cookies may collect information about your
                online activities over time and across different websites. We do not have control over these third-party cookies, and their
                use is subject to the respective third party’s privacy policies.
            </Typography>
            <Typography variant="h6" gutterBottom>
                5. Managing Cookies
            </Typography>
            <Typography paragraph>
                You have the right to accept or refuse cookies. You can manage your cookie preferences by adjusting your browser settings.
                Most browsers allow you to refuse cookies or alert you when cookies are being sent. However, please note that if you disable
                cookies, some features of our app and dashboard may not function properly.
            </Typography>
            <Typography variant="h6" gutterBottom>
                6. Changes to This Cookies Policy
            </Typography>
            <Typography paragraph>
                We may update this Cookies Policy from time to time to reflect changes in our practices or for legal reasons. Any updates
                will be posted on this page, and we will notify you of significant changes.
            </Typography>
            <Typography variant="h6" gutterBottom>
                7. Contact Us
            </Typography>
            <Typography paragraph>
                If you have any questions or concerns regarding this Cookies Policy or our use of cookies, please contact us at:
            </Typography>
            <Typography paragraph>Email: admin@citizenx.ng</Typography>
            <Typography paragraph>Address: 11 Herbert Macaulay Crescent GRA Ikeja, Lagos, Nigeria.</Typography>
            <Typography paragraph align="center" sx={{ mt: 4 }}>
                By using CitizenX Nigeria, you consent to our use of cookies as described in this policy.
            </Typography>
        </Container>
    );
}

export default Cookies;
