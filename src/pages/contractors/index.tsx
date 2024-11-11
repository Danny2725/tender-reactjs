import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  SelectChangeEvent,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Cookies from 'js-cookie';

const ContractorsPage = () => {
  const [data, setData] = useState<any[]>([]); // Dữ liệu tender
  const [visibilityFilter, setVisibilityFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // State cho tender đang được chỉnh sửa
  const [selectedTender, setSelectedTender] = useState<any>(null);

  // State cho các trường trong form chỉnh sửa
  const [editTitle, setEditTitle] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [editVisibility, setEditVisibility] = useState<string>('Public');

  // State cho tender cần xóa
  const [tenderToDelete, setTenderToDelete] = useState<number | null>(null);

  const handleVisibilityChange = (event: SelectChangeEvent<string>) => {
    setVisibilityFilter(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter(event.target.value);
  };

  // Hàm mở hộp thoại xác nhận xóa và lưu ID tender cần xóa
  const handleDelete = (tenderId: number) => {
    setTenderToDelete(tenderId);
    setOpenDialog(true);
  };

  // Hàm xác nhận xóa tender
  const confirmDelete = async () => {
    if (tenderToDelete === null) return;

    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('You need to log in to perform this action.');
        return;
      }

      // Gọi API xóa tender
      await axios.delete(`http://localhost/api/tender/${tenderToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Cập nhật state để loại bỏ tender đã xóa
      setData(data.filter(item => item.id !== tenderToDelete));

      // Đóng hộp thoại và reset state
      setOpenDialog(false);
      setTenderToDelete(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete tender');
    }
  };

  // Hàm gọi API để lấy thông tin tender và mở dialog chỉnh sửa
  const handleEdit = async (tenderId: number) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('You need to log in to perform this action.');
        return;
      }

      const response = await axios.get(`http://localhost/api/tender/${tenderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const tender = response.data.tender;

      // Cập nhật state với thông tin tender
      setSelectedTender(tender);
      setEditTitle(tender.title);
      setEditDescription(tender.description);
      setEditVisibility(tender.visibility);

      // Mở dialog chỉnh sửa
      setEditDialogOpen(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch tender details');
    }
  };

  // Hàm lưu thay đổi sau khi chỉnh sửa
  const handleSaveEdit = async () => {
    if (!selectedTender) return;

    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('You need to log in to perform this action.');
        return;
      }

      // Dữ liệu cập nhật gửi lên API
      const updatedTender = {
        title: editTitle,
        description: editDescription,
        visibility: editVisibility,
      };

      // Gửi yêu cầu cập nhật tender
      await axios.put(`http://localhost/api/tender/${selectedTender.id}`, updatedTender, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Cập nhật dữ liệu trong state
      const updatedData = data.map(item =>
        item.id === selectedTender.id ? { ...item, ...updatedTender } : item
      );
      setData(updatedData);

      // Đóng dialog
      setEditDialogOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update tender');
    }
  };

  // Hàm lấy dữ liệu ban đầu
  const fetchData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('You need to log in to view this page.');
        setIsLoading(false);
        return;
      }

      const response = await axios.get('http://localhost/api/tender', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.tenders);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item: any) => {
    const matchesVisibility =
      visibilityFilter === 'all' || item.visibility.toLowerCase() === visibilityFilter;
    const matchesDate = dateFilter
      ? item.created_at.substring(0, 10) === dateFilter
      : true;
    return matchesVisibility && matchesDate;
  });

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
        Contractors
      </Typography>
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '10px',
        }}
      >
        {/* Bộ lọc */}
        <Box sx={{ display: 'flex', gap: '16px', mb: 2, alignItems: 'center' }}>
          <FormControl variant="outlined" sx={{ minWidth: 150, fontSize: '14px' }}>
            <InputLabel sx={{ fontSize: '14px' }}>Visibility</InputLabel>
            <Select
              value={visibilityFilter}
              onChange={handleVisibilityChange}
              label="Visibility"
              sx={{ fontSize: '14px' }}
            >
              <MenuItem value="all" sx={{ fontSize: '14px' }}>
                All
              </MenuItem>
              <MenuItem value="public" sx={{ fontSize: '14px' }}>
                Public
              </MenuItem>
              <MenuItem value="private" sx={{ fontSize: '14px' }}>
                Private
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Filter by Date"
            value={dateFilter}
            onChange={handleDateChange}
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true, style: { fontSize: '14px' } }}
            sx={{ fontSize: '14px', padding: '10px 10px' }}
          />

          <Button
            variant="contained"
            onClick={() => {
              setVisibilityFilter('all');
              setDateFilter('');
            }}
            sx={{
              backgroundColor: '#3a539b',
              height: '56px',
              color: '#ffffff',
              fontWeight: 600,
              borderRadius: '5px',
              '&:hover': {
                backgroundColor: '#2f4477',
              },
            }}
          >
            Clear Filters
          </Button>
        </Box>

        {/* Hiển thị bảng dữ liệu */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#3a539b' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                    <TableSortLabel style={{ color: '#ffffff' }}>Title</TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                    Description
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                    Visibility
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                    Created At
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item: any, index: number) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:nth-of-type(odd)': { backgroundColor: '#eaeaea' },
                      '&:nth-of-type(even)': { backgroundColor: '#ffffff' },
                      '&:hover': { backgroundColor: '#d5d5d5' },
                      height: 56,
                    }}
                  >
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.visibility}</TableCell>
                    <TableCell>{item.created_at.substring(0, 10)}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(item.id)} sx={{ mr: 1 }}>
                        <EditIcon />
                      </Button>
                      <Button onClick={() => handleDelete(item.id)} color="error">
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Hộp thoại xác nhận xóa */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this tender?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              setTenderToDelete(null);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Hộp thoại chỉnh sửa */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Tender</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            sx={{ mb: 2 }}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            sx={{ mb: 2 }}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            multiline
            rows={4}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Visibility</InputLabel>
            <Select
              value={editVisibility}
              onChange={(e) => setEditVisibility(e.target.value)}
              label="Visibility"
            >
              <MenuItem value="Public">Public</MenuItem>
              <MenuItem value="Private">Private</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ContractorsPage;
