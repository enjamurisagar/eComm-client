import { Box, Button, Checkbox, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StoreLeftSideBar from "../components/StoreLeftSideBar";
import StoreLeftSideBarMobile from "../components/StoreLeftSideBarMobile";
import StoreRightProducts from "../components/StoreRightProducts";
import axios from "axios";
import Helper from "../helpers";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GoToTop from "../components/goToTop";

const Store = () => {
  const { palette, api } = Helper();
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [showFilterPopup, setShowFilterPopup] = useState(false);

  // for left sidebar
  const [filters, setFilter] = useState({
    minPrice: 0,

    maxPrice: 100,

    discount: 0,

    rating: 5,
  });

  useEffect(() => {
    fetchAllProducts();
  }, []);
  // console.log(filters);

  const fetchAllProducts = async () => {
    await axios.get(`${api}/products`).then((response) => {
      const products = response.data.map((product) => {
        return { ...product, display: false };
      });
      setAllProducts(products);
    });
  };

  const minMarks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 10,
      label: "1500",
    },
    {
      value: 20,
      label: "3000",
    },
    {
      value: 30,
      label: "4000",
    },
    {
      value: 40,
      label: "4500",
    },
    {
      value: 50,
      label: "5000",
    },
    {
      value: 60,
      label: "8000",
    },
    {
      value: 70,
      label: "10000",
    },
    {
      value: 80,
      label: "15000",
    },
    {
      value: 90,
      label: "20000",
    },
    {
      value: 100,
      label: "30000",
    },
  ];

  const maxMarks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 10,
      label: "1500",
    },
    {
      value: 20,
      label: "3000",
    },
    {
      value: 30,
      label: "4000",
    },
    {
      value: 40,
      label: "4500",
    },
    {
      value: 50,
      label: "5000",
    },
    {
      value: 60,
      label: "8000",
    },
    {
      value: 70,
      label: "10000",
    },
    {
      value: 80,
      label: "15000",
    },
    {
      value: 90,
      label: "20000",
    },
    {
      value: 100,
      label: "30000",
    },
  ];

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      mt={{ xs: "3rem", md: 0 }}
    >
      <Box
        width={{ xs: "100%", md: "20%" }}
        sx={{
          position: "sticky",
          top: { xs: 0, md: "4rem" },
          left: 0,
          height: { xs: undefined, md: "95vh" },
        }}
        mt={{ xs: 0, md: "4rem" }}
      >
        {/* will be hidden in mobile */}
        <StoreLeftSideBar filters={filters} setFilter={setFilter} />

        {/* shown in mobile */}
        <Box m={1} display={{ xs: "block", md: "none" }}>
          <Button
            fullWidth
            variant="contained"
            endIcon={<FilterAltIcon />}
            onClick={() => setShowFilterPopup(!showFilterPopup)}
          >
            Apply filters
          </Button>
          {/* selected filters */}
          <Box
            width="90%"
            backgroundColor={palette.neutral.light}
            borderRadius={2}
            my={1}
            mx="auto"
          >
            {(filters?.minPrice > 0 ||
              filters.discount !== 0 ||
              filters?.rating != 5) && (
              <Typography textAlign="center">FILTERS APPLIED</Typography>
            )}
            {filters?.minPrice > 0 && (
              <Box display="flex" alignItems="center">
                <Checkbox checked disabled size="small" />
                <Typography>
                  {minMarks[filters.minPrice / 10].label} /- to{" "}
                  {maxMarks[filters.maxPrice / 10].label} /-
                </Typography>
              </Box>
            )}
            {filters.discount !== 0 && (
              <Box display="flex" alignItems="center">
                <Checkbox checked disabled size="small" />
                <Typography>Upto {filters.discount} % off</Typography>
              </Box>
            )}
            {filters?.rating != 5 && (
              <Box display="flex" alignItems="center">
                <Checkbox checked disabled size="small" />
                <Typography>{filters.rating} rating</Typography>
              </Box>
            )}
          </Box>
          {showFilterPopup && (
            <StoreLeftSideBarMobile
              filters={filters}
              setFilter={setFilter}
              setShowFilterPopup={setShowFilterPopup}
            />
          )}
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box
        width={{ xs: "100%", md: "80%" }}
        sx={{ zIndex: showFilterPopup && -1 }}
      >
        <StoreRightProducts
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          // filters
          filters={filters}
        />
      </Box>
      <GoToTop />
    </Box>
  );
};

export default Store;
