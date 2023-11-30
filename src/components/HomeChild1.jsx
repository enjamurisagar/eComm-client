import { Box } from "@mui/material";
import React, { useState } from "react";

import homeImg1 from "../assets/homePage1.jpg";
import homeImg2 from "../assets/homePage2.jpg";
import homeImg4 from "../assets/homePage4.jpg";
import Helper from "../helpers";
import "../App.css";

const HomeChild1 = () => {
  const { isNonMobileScreens } = Helper();
  const [imageShow, setImageShow] = useState(false);
  return (
    <Box sx={{ position: "relative" }} my={"8rem"} mx={2}>
      <Box display="flex" justifyContent="center">
        <img
          src={homeImg1}
          alt={"random"}
          onMouseEnter={() => setImageShow(true)}
          onMouseLeave={() => setImageShow(false)}
          className="home-middle-img"
        />
      </Box>
      <img
        src={isNonMobileScreens ? homeImg4 : ""}
        alt={""}
        style={{
          height: 500,
          // wi dth: 500,
          borderRadius: "40px",
          objectFit: "contain",
          position: "absolute",
          top: "10%",
          left: 0,
          zIndex: imageShow ? -1 : 1,
          opacity: imageShow ? 0.5 : 1,
        }}
      />

      <img
        src={isNonMobileScreens ? homeImg2 : ""}
        alt={""}
        style={{
          height: 500,
          // width: 500,
          borderRadius: "40px",
          objectFit: "contain",
          position: "absolute",
          top: "-10%",
          right: 0,
          zIndex: imageShow ? -1 : 1,
          opacity: imageShow ? 0.5 : 1,
        }}
      />
    </Box>
  );
};

export default HomeChild1;
