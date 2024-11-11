// Login.tsx
import * as React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string>('');

  // Nhận thông báo từ location.state
  const message = location.state?.message || '';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost/api/auth/login', {
        email,
        password,
      });
      const { token, user } = response.data;
      Cookies.set('token', token, { expires: 7 });
      navigate('/');
    } catch (err: any) {
      // Xử lý lỗi
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        paddingBottom: '5vh',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 3,
          maxWidth: 800,
        }}
      >
        {/* Illustration or Image */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: 'none', md: 'block' },
            textAlign: 'center',
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG9mZmljZXxlbnwwfHx8fDE2Mzg4MjY3MzM&ixlib=rb-1.2.1&q=80&w=500"
            alt="Login Illustration"
            sx={{
              width: '90%',
              borderRadius: 2,
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          />
        </Grid>

        {/* Login Form */}
        <Grid item xs={12} md={6} sx={{ p: 3 }}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            fontWeight="bold"
            color="primary"
            sx={{ mb: 2, fontSize: '20px' }}
          >
            Login
          </Typography>

          {/* Hiển thị thông báo chúc mừng nếu có */}
          {message && (
            <Typography color="success.main" align="center" sx={{ mb: 2 }}>
              {message}
            </Typography>
          )}

          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                borderRadius: 1,
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                borderRadius: 1,
              }}
            />

            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 1.5,
                mb: 2,
                fontWeight: 'bold',
                p: 1,
                borderRadius: '30px',
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Đang đăng nhập...' : 'Sign In'}
            </Button>
            <Typography
              onClick={() => navigate('/register')}
              align="center"
              variant="body2"
              color="primary"
              sx={{ fontWeight: 600, cursor: 'pointer' }}
            >
              Register To Create Account
            </Typography>
          </Box>
        </Grid>
      </Paper>
    </Container>
  );
}
