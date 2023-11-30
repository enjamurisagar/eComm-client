import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
// import FlexBetween from "../../utils/FlexBetween";
import Helper from "../../helpers";

const Settings = () => {
  const { palette, isNonMobileScreens, admin, dispatch, setAdminLogout, api } =
    Helper();

  const handleAdminLogout = () => {
    dispatch(setAdminLogout());
  };

  return (
    <Box width="90%" margin="2rem auto" display={isNonMobileScreens && "flex"}>
      {/* left */}
      <Box
        width="30%"
        backgroundColor={palette.neutral.light}
        p="1rem"
        m="0 1rem"
        borderRadius="1rem"
      >
        <Box display="flex" justifyContent="center">
          <img
            src={`${api}/assets/${admin.picturePath}`}
            alt="admin imag"
            width={200}
            style={{ borderRadius: "50%" }}
          />
        </Box>
        <Divider
          sx={{
            margin: ".5rem 0",
          }}
        />
        <Box>
          <Typography
            variant="h5"
            sx={{ fontStyle: "italic", margin: ".5rem 0" }}
          >
            {admin.firstName} {admin.lastName}
          </Typography>
        </Box>
      </Box>

      {/* right */}
      <Box width="70%">
        <Button
          sx={{
            backgroundColor: "red",
            color: "#000",
            "&:hover": {
              backgroundColor: "rgb(150, 10, 0)",
            },
          }}
          onClick={handleAdminLogout}
        >
          ADMIN LOG OUT
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
