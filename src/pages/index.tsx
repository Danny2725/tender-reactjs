import * as React from 'react';
import { Box, Button, TextField, Typography, Container, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Thay useRouter bằng useNavigate từ react-router-dom

export default function TenderForm() {
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [visibility, setVisibility] = React.useState('public');
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    // Kiểm tra nếu email hợp lệ
    if (email && !isValidEmail(email)) {
      setAlertMessage('Email không hợp lệ!');
      setAlertSeverity('error');
      setOpenSnackbar(true);
      return; // Dừng lại nếu email không hợp lệ
    }
  
    // Nếu email hợp lệ, tiếp tục thêm email vào danh sách
    if (email || invitedSuppliers) {
      handleAddEmail();
    }
  
    const tenderData = {
      title,
      description,
      visibility,
      invited_suppliers: invitedSuppliers,
    };
  
    // Giả sử bạn gửi dữ liệu đấu thầu thành công
    const isSuccess = true; // Giả sử bạn có một điều kiện để kiểm tra thành công hay thất bại.
  
    if (isSuccess) {
      setAlertMessage('Tạo đấu thầu thành công!');
      setAlertSeverity('success');
      setOpenSnackbar(true);
      console.log(tenderData); // In dữ liệu đấu thầu thành công

      // Điều hướng đến trang khác sau khi tạo thành công
    } else {
      setAlertMessage('Tạo đấu thầu thất bại!');
      setAlertSeverity('error');
      setOpenSnackbar(true);
      console.log(tenderData); // In dữ liệu đấu thầu thất bại
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
        }}
      >
        <Typography component="h1" variant="h5">
          Tạo đấu thầu
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Tiêu đề đấu thầu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Mô tả chi tiết"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Khả năng hiển thị</InputLabel>
            <Select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              label="Khả năng hiển thị"
            >
              <MenuItem value="public">Công khai</MenuItem>
              <MenuItem value="private">Riêng tư</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            label="Email nhà cung cấp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddEmail();
              }
            }}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            onClick={handleAddEmail}
          >
            Thêm Email
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
                }}
              >
                <Typography variant="body2">{email}</Typography>
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
            sx={{ mt: 3, mb: 2 }}
          >
            Tạo đấu thầu
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
