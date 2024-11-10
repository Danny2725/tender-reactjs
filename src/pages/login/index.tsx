import * as React from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Thay useRouter bằng useNavigate từ react-router-dom

export default function Login() {
  const navigate = useNavigate();  // Khởi tạo useNavigate để điều hướng
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    // Xử lý logic đăng nhập ở đây (gọi API hoặc xác thực tài khoản)
    console.log("Đăng nhập với email:", email, "và password:", password);

    // Giả sử đăng nhập thành công, điều hướng đến trang chủ
    navigate('/');  // Sử dụng navigate thay vì router.push để điều hướng
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Mật khẩu"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
