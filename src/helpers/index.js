import { useSelector, useDispatch } from "react-redux";
import {
  setMode,
  setLogin,
  setLogout,
  setAdminLogin,
  setAdminLogout,
  setUserCart,
  setUser,
} from "../state";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";

const Helper = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const admin = useSelector((state) => state.admin);
  const adminToken = useSelector((state) => state.adminToken);

  //api
  const api = process.env.REACT_APP_API;

  return {
    palette,
    dispatch,
    user,
    mode,
    token,
    navigate,
    setLogin,
    setMode,
    setLogout,
    isNonMobileScreens,
    admin,
    adminToken,
    setAdminLogin,
    setAdminLogout,
    setUserCart,
    setUser,
    api,
  };
};

export default Helper;
