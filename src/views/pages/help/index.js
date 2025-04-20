import React from 'react';
import { Container, Typography, Link } from '@mui/material';
import AppBar from 'ui-component/extended/AppBar';

function Help() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <AppBar />
            <Typography variant="h1" align="center" gutterBottom sx={{ mt: 16 }}>
                CitizenX App and Dashboard - Launch Help and Support
            </Typography>
            <Typography paragraph>
                Welcome to CitizenX! We’re thrilled to have you join CitizenX, the community platform for reporting local issues and engaging in your community. To help you get started, here’s a guide to common questions, tips, and ways to reach support.
            </Typography>
            <Typography variant="h6" gutterBottom>
                1. Getting Started with CitizenX
            </Typography>
            <Typography paragraph>
                • <strong>Creating Your Account:</strong> Download the CitizenX app from your app store. Tap &quot;Sign Up&quot; and fill in the required details to create your account.
            </Typography>
            <Typography paragraph>
                • <strong>Logging In:</strong> Use your registered email and password to log in. If you have any trouble, select &quot;Forgot Password&quot; to reset it.
            </Typography>
            <Typography variant="h6" gutterBottom>
                2. Making Your First Report
            </Typography>
            <Typography paragraph>
                • <strong>Submitting a Report:</strong> To report an issue, tap on the &quot;Report&quot; button, select the incident type, and add details. Photos or videos can be added to give context.
            </Typography>
            <Typography paragraph>
                • <strong>Earning Points for Engagement:</strong> As a new user, you can earn points for reporting issues, following up, and contributing to the community. Points can later be redeemed for rewards.
            </Typography>
            <Typography variant="h6" gutterBottom>
                3. Navigating Key Features
            </Typography>
            <Typography paragraph>
                • <strong>Dashboard:</strong> The dashboard at <Link href="https://www.citizenx.ng/dashboard" target="_blank">www.citizenx.ng/dashboard</Link> provides a quick view of reports and trends across local government areas in Nigeria. The CitizenX Dashboard offers an interactive map, incident timeline, customizable filters, and data visualizations to track and analyze reports across Nigeria, enabling users to explore, compare, and share community insights.
            </Typography>
            <Typography paragraph>
                • <strong>Your Profile:</strong> Access your profile in the &quot;Account&quot; section, where you can view and track your reports, points, and edit details.
            </Typography>
            <Typography variant="h6" gutterBottom>
                4. Support for New Users
            </Typography>
            <Typography paragraph>
                • <strong>App Crashing or Freezing:</strong> Try closing and reopening the app. Ensure you have the latest version installed from your app store.
            </Typography>
            <Typography paragraph>
                • <strong>Issues Submitting Reports:</strong> Make sure you have a stable internet connection. If the issue persists, please reach out to us for help.
            </Typography>
            <Typography variant="h6" gutterBottom>
                5. Community Guidelines for New Users
            </Typography>
            <Typography paragraph>
                • <strong>Content Standards:</strong> All posts should be respectful and focused on local community issues. Content that is offensive, inappropriate, or violates local laws will be removed.
            </Typography>
            <Typography paragraph>
                • <strong>Reporting Inappropriate Content:</strong> If you encounter content that does not meet our standards, select &quot;Report&quot; on the item to notify our team.
            </Typography>
            <Typography variant="h6" gutterBottom>
                6. Privacy and Security
            </Typography>
            <Typography paragraph>
                • <strong>Protecting Your Account:</strong> Use a strong password and do not share your login details. Always log out on shared devices.
            </Typography>
            <Typography paragraph>
                • <strong>Data Privacy:</strong> CitizenX respects your privacy. We collect data only to improve your experience, as outlined in our Privacy Policy at <Link href="https://www.citizenx.ng/privacy" target="_blank">www.citizenx.ng/privacy</Link>.
            </Typography>
            <Typography variant="h6" gutterBottom>
                7. Getting Help
            </Typography>
            <Typography paragraph>
                • <strong>Email Support:</strong> For technical issues or questions, contact us at <Link href="mailto:support@citizenx.ng">support@citizenx.ng</Link>.
            </Typography>
            <Typography paragraph>
                • <strong>Phone Support:</strong> Reach our support line at +2347003151358 for immediate assistance.
            </Typography>
            <Typography paragraph>
                • <strong>Providing Feedback:</strong> We’re committed to improvement, and we welcome your input! Share your suggestions or feedback at <Link href="mailto:feedback@citizenx.ng">feedback@citizenx.ng</Link>.
            </Typography>
            <Typography variant="h6" gutterBottom>
                8. Frequently Asked Questions (FAQs)
            </Typography>
            <Typography paragraph>
                • <strong>How do I reset my password?</strong> Select &quot;Forgot Password&quot; on the login screen and follow the prompts.
            </Typography>
            <Typography paragraph>
                • <strong>How do I view reports from other users?</strong> Tap on the &quot;Feed&quot; or &quot;Explore&quot; section to view recent reports in your community or other areas.
            </Typography>
            <Typography paragraph>
                • <strong>What should I do if I don’t receive my points?</strong> Points are usually awarded immediately. If there’s an issue, contact <Link href="mailto:support@citizenx.ng">support@citizenx.ng</Link> for help.
            </Typography>
            <Typography paragraph align="center" sx={{ mt: 4 }}>
                By using CitizenX’s Help and Support resources, you agree to adhere to our policies. For full terms, refer to our <Link href="https://www.citizenx.ng/terms" target="_blank">Terms and Conditions</Link>. Enjoy your CitizenX experience!
            </Typography>
        </Container>
    );
}

export default Help;
