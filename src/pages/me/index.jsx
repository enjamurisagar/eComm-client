import React, { useState } from "react";

import Helper from "../../helpers";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";

import MeRight from "./MeRight";
import MeOrders from "./MeOrders";
import MeSettings from "./MeSettings";
import GoToTop from "../../components/goToTop";

const Me = () => {
  const [tabValue, setTabValue] = useState("Me");
  const { palette, isNonMobileScreens } = Helper();

  const tabs = {
    Me: <MeRight />,
    Orders: <MeOrders />,
    Settings: <MeSettings />,
  };

  const icons = [<AccountCircleIcon />, <ShoppingCartIcon />, <SettingsIcon />];

  return (
    <Box
      width={{ xs: "95%", md: "80%" }}
      height="120vh"
      mx="auto"
      // my={5}
      mt={"5rem"}
      mb="2rem"
      p={2}
      backgroundColor={palette.neutral.light}
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent={{ xs: "flex-start" }}
      alignItems={{ xs: "center", md: "flex-start" }}
      borderRadius={3}
    >
      {/* left */}
      <Box
        width={{ xs: "100%", md: "20%" }}
        m={2}
        p={1}
        backgroundColor={palette.background.alt}
        borderRadius={2}
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", sm: "center" },
          overflow: "scroll",
        }}
        // sx={{ border: `1px solid ${palette.neutral.dark}` }}
      >
        <List
          sx={{
            width: isNonMobileScreens ? "100%" : "50%",
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
          }}
        >
          {["Me", "Orders", "Settings"].map((text, i) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor:
                    tabValue === text ? palette.neutral.mediumMain : undefined,
                  m: ".25rem",
                  borderRadius: "1rem",

                  "&:hover": {
                    backgroundColor: palette.neutral.light,
                  },
                }}
                onClick={() => setTabValue(text)}
              >
                <ListItemIcon>{icons[i]}</ListItemIcon>
                {<ListItemText primary={text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      {/* right */}
      <Box
        width={{ xs: "100%", md: "80%" }}
        // height={"90vh"}
        p={1}
        m={2}
        sx={{
          backgroundColor: palette.background.alt,
          borderRadius: 2,
        }}
      >
        {tabs[tabValue]}
      </Box>
      <GoToTop />
    </Box>
  );
};

export default Me;
