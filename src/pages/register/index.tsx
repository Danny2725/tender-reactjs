// Register.tsx
import * as React from 'react';
import { Box, Button, TextField, Typography, Container, Grid, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useUser();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [role, setRole] = React.useState<'contractor' | 'supplier'>('contractor');
  const [error, setError] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRoleChange = (event: React.MouseEvent<HTMLElement>, newRole: 'contractor' | 'supplier' | null) => {
    if (newRole) setRole(newRole);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password || !name) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      await register(email, password, name, role);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', paddingBottom: '5vh' }}>
      <Paper elevation={4} sx={{ p: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: 3, maxWidth: 800 }}>
        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'center' }}>
          <Box component="img" src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG9mZmljZXxlbnwwfHx8fDE2Mzg4MjY3MzM&ixlib=rb-1.2.1&q=80&w=500" alt="Register Illustration" sx={{ width: '90%', borderRadius: 2, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }} />
        </Grid>

        <Grid item xs={12} md={6} sx={{ p: 3 }}>
          <Typography component="h1" variant="h4" align="center" fontWeight="bold" color="primary" sx={{ mb: 2, fontSize: '20px' }}>
            Register
          </Typography>

          <ToggleButtonGroup
            color="primary"
            value={role}
            exclusive
            onChange={handleRoleChange}
            fullWidth
            sx={{ mb: 0.5 }}
          >
            <ToggleButton value="contractor" sx={{ fontWeight: role === 'contractor' ? 'bold' : 'normal', fontSize: '12px' }}>
              I'm Contractor
            </ToggleButton>
            <ToggleButton value="supplier" sx={{ fontWeight: role === 'supplier' ? 'bold' : 'normal', fontSize: '12px' }}>
              I'm Supplier
            </ToggleButton>
          </ToggleButtonGroup>

          <Box component="form" onSubmit={handleRegister} noValidate>
            <TextField margin="normal" required fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 1 }} />
            <TextField margin="normal" required fullWidth label="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 1 }} />
            <TextField margin="normal" required fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 1 }} />

            {error && <Typography color="error" align="center">{error}</Typography>}

            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 1.5, mb: 2, fontWeight: 'bold', p: 1, borderRadius: '30px' }} disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Sign Up'}
            </Button>

            <Typography onClick={() => navigate('/login')} align="center" variant="body2" color="primary" sx={{fontWeight: 600, cursor: 'pointer'}}>
              Register To Create Account
            </Typography>
          </Box>
        </Grid>
      </Paper>
    </Container>
  );
}
