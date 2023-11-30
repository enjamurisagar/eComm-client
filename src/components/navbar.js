import React from "react";
import Helper from "../helpers";
import {
  Box,
  Typography,
  Button,
  IconButton,
  NativeSelect,
  FormControl,
  InputBase,
  MenuItem,
  Select,
  Badge,
} from "@mui/material";
import FlexBetween from "../utils/FlexBetween";
//icons
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link, useNavigate } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
// import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {
    palette,
    dispatch,
    setMode,
    isNonMobileScreens,
    mode,
    navigate,
    user,
    api,
    // setLogout,
  } = Helper();
  // const fullName = user?.firstName + " " + user?.lastName;

  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <FlexBetween
      height={isNonMobileScreens ? "4rem" : "3rem"}
      width="100%"
      backgroundColor={palette.background.alt}
      sx={{ position: "fixed", top: 0, left: 0, zIndex: 2 }}
    >
      <FlexBetween width="80%" sx={{ m: "auto" }}>
        {/* logo */}
        <Box>
          <Typography
            variant={isNonMobileScreens ? "h2" : "h5"}
            color={palette.primary.main}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => navigate("/")}
          >
            eCOMM
          </Typography>
        </Box>
        {/* nav-m */}
        <Box>
          <FlexBetween gap="1rem">
            <Link to="/store" style={{ textDecoration: "none" }}>
              <Typography
                color={palette.primary.dark}
                variant={isNonMobileScreens ? "h5" : "h6"}
              >
                STORE
              </Typography>
            </Link>
            <IconButton onClick={() => dispatch(setMode())}>
              {mode === "light" ? (
                <DarkModeIcon
                  sx={{
                    color: palette.neutral.main,
                  }}
                />
              ) : (
                <LightModeIcon
                  sx={{
                    color: palette.neutral.main,
                  }}
                />
              )}
            </IconButton>
          </FlexBetween>
        </Box>
        {/* nav-r */}
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => navigate("/cart")} sx={{ mx: 1 }}>
            <Badge
              badgeContent={user?.cart.length ? user?.cart.length : null}
              color="primary"
            >
              <ShoppingCartIcon color="action" />
            </Badge>
          </IconButton>

          {isAuth ? (
            <IconButton onClick={() => navigate("/me")}>
              <img
                src={`${api}/assets/${user.picturePath}`}
                alt="user"
                width={30}
                height={30}
                style={{ borderRadius: "50%" }}
              />
            </IconButton>
          ) : (
            <Link to="/auth" style={{ textDecoration: "none" }}>
              <Typography
                color={palette.primary.dark}
                variant={isNonMobileScreens ? "h5" : "h6"}
              >
                LOGIN/REGISTER
              </Typography>
            </Link>
          )}
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
