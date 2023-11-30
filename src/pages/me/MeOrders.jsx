import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Helper from "../../helpers";

const MeOrders = () => {
  const { user, navigate } = Helper();

  return (
    <Box>
      {!user?.orders.length ? (
        <Box display="grid" justifyContent="center" gap={2}>
          <Typography variant="h5">No orders yet</Typography>
          <Button
            width="80%"
            fullWidth
            variant="contained"
            onClick={() => navigate("/store")}
          >
            Let's shop
          </Button>
        </Box>
      ) : (
        <Box>{user?.orders.length} orders</Box>
      )}
    </Box>
  );
};

export default MeOrders;
