import React from 'react';
import { Container, Typography } from '@mui/material';
import AppBar from 'ui-component/extended/AppBar';

function Terms() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <AppBar />
            <Typography variant="h1" align="center" gutterBottom sx={{ mt: 16 }}>
                CitizenX Nigeria App and Dashboard - Terms and Conditions
            </Typography>
            <Typography align="center" paragraph>
                Last Updated: November 15, 2024
            </Typography>
            <Typography paragraph>
                Welcome to CitizenX Nigeria, a community-driven platform dedicated to citizen engagement through reporting, tracking local
                issues, and evaluating the performance of local governance. By using the CitizenX Nigeria app and dashboard, you agree to
                these Terms and Conditions. Please read them carefully.
            </Typography>
            <Typography variant="h6" gutterBottom>
                1. Acceptance of Terms
            </Typography>
            <Typography paragraph>
                • By accessing or using the CitizenX Nigeria app and dashboard, you confirm that you agree to abide by these Terms and
                Conditions, as well as our Privacy Policy.
            </Typography>
            <Typography paragraph>
                • If you do not agree to any part of these terms, you may not use the app or dashboard.
            </Typography>
            <Typography variant="h6" gutterBottom>
                2. User Eligibility
            </Typography>
            <Typography paragraph>
                • You must be at least 13 years old to use CitizenX Nigeria. Users under 18 should review these terms with a parent or
                guardian to ensure understanding.
            </Typography>
            <Typography variant="h6" gutterBottom>
                3. Account Registration
            </Typography>
            <Typography paragraph>
                • To use certain features of CitizenX Nigeria, you will be required to create an account. All information provided during
                registration must be accurate and up-to-date.
            </Typography>
            <Typography paragraph>
                • You are responsible for maintaining the confidentiality of your account credentials and are accountable for all activities
                that occur under your account.
            </Typography>
            <Typography variant="h6" gutterBottom>
                4. Citizen Reporting and Content
            </Typography>
            <Typography paragraph>
                • User-Generated Content: You may post content, such as text, images, or videos, related to local incidents or issues in
                Nigeria. By submitting content, you confirm that you own the rights to the material or have permission to share it.
            </Typography>
            <Typography paragraph>
                • Prohibited Content: Content that is illegal, offensive, defamatory, obscene, or incites violence is strictly prohibited.
                CitizenX Nigeria reserves the right to remove any content that violates these guidelines.
            </Typography>
            <Typography paragraph>
                • License to Use Content: By posting content, you grant CitizenX Nigeria a non-exclusive, royalty-free, worldwide, and
                irrevocable license to use, display, modify, and distribute the content in connection with the app and dashboard’s
                operations.
            </Typography>
            <Typography variant="h6" gutterBottom>
                5. Report Verification Process
            </Typography>
            <Typography paragraph>
                • Verification of Reports: CitizenX Nigeria is committed to ensuring accuracy and reliability in reporting. All reports
                submitted by users undergo a verification process managed by our team of administrators. Only verified reports are eligible
                for rewards.
            </Typography>
            <Typography paragraph>
                • Non-Affiliation with Government Organizations: CitizenX Nigeria is an independent platform and is not affiliated with any
                government organizations. Our mission is to empower communities through transparent reporting, independent of any
                governmental influence.
            </Typography>
            <Typography variant="h6" gutterBottom>
                6. Token and Reward System
            </Typography>
            <Typography paragraph>
                • Rewards Points: Users may earn points by contributing reports or engaging in certain activities within the app and
                dashboard.
            </Typography>
            <Typography paragraph>
                • Non-Monetary Points: Our points are not a form of currency, do not hold any monetary value, and cannot be transferred or
                exchanged outside the app and dashboard.
            </Typography>
            <Typography paragraph>
                • Modification Rights: CitizenX Nigeria reserves the right to modify, suspend, or discontinue the points and reward system
                at any time without prior notice.
            </Typography>
            {/* Continue for other sections as needed */}
            <Typography paragraph align="center" sx={{ mt: 4 }}>
                By using CitizenX Nigeria, you confirm that you have read, understood, and agree to these Terms and Conditions.
            </Typography>
        </Container>
    );
}

export default Terms;
