import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Spinner = () => {
  return (
    <Box width="100%" display="flex" justifyContent="center" my={4}>
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
