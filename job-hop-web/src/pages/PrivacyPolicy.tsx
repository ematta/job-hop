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
          This Privacy Policy describes how we handle your personal information. We value your privacy and are committed to protecting your data. This policy will be updated as needed.
        </Typography>
        <Typography variant="body1" paragraph>
          By using our service, you agree to the collection and use of information in accordance with this policy.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          (This is a standard placeholder privacy policy. Please update with your actual policy.)
        </Typography>
      </Paper>
    </Container>
    <Footer />
  </>
);

export default PrivacyPolicy;
