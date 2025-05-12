import { Container, Typography, Paper } from '@mui/material';
import Footer from '../components/Footer';

const PrivacyPolicy = () => (
  <>
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          This Privacy Policy describes how Job Hop ("we", "us", or "our") handles your personal information. We value your privacy and are committed to protecting your data. This policy will be updated as needed. Last updated: May 12, 2025.
        </Typography>
        <Typography variant="body1" paragraph>
          By using our service, you agree to the collection and use of information in accordance with this policy.
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We may collect the following types of personal information:
          <ul>
            <li>Contact Information: such as your name and email address.</li>
            <li>Resume Data: including your work experience, education, skills, and any other information you provide in your resume.</li>
            <li>Usage Data: information about how you use our service, such as your interactions with the platform.</li>
          </ul>
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use the information we collect for various purposes, including:
          <ul>
            <li>To provide and maintain our service.</li>
            <li>To personalize your experience.</li>
            <li>To analyze and improve our service.</li>
            <li>To process your job applications and manage your resume data.</li>
            <li>For internal research and development, including training machine learning models to enhance our services.</li>
          </ul>
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Use of Your Resume and Data
        </Typography>
        <Typography variant="body1" paragraph>
          Your resume and the data extracted from it may be used to:
          <ul>
            <li>Match you with potential job opportunities.</li>
            <li>Provide insights and analytics to you about your job search.</li>
            <li>Improve our matching algorithms and service features.</li>
            <li>For aggregated analysis and reporting, where your personal identifiers are removed.</li>
          </ul>
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Data Sharing and Disclosure
        </Typography>
        <Typography variant="body1" paragraph>
          We are committed to protecting your privacy. We will not sell your personal information, including your resume and associated data, to third parties.
        </Typography>
        <Typography variant="body1" paragraph>
          We may share anonymized and aggregated data with third parties for research, analysis, or other legitimate purposes. In such cases, all personally identifiable information will be removed to ensure your privacy.
        </Typography>
        <Typography variant="body1" paragraph>
          We may also disclose your information if required by law or in response to valid requests by public authorities.
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Your Rights
        </Typography>
        <Typography variant="body1" paragraph>
          You have the right to access, update, or delete your personal information. You can manage your resume and data through your account settings or by contacting us.
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact us.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 4, fontStyle: 'italic' }}>
          (This is a template privacy policy. Please consult with a legal professional to ensure compliance with all applicable laws and regulations.)
        </Typography>
      </Paper>
    </Container>
    <Footer />
  </>
);

export default PrivacyPolicy;
