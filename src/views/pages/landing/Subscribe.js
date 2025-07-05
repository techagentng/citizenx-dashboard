import { Button, Container, Grid, Paper, Stack, TextField, Typography, Alert } from '@mui/material'
import { styled } from '@mui/material/styles';
import React, { useState } from 'react'
import FadeInWhenVisible from './Animation2';
import emailjs from 'emailjs-com';

const Jumbo = styled(Paper)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A4833',
    margin: '0 auto',
    width: '100%',
    height: 'auto',
    borderRadius: '20px',
});

const ButtonSX = {
    borderRadius: 2,
    backgroundColor: 'success',
    color: 'white',
    padding: '10px 20px', 
    width: '50%'
};

const SERVICE_ID = 'your_service_id'; 
const TEMPLATE_ID = 'your_template_id'; 
const USER_ID = 'your_user_id'; 

const Subscribe = () => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      { from_name: form.name, from_email: form.email },
      USER_ID
    ).then(
      () => {
        setSuccess('Subscription successful! Thank you for subscribing.');
        setForm({ name: '', email: '' });
      },
      (err) => {
        setError('Failed to subscribe. Please try again later.');
      }
    ).finally(() => setLoading(false));
  };

  return (
    <Container>
      <FadeInWhenVisible animationType="fadeIn" delay={0.3}>
        <Jumbo sx={{ paddingX: { xs: 5, md: 15 }, paddingY: 15 }} elevation={2}>
          <Grid container spacing={5} sx={{ alignItems: 'center' }} direction={{ xs: 'column-reverse', md: 'row' }}>
            <Grid item xs={12} md={6} sx={{ marginTop: { xs: '20px', md: '1px' } }} >
              <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, mb: 2, textAlign: { xs: 'center', md: 'left' }, color: 'white' }}>
                Subscribe to our newsletter for updates.
              </Typography>
              <Typography
                variant="subtitle2"
                color="white"
                sx={{
                  fontSize: '1rem',
                  zIndex: '99',
                  width: { xs: '100%', md: 'calc(100% - 20%)' },
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                Receive updates from all 774 local governments, with active citizens keeping you informed about your local communities. Subscribe now!
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <form onSubmit={handleSubmit}>
                <Stack spacing={4} maxWidth="full">
                  <TextField
                    placeholder='Full Name'
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    placeholder='Your Email Address'
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    variant='contained'
                    color='success'
                    sx={ButtonSX}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                  {success && <Alert severity="success">{success}</Alert>}
                  {error && <Alert severity="error">{error}</Alert>}
                </Stack>
              </form>
            </Grid>
          </Grid>
        </Jumbo>
      </FadeInWhenVisible>
    </Container>
  )
}

export default Subscribe