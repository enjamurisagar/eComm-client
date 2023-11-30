import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Helper from "../helpers";
import { Link } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import ProductCard from "./ProductCard";
// import Slider from "react-slick";

const TrendingProducts = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { palette, navigate, api } = Helper();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    setIsLoading(true);
    await axios.get(`${api}/products`).then((response) => {
      const trendingProducts = response.data;
      // response?.data?.filter(
      //   (product) => product.category === "trending"
      // );
      const products = trendingProducts.map((product) => {
        return { ...product, display: false };
      });
      const slicedProducts = products.slice(0, 6);

      setTrendingProducts(slicedProducts);
      setIsLoading(false);
    });
  };

  const showExtraDetails = (id) => {
    const productsFiltered = trendingProducts.map((product) => {
      return product._id === id
        ? { ...product, display: true }
        : { ...product, display: false };
    });
    setTrendingProducts(productsFiltered);
  };

  const closeExtraDetails = () => {
    const productsFiltered = trendingProducts.map((product) => {
      return { ...product, display: false };
    });
    setTrendingProducts(productsFiltered);
  };

  const skeletonList = [1, 1, 1, 1, 1, 1];

  //

  return (
    <Box my={3}>
      <Box display="flex" justifyContent="space-between" mx="2.5%">
        <Typography variant="h3">
          New & <span style={{ color: "red" }}>Trending</span>
        </Typography>

        <Link to="/store">
          <Button variant="contained" size="small">
            <Typography variant="h6">View All</Typography>
          </Button>
        </Link>
      </Box>

      <Stack
        direction={{ xs: "column", md: "row" }}
        width={{ xs: "100%", md: "95%" }}
        m="2rem auto"
        flexWrap="wrap"
        gap={4}
        // bgcolor="red"
        justifyContent="center"
        alignItems="center"
      >
        {isLoading
          ? skeletonList.map((item, i) => (
              <Box
                width={350}
                height={400}
                key={i}
                backgroundColor={palette.background.alt}
              >
                {/* image */}
                <Box display="flex" justifyContent="center">
                  <Skeleton
                    variant="rectangular"
                    width={200}
                    height={200}
                    sx={{ borderRadius: 2, my: 2 }}
                  />
                </Box>
                {/* title */}
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "20px", ml: 2, mb: 2 }}
                  width={200}
                />
                {/* subcategories */}
                <Box display="flex" gap={1} mx={2}>
                  <Skeleton variant="rectangular" width={75} height={25} />
                  <Skeleton variant="rectangular" width={75} height={25} />
                  <Skeleton variant="rectangular" width={75} height={25} />
                </Box>
                {/* description */}
                <Skeleton
                  variant="text"
                  sx={{ fontSize: 20, ml: 2 }}
                  width={300}
                />
                {/* prices and discounts */}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-evenly"
                  mt={1}
                >
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "32px" }}
                    width={100}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "32px" }}
                    width={100}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "32px" }}
                    width={100}
                  />
                </Box>
              </Box>
            ))
          : trendingProducts?.map((product, i) => (
              <ProductCard
                product={product}
                showExtraDetails={showExtraDetails}
                closeExtraDetails={closeExtraDetails}
                key={i}
              />
            ))}
      </Stack>
      <Box display="flex" justifyContent="center">
        <Button variant="contained" onClick={() => navigate("/store")}>
          Show More
        </Button>
      </Box>

      {/* skeleton */}
    </Box>
  );
};

export default TrendingProducts;
