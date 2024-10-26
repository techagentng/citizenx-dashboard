import React from 'react';
import { Container, Typography } from '@mui/material';
import AppBar from 'ui-component/extended/AppBar';

function Terms() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <AppBar />
            <Typography variant="h1" align="center" gutterBottom sx={{ mt: 16 }}>
                CitizenX App and Dashboard - Terms and Conditions
            </Typography>
            <Typography variant="subtitle1" align="center" paragraph>
                Last Updated: October 26, 2024
            </Typography>
            <Typography paragraph>
                Welcome to CitizenX, a community-driven platform dedicated to citizen engagement through reporting and tracking local issues. By using CitizenX, you agree to these Terms and Conditions. Please read them carefully.
            </Typography>
            <Typography variant="h6" gutterBottom>
                1. Acceptance of Terms
            </Typography>
            <Typography paragraph>
                • By accessing or using the CitizenX app and dashboard, you confirm that you agree to abide by these Terms and Conditions, as well as our Privacy Policy.
                • If you do not agree to any part of these terms, you may not use the app.
            </Typography>
            <Typography variant="h6" gutterBottom>
                2. User Eligibility
            </Typography>
            <Typography paragraph>
                • You must be at least 13 years old to use CitizenX. Users under 18 should review these terms with a parent or guardian to ensure understanding.
            </Typography>
            <Typography variant="h6" gutterBottom>
                3. Account Registration
            </Typography>
            <Typography paragraph>
                • To use certain features of CitizenX, you will be required to create an account. All information provided during registration must be accurate and up-to-date.
                • You are responsible for maintaining the confidentiality of your account credentials and are accountable for all activities that occur under your account.
            </Typography>
            <Typography variant="h6" gutterBottom>
                4. Citizen Reporting and Content
            </Typography>
            <Typography paragraph>
                • User-Generated Content: You may post content such as text, images, or videos related to local incidents or issues. By submitting content, you confirm that you own the rights to the material or have permission to share it.
            </Typography>
            <Typography paragraph>
                • Prohibited Content: Content that is illegal, offensive, defamatory, obscene, or incites violence is strictly prohibited. CitizenX reserves the right to remove any content that violates these guidelines.
            </Typography>
            <Typography paragraph>
                • License to Use Content: By posting content, you grant CitizenX a non-exclusive, royalty-free, worldwide, and irrevocable license to use, display, modify, and distribute the content in connection with the app&apos;s operations.
            </Typography>
            <Typography variant="h6" gutterBottom>
                5. Token and Reward System
            </Typography>
            <Typography paragraph>
                • Users may earn CitizenX points by contributing reports or engaging in certain activities within the app. These points can be redeemed as specified in the app&apos;s reward section subsequently.
                • CitizenX points are not a form of currency, do not hold any monetary value, and cannot be transferred or exchanged outside the app.
                • CitizenX reserves the right to modify, suspend, or discontinue the points and reward system at any time without prior notice.
            </Typography>
            <Typography variant="h6" gutterBottom>
                6. Use of the App
            </Typography>
            <Typography paragraph>
                • Permitted Use: You may use CitizenX for lawful purposes and only in accordance with these Terms and Conditions.
            </Typography>
            <Typography paragraph>
                • Prohibited Actions: Users may not misuse the app, including but not limited to hacking, data mining, or attempting to access restricted areas. Users are also prohibited from impersonating others or falsely reporting incidents.
            </Typography>
            <Typography paragraph>
                • Termination of Access: CitizenX reserves the right to terminate or restrict your access to the app without notice if you violate these Terms or if your actions harm the app or other users.
            </Typography>
            <Typography variant="h6" gutterBottom>
                7. Privacy and Data Collection
            </Typography>
            <Typography paragraph>
                • By using CitizenX, you consent to the collection, storage, and use of your data in accordance with our Privacy Policy.
                • Any data you submit will be used for app functionality, to improve services, and for analytical purposes. We do not share personal information with third parties without consent, except as outlined in the Privacy Policy.
            </Typography>
            <Typography variant="h6" gutterBottom>
                8. Intellectual Property
            </Typography>
            <Typography paragraph>
                • All content, design, and features of the CitizenX app are the intellectual property of CitizenX or its licensors. You may not copy, distribute, modify, or create derivative works without permission.
            </Typography>
            <Typography variant="h6" gutterBottom>
                9. Third-Party Links and Services
            </Typography>
            <Typography paragraph>
                • The app may contain links to third-party websites or services. CitizenX is not responsible for the content, terms, or privacy practices of third-party sites. Your use of these sites is at your own risk.
            </Typography>
            <Typography variant="h6" gutterBottom>
                10. Disclaimer of Warranties
            </Typography>
            <Typography paragraph>
                • CitizenX is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that the app will be error-free, secure, or available at all times.
                • We make no warranties regarding the accuracy or reliability of user-generated content or any information provided on the app.
            </Typography>
            <Typography variant="h6" gutterBottom>
                11. Limitation of Liability
            </Typography>
            <Typography paragraph>
                • CitizenX and its affiliates are not liable for any damages arising from your use of the app, including but not limited to direct, indirect, incidental, or consequential damages, even if we have been advised of such damages.
            </Typography>
            <Typography variant="h6" gutterBottom>
                12. Indemnification
            </Typography>
            <Typography paragraph>
                • You agree to indemnify and hold CitizenX harmless from any claims, liabilities, damages, and expenses arising from your use of the app or violation of these Terms.
            </Typography>
            <Typography variant="h6" gutterBottom>
                13. Modifications to Terms
            </Typography>
            <Typography paragraph>
                • CitizenX may modify these Terms and Conditions at any time. Changes will be posted within the app, and your continued use after the modifications will constitute your acceptance of the revised terms.
            </Typography>
            <Typography variant="h6" gutterBottom>
                14. Governing Law and Dispute Resolution
            </Typography>
            <Typography paragraph>
                • These Terms are governed by the laws of [Your Country/State], without regard to conflict of law principles.
                • Any disputes arising from these Terms or your use of the app shall be resolved through binding arbitration in [Location], unless otherwise required by law.
            </Typography>
            <Typography variant="h6" gutterBottom>
                15. Contact Information
            </Typography>
            <Typography paragraph>
                • If you have questions or concerns regarding these Terms and Conditions, please contact us at admin@citizenx.ng.
            </Typography>
            <Typography paragraph align="center" sx={{ mt: 4 }}>
                By using CitizenX, you confirm that you have read, understood, and agree to these Terms and Conditions.
            </Typography>
        </Container>
    );
}

export default Terms;
