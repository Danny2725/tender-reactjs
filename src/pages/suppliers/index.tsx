import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, MenuItem, Select, InputLabel, FormControl, Container, Paper, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';

const Suppliers = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [visibilityFilter, setVisibilityFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('You need to log in to access this data.');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost/api/tender/sup', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.tenders);
      setFilteredData(response.data.tenders);
    } catch (error) {
      setError('Failed to fetch data from API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVisibilityFilterChange = (event: { target: { value: any; }; }) => {
    const value = event.target.value;
    setVisibilityFilter(value);

    if (value === '') {
      // Nếu chọn "All", reset về dữ liệu gốc
      setFilteredData(data);
    } else {
      // Lọc dữ liệu hiện tại theo `visibility`
      setFilteredData(data.filter(item => item.visibility.toLowerCase() === value));
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
        Suppliers
      </Typography>
      <Box sx={{
        backgroundColor: "#fff",
        padding: '20px',
        borderRadius: "10px",
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        marginBottom: "10px"
      }}
      >
        <Box sx={{ display: 'flex', gap: '16px', mb: 4, alignItems: 'center' }}>
          <FormControl fullWidth variant="outlined" sx={{ maxWidth: 200 }}>
            <InputLabel>Filter by Visibility</InputLabel>
            <Select
              value={visibilityFilter}
              onChange={handleVisibilityFilterChange}
              label="Filter by Visibility"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="private">Private</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#3a539b' }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                  <TableSortLabel style={{ color: '#ffffff' }}>Title</TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#ffffff' }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#ffffff' }}>Visibility</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#ffffff' }}>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item, index) => (
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Suppliers;
