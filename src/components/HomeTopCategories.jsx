import React from "react";

import { Box, CardMedia, Typography } from "@mui/material";

import electronics from "../assets/electronics.png";
import men from "../assets/men.png";
import women from "../assets/women.png";
import kids from "../assets/kids.png";
import home from "../assets/home.png";
import beauty from "../assets/beauty.png";
import mobiles from "../assets/mobiles.png";
import appliances from "../assets/appliances.png";

import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import Helper from "../helpers";

const HomeTopCategories = () => {
  const { mode, palette } = Helper();
  const categories = [
    {
      name: "Electronics",
      img: electronics,
    },
    {
      name: "Men",
      img: men,
    },
    {
      name: "Women",
      img: women,
    },
    {
      name: "Kids",
      img: kids,
    },
    {
      name: "Home",
      img: home,
    },
    {
      name: "Beauty",
      img: beauty,
    },
    {
      name: "Mobiles",
      img: mobiles,
    },
    {
      name: "Appliances",
      img: appliances,
    },
  ];

  return (
    <Box width={{ xs: "100%", md: "70%" }} m="1rem auto">
      <Marquee pauseOnHover>
        {categories.map((cat, i) => (
          <Link
            to="/store"
            style={{
              textDecoration: "none",
              color: mode === "dark" ? "white" : "black",
            }}
            key={i}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mx={2}
              sx={{
                "&:hover img": {
                  xs: "none",
                  md: {
                    border: `1px solid ${palette.primary.main}`,
                    transition: "transform .2s",
                    transform: "scale(0.9)",
                  },
                },
              }}
            >
              <CardMedia
                component="img"
                image={cat.img}
                alt={cat.name}
                sx={{
                  height: { xs: 75, md: 100 },
                  width: { xs: 75, md: 100 },
                  borderRadius: 5,
                }}
              />
              <Typography>{cat.name}</Typography>
            </Box>
          </Link>
        ))}
      </Marquee>
    </Box>
  );
};

export default HomeTopCategories;
