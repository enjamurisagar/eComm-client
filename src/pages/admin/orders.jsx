import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Helper from "../../helpers";
import { DataGrid } from "@mui/x-data-grid";
import MenuIcon from "@mui/icons-material/Menu";

const Orders = () => {
  const [rows, setRows] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const { palette, adminToken, api } = Helper();

  const columns = [
    { field: "id", headerName: "Sno", width: 50 },
    {
      field: "pictureAndEmail",
      headerName: "",
      width: 300,
      renderCell: (params) => (
        <>
          <img
            style={{ borderRadius: "50%", margin: "0 1rem" }}
            src={`${api}/assets/${params.row.picturePath}`}
            alt="qde"
            width={50}
          />
          <Typography>{params.row.email}</Typography>
        </>
      ),
    },
    {
      field: "orders",
      headerName: "Orders",
      width: 200,
    },
  ];

  const getUsersWithOrders = async () => {
    const resp = await fetch(`${api}/admin/getAllUsersWithOrders`, {
      method: "GET",
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const data = await resp.json();
    console.log(data);
    if (!data.msg && data !== null) {
      // setRows(data);
      const rowsFiltered = data.map((user, index) => {
        return {
          id: index,
          email: user.email,
          picturePath: user.picturePath,
          orders: user.orders,
        };
      });
      const splittedRows = [];
      let c = 0;
      for (let i in rowsFiltered) {
        let v = 0;
        for (let j in rowsFiltered[i]) {
          splittedRows.push({
            id: c + 1,
            email: rowsFiltered[i].email,
            picturePath: rowsFiltered[i].picturePath,
            orders: rowsFiltered[i].orders[v],
          });
          v += 1;
          c += 1;
        }
      }
      // console.log(splittedRows);
      setRows(splittedRows);
    } else {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    getUsersWithOrders();
  }, []);

  console.log(openPopup);
  return (
    <Box width="100%">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}

        // checkboxSelection
        // sx={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}
      />
    </Box>
  );
};

export default Orders;
