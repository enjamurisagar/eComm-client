import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Helper from "../../helpers";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

const Users = () => {
  const { adminToken, palette, api } = Helper();
  const [rowsData, setRowsData] = useState([]);

  const getAllUsers = async () => {
    const response = await fetch(`${api}/admin/getAllUsers`, {
      method: "GET",
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const data = await response.json();
    const updatedData = data.map((user, index) => {
      return {
        id: index,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        ordersCount: 15,
        delete: "Delete USER",
      };
    });
    setRowsData(updatedData);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDeleteClick = async (email) => {
    const response = await fetch(`${api}/admin/deleteUser/${email}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    const data = await response.json();
    if (!data.msg && data !== null) {
      getAllUsers();
      alert("User deleted");
    } else {
      alert(data.msg);
    }
  };

  const columns = [
    { field: "id", headerName: "Sno", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "location", headerName: "Location", width: 130 },
    { field: "ordersCount", headerName: "No.of Orders", width: 130 },
    {
      field: "delete",
      headerName: "Delete User",
      width: 150,
      renderCell: (params) => (
        <>
          <DeleteOutlineIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleDeleteClick(params.row.email)}
          />
        </>
      ),
    },
  ];

  return (
    <Box mt="1rem" backgroundColor={palette.background.alt}>
      <DataGrid
        rows={rowsData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        // sx={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}
      />
    </Box>
  );
};

export default Users;
