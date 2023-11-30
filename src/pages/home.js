import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import HomeTopCategories from "../components/HomeTopCategories";
import axios from "axios";
import TrendingProducts from "../components/TrendingProducts";
import MostPopularProducts from "../components/MostPopularProducts";
import HomeChild1 from "../components/HomeChild1";
import GoToTop from "../components/goToTop";
import Helper from "../helpers";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const { api } = Helper();
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    await axios.get(`${api}/products`).then((response) => {
      setAllProducts(response.data);
    });
  };
  console.log(allProducts);
  return (
    <Box width="100%" mt={"4.5rem"}>
      {/* Main top cats */}

      <HomeTopCategories />
      <HomeChild1 />
      <TrendingProducts />

      <MostPopularProducts allProducts={allProducts} />
      <GoToTop />
    </Box>
  );
};

export default Home;
