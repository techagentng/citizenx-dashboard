import React from 'react';
import { Container, Typography } from '@mui/material';
import AppBar from 'ui-component/extended/AppBar';

function Community() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <AppBar />
            <Typography variant="h1" align="center" gutterBottom sx={{ mt: 16 }}>
                CitizenX Nigeria Community Guidelines
            </Typography>
            <Typography paragraph>
                At CitizenX Nigeria, we’re committed to fostering a positive, respectful, and safe environment where everyone can share
                information to assess the performance of local governance in Nigerias local government areas. To keep our community healthy
                and productive, we ask all members to follow these guidelines. Violations may lead to content removal or account suspension,
                or deletion.
            </Typography>

            <Typography variant="h6" gutterBottom>
                1. No Spam or Misleading Content
            </Typography>
            <Typography paragraph>
                Content on CitizenX Nigeria should be authentic and relevant to your local community. Avoid posting:
                <ul>
                    <li>Spam: Repetitive or irrelevant report posts, unsolicited promotions, or excessive self-promotion.</li>
                    <li>
                        Misleading Information: False claims, inaccurate issues or incidents, or any content designed to deceive other
                        users.
                    </li>
                </ul>
            </Typography>

            <Typography variant="h6" gutterBottom>
                2. Respectful and Inclusive Communication
            </Typography>
            <Typography paragraph>
                CitizenX Nigeria encourages diverse perspectives but does not tolerate harmful or offensive content. Please avoid:
                <ul>
                    <li>Inappropriate Content: Any material that could be deemed obscene, overly graphic, or offensive.</li>
                    <li>
                        Harassment or Hate Speech: Posts or comments that include threats, bullying, discriminatory language, or any form of
                        hate speech.
                    </li>
                </ul>
            </Typography>

            <Typography variant="h6" gutterBottom>
                3. Share Verified Information
            </Typography>
            <Typography paragraph>
                To maintain a reliable platform, we encourage the sharing of verified information only. Refrain from posting:
                <ul>
                    <li>
                        Misinformation: Unverified claims or misleading information that could harm the community or create confusion. We
                        verify every report before awarding report points.
                    </li>
                </ul>
            </Typography>

            <Typography variant="h6" gutterBottom>
                4. Engage Constructively
            </Typography>
            <Typography paragraph>
                CitizenX Nigeria values meaningful interactions and respectful engagement. Behavior that interferes with this includes:
                <ul>
                    <li>Harassment: Personal attacks, threats, or any behavior aimed at intimidating others.</li>
                    <li>Excessive Self-Promotion: Using CitizenX Nigeria solely for promotional purposes.</li>
                </ul>
            </Typography>

            <Typography variant="h6" gutterBottom>
                5. Privacy and Safety First
            </Typography>
            <Typography paragraph>
                Respect the privacy of others by refraining from sharing private information or engaging in behavior that might put someone
                at risk.
            </Typography>

            <Typography variant="h6" gutterBottom>
                Actions to Take if You See a Violation
            </Typography>
            <Typography paragraph>
                If you come across content that violates these guidelines, you can take action by:
                <ul>
                    <li>Reporting a Post: Click the More Options (three-dot icon) and select Report Post to choose a reason.</li>
                    <li>Reporting a User: On the user’s profile, select Report User and specify the issue.</li>
                    <li>
                        Blocking a User: If you want to avoid seeing posts from a specific user, you can block them. This will hide their
                        posts from your feed and prevent further interaction.
                    </li>
                </ul>
            </Typography>

            <Typography variant="h6" gutterBottom>
                Using the Dashboard
            </Typography>
            <Typography paragraph>
                The CitizenX Nigeria dashboard provides tools to help you monitor local governance performance, explore data insights, and
                manage community interactions. Through the dashboard, you can:
                <ul>
                    <li>
                        Track Reports: View data and trends on reported issues by region or topic to gain insight into local governance
                        activities.
                    </li>
                    <li>
                        Analyze Community Engagement: Use graphs, charts, and other visualization tools to assess community contributions
                        and key areas of concern.
                    </li>
                    <li>
                        Manage User Settings: Adjust your account settings, subscriptions, and reporting preferences directly from the
                        dashboard.
                    </li>
                </ul>
                The dashboard enables transparent, data-driven engagement in your community and encourages active participation in local
                governance tracking.
            </Typography>

            <Typography paragraph align="center" sx={{ mt: 4 }}>
                Together, let’s keep CitizenX Nigeria a respectful, informative, and empowering space for all. Thank you for contributing to
                a positive local community in Nigeria!
            </Typography>
        </Container>
    );
}

export default Community;
