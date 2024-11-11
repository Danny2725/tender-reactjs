import React, { useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, MenuItem, Select, InputLabel, FormControl, Button, SelectChangeEvent, Paper, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const sampleData = [
  {
    title: "Tender 1",
    description: "Detailed description about tender 1",
    visibility: "public",
    invited_suppliers: ["supplier1@example.com", "supplier2@example.com"],
    create_at: "2024-11-10",
  },
  {
    title: "Tender 2",
    description: "Detailed description about tender 2",
    visibility: "private",
    invited_suppliers: ["supplier3@example.com"],
    create_at: "2024-11-09",
  },
  {
    title: "Tender 3",
    description: "Detailed description about tender 3",
    visibility: "public",
    invited_suppliers: ["supplier1@example.com"],
    create_at: "2024-11-08",
  },
  {
    title: "Tender 4",
    description: "Detailed description about tender 4",
    visibility: "private",
    invited_suppliers: ["supplier4@example.com", "supplier5@example.com"],
    create_at: "2024-11-07",
  },
  {
    title: "Tender 5",
    description: "Detailed description about tender 5",
    visibility: "public",
    invited_suppliers: ["supplier2@example.com"],
    create_at: "2024-11-06",
  },
  {
    title: "Tender 6",
    description: "Detailed description about tender 6",
    visibility: "private",
    invited_suppliers: ["supplier6@example.com"],
    create_at: "2024-11-05",
  },
  {
    title: "Tender 7",
    description: "Detailed description about tender 7",
    visibility: "public",
    invited_suppliers: ["supplier7@example.com", "supplier8@example.com"],
    create_at: "2024-11-04",
  },
  {
    title: "Tender 8",
    description: "Detailed description about tender 8",
    visibility: "private",
    invited_suppliers: ["supplier9@example.com"],
    create_at: "2024-11-03",
  },
  {
    title: "Tender 9",
    description: "Detailed description about tender 9",
    visibility: "public",
    invited_suppliers: ["supplier1@example.com", "supplier9@example.com"],
    create_at: "2024-11-02",
  },
  {
    title: "Tender 10",
    description: "Detailed description about tender 10",
    visibility: "private",
    invited_suppliers: ["supplier10@example.com"],
    create_at: "2024-11-01",
  },
];

const ContractorsPage = () => {
  const [data, setData] = useState(sampleData);
  const [visibilityFilter, setVisibilityFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);  // Mở hoặc đóng hộp thoại
  const [editDialogOpen, setEditDialogOpen] = useState(false);  // Hộp thoại chỉnh sửa

  const handleVisibilityChange = (event: SelectChangeEvent<string>) => {
    setVisibilityFilter(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDateFilter(event.target.value as string);
  };

  const handleDelete = () => {
    setOpenDialog(true);  // Mở hộp thoại xác nhận
  };

  const confirmDelete = () => {
    setOpenDialog(false);  // Mở hộp thoại xác nhận
    console.log("Successfull")
  };

  const handleEdit = () => {
    setEditDialogOpen(true);  // Mở hộp thoại chỉnh sửa
    console.log('Editing item:');
  };
  const handleSaveEdit = () => {
    setEditDialogOpen(false);

  };
  const filteredData = data.filter((item) => {
    const matchesVisibility = visibilityFilter === "all" || item.visibility === visibilityFilter;
    const matchesDate = dateFilter ? item.create_at === dateFilter : true;
    return matchesVisibility && matchesDate;
  });

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
        Contractors
      </Typography>
      <Box sx={{
        backgroundColor: "#fff",
        padding: '20px', 
        borderRadius: "10px",
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Bóng mờ màu xám nhạt
        marginBottom: "10px"
      }}
        >      
        <Box sx={{ display: 'flex', gap: '16px', mb: 2, alignItems: 'center' }}>
        <FormControl variant="outlined" sx={{ minWidth: 150, fontSize: '14px' }} className='!p-[10px]'>
          <InputLabel sx={{ fontSize: '14px' }}>Visibility</InputLabel>
          <Select value={visibilityFilter} onChange={handleVisibilityChange} label="Visibility" sx={{ fontSize: '14px' }}>
            <MenuItem value="all" sx={{ fontSize: '14px' }}>All</MenuItem>
            <MenuItem value="public" sx={{ fontSize: '14px' }}>Public</MenuItem>
            <MenuItem value="private" sx={{ fontSize: '14px' }}>Private</MenuItem>
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
            setVisibilityFilter("all");
            setDateFilter("");
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
          Search
        </Button>
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
                <TableCell sx={{ fontWeight: 'bold', color: '#ffffff' }}>Created At</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#ffffff' }}>Actions</TableCell> {/* Cột mới */}
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
                  <TableCell>{item.create_at}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit()} sx={{ mr: 1 }}>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleDelete()} color="error">
                      <DeleteIcon />
                    </Button>
                  </TableCell> {/* Cột Action */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Hộp thoại xác nhận xóa */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this tender?
        </DialogContent>
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
          <TextField
            label="Title"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            sx={{ mb: 2 }}

          />
          <TextField
            label="Visibility	"
            fullWidth
            sx={{ mb: 2 }}

          />
          <TextField
            label="Invited Suppliers	"
            fullWidth
            sx={{ mb: 2 }}

          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            sx={{ mb: 2 }}

            InputLabelProps={{
              shrink: true,  // Làm cho label luôn hiển thị khi có giá trị
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