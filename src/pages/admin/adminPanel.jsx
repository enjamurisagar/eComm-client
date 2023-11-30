import React, { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Helper from "../../helpers";
import AddIcon from "@mui/icons-material/Add";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

//tabs
import AddProduct from "./addProduct";
import Analytics from "./analytics";
import Orders from "./orders";
import Users from "./users";
import Settings from "./settings";

const AdminPanel = () => {
  const [menuValue, setMenuValue] = useState("Add Product");
  const { palette, isNonMobileScreens } = Helper();

  const icons = [
    <AddIcon />,
    <BarChartOutlinedIcon />,
    <ShoppingCartOutlinedIcon />,
    <PeopleOutlinedIcon />,
  ];

  const tabs = {
    "Add Product": <AddProduct />,
    Orders: <Orders />,
    Analytics: <Analytics />,
    Users: <Users />,
    Settings: <Settings />,
  };

  const drawer = (
    <>
      <Toolbar />
      <Divider />
      <List sx={{ width: isNonMobileScreens ? "100%" : "50%" }}>
        {["Add Product", "Orders", "Analytics", "Users"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{
                backgroundColor:
                  menuValue === text ? palette.neutral.light : undefined,
                m: ".25rem",
                borderRadius: ".5rem",
                width: 200,
              }}
              onClick={() => setMenuValue(text)}
            >
              <ListItemIcon>{icons[index]}</ListItemIcon>
              {isNonMobileScreens && <ListItemText primary={text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Settings"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{
                backgroundColor:
                  menuValue === text ? palette.neutral.light : undefined,
                m: ".5rem .25rem",
                borderRadius: ".5rem",
                width: 200,
              }}
              onClick={() => setMenuValue(text)}
            >
              <ListItemIcon>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              {isNonMobileScreens && <ListItemText primary={text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  // const drawerWidth = 250;

  return (
    <Box width="100%" display="flex" justifyContent="space-between">
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box" },
          zIndex: 0,
        }}
        PaperProps={{
          sx: { width: isNonMobileScreens ? "15%" : "7%" },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Box
        sx={{
          width: "85%",
        }}
        display="flex"
        justifyContent="center"
      >
        {tabs[menuValue]}
      </Box>
    </Box>
  );
};

export default AdminPanel;
