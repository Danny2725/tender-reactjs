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
  const [data, setData] = useState<any[]>([]); // Khởi tạo là một mảng rỗng
  const [visibilityFilter, setVisibilityFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const handleVisibilityChange = (event: SelectChangeEvent<string>) => {
    setVisibilityFilter(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter(event.target.value);
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    setOpenDialog(false);
    console.log('Successfully deleted');
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
    console.log('Editing item:');
  };

  const handleSaveEdit = () => {
    setEditDialogOpen(false);
  };

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

      // Kiểm tra phản hồi từ API
      console.log('API Response:', response.data);

      // Dữ liệu nằm trong response.data.tenders
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
                  {/* <TableCell sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                    Invited Suppliers
                  </TableCell> */}
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
                    {/* <TableCell>{item.invited_suppliers?.join(', ')}</TableCell> */}
                    <TableCell>{item.created_at.substring(0, 10)}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit()} sx={{ mr: 1 }}>
                        <EditIcon />
                      </Button>
                      <Button onClick={() => handleDelete()} color="error">
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
        <DialogContent>Are you sure you want to delete this tender?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
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
          <TextField label="Title" fullWidth sx={{ mb: 2 }} />
          <TextField label="Description" fullWidth sx={{ mb: 2 }} />
          <TextField label="Visibility" fullWidth sx={{ mb: 2 }} />
          {/* Bạn có thể thêm các trường khác nếu cần */}
          <TextField
            label="Date"
            type="date"
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
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
