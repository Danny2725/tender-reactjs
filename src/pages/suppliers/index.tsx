import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, MenuItem, Select, InputLabel, FormControl, Container, SelectChangeEvent, Paper, Typography, Box } from '@mui/material';

const data = [
  { title: "Tender 1", description: "Description for tender 1", visibility: "public", invited_suppliers: ["supplier1@example.com", "supplier2@example.com"], created_at: "2024-11-01", invited: "public" },
  { title: "Tender 2", description: "Description for tender 2", visibility: "private", invited_suppliers: ["supplier3@example.com"], created_at: "2024-11-02", invited: "private" },
  { title: "Tender 3", description: "Description for tender 3", visibility: "public", invited_suppliers: ["supplier4@example.com", "supplier5@example.com"], created_at: "2024-11-03", invited: "public" },
  { title: "Tender 4", description: "Description for tender 4", visibility: "private", invited_suppliers: ["supplier6@example.com"], created_at: "2024-11-04", invited: "private" },
  { title: "Tender 5", description: "Description for tender 5", visibility: "public", invited_suppliers: ["supplier7@example.com"], created_at: "2024-11-05", invited: "public" },
  { title: "Tender 6", description: "Description for tender 6", visibility: "private", invited_suppliers: ["supplier8@example.com"], created_at: "2024-11-06", invited: "private" },
  { title: "Tender 7", description: "Description for tender 7", visibility: "public", invited_suppliers: ["supplier9@example.com"], created_at: "2024-11-07", invited: "public" },
  { title: "Tender 8", description: "Description for tender 8", visibility: "private", invited_suppliers: ["supplier10@example.com"], created_at: "2024-11-08", invited: "private" },
  { title: "Tender 9", description: "Description for tender 9", visibility: "public", invited_suppliers: ["supplier11@example.com"], created_at: "2024-11-09", invited: "public" },
  { title: "Tender 10", description: "Description for tender 10", visibility: "private", invited_suppliers: ["supplier12@example.com"], created_at: "2024-11-10", invited: "private" },
];

const Suppliers = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [invitedFilter, setInvitedFilter] = useState('');

  const handleInvitedFilterChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setInvitedFilter(value);

    if (value === '') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => item.invited === value));
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
        Suppliers
      </Typography>

      <Box sx={{ display: 'flex', gap: '16px', mb: 4, alignItems: 'center' }}>
        <FormControl fullWidth variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Invited</InputLabel>
          <Select
            value={invitedFilter}
            onChange={handleInvitedFilterChange}
            label="Filter by Invited"
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
              <TableCell sx={{ fontWeight: 'bold', color: '#ffffff' }}>Invited Suppliers</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#ffffff' }}>Invited</TableCell>
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
                <TableCell>{item.invited_suppliers.join(', ')}</TableCell>
                <TableCell>{item.invited}</TableCell>
                <TableCell>{item.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Suppliers;
