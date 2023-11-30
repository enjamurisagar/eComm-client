import { Box, Button, Skeleton, Typography } from "@mui/material";
import React from "react";

import Helper from "../../helpers";
const MeRight = () => {
  const { user, isNonMobileScreens, dispatch, setLogout, navigate, api } =
    Helper();
  return (
    <Box p={1}>
      <Box display="flex" justifyContent="center">
        {user?.picturePath ? (
          <img
            src={`${api}/assets/${user?.picturePath}`}
            alt="r"
            width={isNonMobileScreens ? 200 : 100}
            height={isNonMobileScreens ? 200 : 100}
            style={{
              borderRadius: "50%",
            }}
          />
        ) : (
          <Skeleton
            variant="circular"
            sx={{
              width: isNonMobileScreens ? 200 : 100,
              height: isNonMobileScreens ? 200 : 100,
            }}
          />
        )}
      </Box>
      <Box m={1}>
        <Typography variant="h5" display="flex" my={1} sx={{}}>
          Name :
          <span
            style={{
              fontStyle: "italic",
              marginLeft: "5px",
              fontWeight: "bold",
            }}
          >
            {user?.firstName} {user?.lastName}
          </span>
        </Typography>
        {/* email */}
        <Typography variant="h5" display="flex" my={1}>
          Email :
          <span
            style={{
              fontStyle: "italic",
              marginLeft: "5px",
            }}
          >
            {user?.email}
          </span>
        </Typography>
        {/* location */}
        <Typography variant="h5" display="flex" my={1}>
          Location :
          <span
            style={{
              fontStyle: "italic",
              marginLeft: "5px",
            }}
          >
            {user?.location}
          </span>
        </Typography>
        {/* joined */}
        <Typography variant="h5" display="flex" my={1}>
          Joined on :
          <span
            style={{
              fontStyle: "italic",
              marginLeft: "5px",
            }}
          >
            {user?.createdAt.slice(0, 10)}
          </span>
        </Typography>
      </Box>
      <Button
        fullWidth
        variant="contained"
        sx={{
          my: 2,
        }}
        size="large"
        onClick={() => {
          dispatch(setLogout());
          navigate("/auth");
        }}
      >
        log out
      </Button>
    </Box>
  );
};

export default MeRight;
