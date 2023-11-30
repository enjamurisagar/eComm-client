import React from "react";
import Helper from "../../helpers";
import { Box } from "@mui/material";

import AdminForm from "./adminForm";
import AdminPanel from "./adminPanel";

const Admin = () => {
  const { adminToken } = Helper();

  return (
    <Box width="100%" height="auto" display="flex" justifyContent="center">
      {!adminToken ? <AdminForm /> : <AdminPanel />}
    </Box>
  );
};

export default Admin;
