import * as React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Box, Button, TextField, Typography, Container, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function TenderForm() {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [visibility, setVisibility] = React.useState('Public'); // Chuyển thành 'Public' (chữ hoa)
  const [invitedSuppliers, setInvitedSuppliers] = React.useState<string[]>([]);
  const [email, setEmail] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState<'success' | 'error'>('success');

  // Hàm kiểm tra định dạng email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleAddEmail = () => {
    if (!email) {
      setAlertMessage('Email là bắt buộc!');
      setAlertSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (!isValidEmail(email)) {
      setAlertMessage('Email không hợp lệ!');
      setAlertSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (!invitedSuppliers.includes(email)) {
      setInvitedSuppliers([...invitedSuppliers, email]);
      setEmail('');
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setInvitedSuppliers(invitedSuppliers.filter((supplier) => supplier !== emailToRemove));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (email && !isValidEmail(email)) {
      setAlertMessage('Email không hợp lệ!');
      setAlertSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (email) {
      handleAddEmail();
    }

    const tenderData = {
      title,
      description,
      visibility,
      invited_suppliers: invitedSuppliers,
    };

    try {
      const token = Cookies.get('token');
      if (!token) {
        setAlertMessage('Bạn cần đăng nhập để thực hiện thao tác này.');
        setAlertSeverity('error');
        setOpenSnackbar(true);
        return;
      }

      // Gọi API tạo tender
      await axios.post('http://localhost/api/tender', tenderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAlertMessage('Create tender success');
      setAlertSeverity('success');
      setOpenSnackbar(true);

      // Chuyển hướng đến trang khác sau khi tạo tender thành công
      navigate('/contractors');

    } catch (error) {
      setAlertMessage('Create tender failed');
      setAlertSeverity('error');
      setOpenSnackbar(true);
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          backgroundColor: '#f5f5f5',
          borderRadius: 4,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#333' }}>
          Create Tender
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Your tender"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              mb: 2,
              backgroundColor: '#fff',
              borderRadius: 1,
              '& .MuiInputBase-root': {
                border: '1px solid #ddd',
                boxShadow: 'none',
              },
              '& .MuiInputBase-root:focus': {
                borderColor: '#007bff',
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Detailed description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              mb: 2,
              backgroundColor: '#fff',
              borderRadius: 1,
              '& .MuiInputBase-root': {
                border: '1px solid #ddd',
                boxShadow: 'none',
              },
              '& .MuiInputBase-root:focus': {
                borderColor: '#007bff',
              },
            }}
          />
          <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
            <InputLabel>Visibility</InputLabel>
            <Select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as 'Public' | 'Private')}
              label="Visibility"
              sx={{
                backgroundColor: '#fff',
                '& .MuiInputBase-root': {
                  border: '1px solid #ddd',
                },
                '& .MuiInputBase-root:focus': {
                  borderColor: '#007bff',
                },
              }}
            >
              <MenuItem value="Public">Public</MenuItem> {/* Chuyển thành 'Public' */}
              <MenuItem value="Private">Private</MenuItem> {/* Chuyển thành 'Private' */}
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            label="Supplier email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddEmail();
              }
            }}
            sx={{
              mb: 2,
              backgroundColor: '#fff',
              borderRadius: 1,
              '& .MuiInputBase-root': {
                border: '1px solid #ddd',
                boxShadow: 'none',
              },
              '& .MuiInputBase-root:focus': {
                borderColor: '#007bff',
              },
            }}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              mb: 2,
              backgroundColor: '#3a539b',
              '&:hover': {
                backgroundColor: '#2d4377',
              },
            }}
            onClick={handleAddEmail}
          >
            Add Your Mail
          </Button>
          <Box sx={{ mb: 2 }}>
            {invitedSuppliers.map((email, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1,
                  padding: 1,
                  backgroundColor: '#ffffff',
                  borderRadius: 2,
                  border: '1px solid #ddd',
                }}
              >
                <Typography variant="body2" sx={{ color: '#333' }}>
                  {email}
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleRemoveEmail(email)}
                >
                  Xóa
                </Button>
              </Box>
            ))}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: '#28a745',
              '&:hover': {
                backgroundColor: '#218838',
              },
            }}
          >
            Create Tender
          </Button>
        </Box>
      </Box>

      {/* Snackbar thông báo */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={alertSeverity}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}