import React, { useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, MenuItem, Select, InputLabel, FormControl, Button, SelectChangeEvent } from '@mui/material';

// Dữ liệu mẫu
const sampleData = [
  {
    title: "Tender 1",
    description: "Mô tả chi tiết về tender 1",
    visibility: "public",
    invited_suppliers: ["supplier1@example.com", "supplier2@example.com"],
    create_at: "2024-11-10",
  },
  {
    title: "Tender 2",
    description: "Mô tả chi tiết về tender 2",
    visibility: "private",
    invited_suppliers: ["supplier3@example.com"],
    create_at: "2024-11-09",
  },
  {
    title: "Tender 3",
    description: "Mô tả chi tiết về tender 3",
    visibility: "public",
    invited_suppliers: ["supplier1@example.com"],
    create_at: "2024-11-08",
  },
  {
    title: "Tender 4",
    description: "Mô tả chi tiết về tender 4",
    visibility: "private",
    invited_suppliers: ["supplier4@example.com", "supplier5@example.com"],
    create_at: "2024-11-07",
  },
  {
    title: "Tender 5",
    description: "Mô tả chi tiết về tender 5",
    visibility: "public",
    invited_suppliers: ["supplier2@example.com"],
    create_at: "2024-11-06",
  },
  {
    title: "Tender 6",
    description: "Mô tả chi tiết về tender 6",
    visibility: "private",
    invited_suppliers: ["supplier6@example.com"],
    create_at: "2024-11-05",
  },
  {
    title: "Tender 7",
    description: "Mô tả chi tiết về tender 7",
    visibility: "public",
    invited_suppliers: ["supplier7@example.com", "supplier8@example.com"],
    create_at: "2024-11-04",
  },
  {
    title: "Tender 8",
    description: "Mô tả chi tiết về tender 8",
    visibility: "private",
    invited_suppliers: ["supplier9@example.com"],
    create_at: "2024-11-03",
  },
  {
    title: "Tender 9",
    description: "Mô tả chi tiết về tender 9",
    visibility: "public",
    invited_suppliers: ["supplier1@example.com", "supplier9@example.com"],
    create_at: "2024-11-02",
  },
  {
    title: "Tender 10",
    description: "Mô tả chi tiết về tender 10",
    visibility: "private",
    invited_suppliers: ["supplier10@example.com"],
    create_at: "2024-11-01",
  },
];

const ContractorsPage = () => {
  const [data, setData] = useState(sampleData);
  const [visibilityFilter, setVisibilityFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");

  // Chỉnh sửa kiểu sự kiện cho phù hợp với SelectChangeEvent
  const handleVisibilityChange = (event: SelectChangeEvent<string>) => {
    setVisibilityFilter(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDateFilter(event.target.value as string);
  };

  // Bộ lọc dữ liệu
  const filteredData = data.filter((item) => {
    const matchesVisibility = visibilityFilter === "all" || item.visibility === visibilityFilter;
    const matchesDate = dateFilter ? item.create_at === dateFilter : true; // Lọc theo ngày
    return matchesVisibility && matchesDate;
  });

  return (
    <Container>
      <h1>Contractors</h1>

      {/* Bộ lọc */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <FormControl variant="outlined" style={{ minWidth: 120 }}>
          <InputLabel>Visibility</InputLabel>
          <Select value={visibilityFilter} onChange={handleVisibilityChange} label="Visibility">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="private">Private</MenuItem>
          </Select>
        </FormControl>

        {/* Bộ lọc theo ngày (YYYY-MM-DD) */}
        <TextField
          label="Filter by Date"
          value={dateFilter}
          onChange={handleDateChange}
          fullWidth
          variant="outlined"
          type="date"
          InputLabelProps={{ shrink: true }}
        />

        <Button variant="contained" onClick={() => { setVisibilityFilter("all"); setDateFilter(""); }}>
          Reset Filters
        </Button>
      </div>

      {/* Bảng dữ liệu */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel>Title</TableSortLabel>
              </TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Visibility</TableCell>
              <TableCell>invited Suppliers</TableCell>
              <TableCell>Create At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.visibility}</TableCell>
                <TableCell>{item.invited_suppliers}</TableCell>
                <TableCell>{item.create_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ContractorsPage;
