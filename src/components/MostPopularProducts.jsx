import {
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Helper from "../helpers";
import { Link } from "react-router-dom";

const MostPopularProducts = ({ allProducts }) => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const {
    isNonMobileScreens,
    palette,
    navigate,
    dispatch,
    setUserCart,
    user,
    api,
  } = Helper();

  useEffect(() => {
    const trendingProducts = allProducts;
    // allProducts?.filter(
    //   (product) => product.category === "mostpopular"
    // );
    const products = trendingProducts.map((product) => {
      return { ...product, display: false };
    });
    const slicedProducts = products.slice(0, 6);

    setTrendingProducts(slicedProducts);
  }, [allProducts]);

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

  const calculateOriginalPrice = (discount, price) => {
    const originalPrice = price + price * (discount / 100);
    return Math.floor(originalPrice, 3);
  };

  const addToCart = async (product) => {
    if (!user) {
      alert("Login/Register to add to Bag");
      return;
    }
    const response = await fetch(
      `http://localhost:5000/auth/addToCart/${user?._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: product, productCount: 1 }),
      }
    );
    const data = await response.json();

    // dispatch(setUserCart({ cart: data }));
    if (!data.msg) {
      alert("addedToCart");
      // updating the user in redux
      dispatch(setUserCart({ cart: data }));
    } else {
      alert(data.msg);
    }
  };

  const addToCartAndBuy = async (product) => {
    if (!user) {
      alert("Login/Register to make purchase");
      return;
    }
    const response = await fetch(
      `http://localhost:5000/auth/addToCart/${user?._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: product, productCount: 1 }),
      }
    );
    const data = await response.json();

    // dispatch(setUserCart({ cart: data }));
    if (!data.msg) {
      alert("addedToCart");
      // updating the user in redux
      dispatch(setUserCart({ cart: data }));
      navigate("/payment");
    } else {
      alert(data.msg);
    }
  };
  return (
    <Box my={3}>
      <Box display="flex" justifyContent="space-between" mx="2.5%">
        <Typography variant="h3">
          Most <span style={{ color: "red" }}>popular</span>
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
        {trendingProducts?.map((product, i) => (
          <Card
            //   onHover={() => showExtraDetails(product._id)}
            onMouseEnter={() => showExtraDetails(product._id)}
            onMouseLeave={() => closeExtraDetails()}
            sx={{
              width: 350,
              height: !isNonMobileScreens ? 420 : 380,
              cursor: "pointer",
              position: "relative",
              overflow: "visible",
            }}
            key={i}
          >
            <Box display="flex" justifyContent="center" my={2}>
              <CardMedia
                component="img"
                image={`${api}/assets/${product?.productImagePath[0]}`}
                alt={product.productImagePath}
                sx={{
                  height: 200,
                  width: 200,
                  borderRadius: 2,
                }}
              />
            </Box>
            <Typography variant="h4" ml={2} mb={1}>
              {product.productName.length > 20
                ? product.productName.slice(0, 30) + "..."
                : product.productName}
            </Typography>

            {/* <Box display="flex" gap={1} mx={2}>
              {product?.subCategory.map((category) => (
                <Button variant="outlined" size="small" key={category}>
                  {category}
                </Button>
              ))}
            </Box> */}
            <Typography variant="subtitle1" ml={2}>
              {product.productDescription.length > 45
                ? product.productDescription.slice(0, 45) + "..."
                : product.productDescription}
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-evenly"
              mt={1}
            >
              <Typography
                variant="h3"
                sx={{ color: "red", textDecoration: "line-through" }}
              >
                <CurrencyRupeeIcon />
                {calculateOriginalPrice(product.discount, product.price)}
              </Typography>
              <Typography variant="h2">
                <CurrencyRupeeIcon />
                {product.price}
              </Typography>
              <Typography sx={{ color: "lightgreen" }} variant="subtitle2">
                {product?.discount} % discount
              </Typography>
            </Box>
            {!isNonMobileScreens && (
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                mt={1}
                mr={isNonMobileScreens ? 6 : 1}
                gap={1}
              >
                <IconButton
                  sx={{
                    border: "1px solid yellow",
                    color: palette.primary.dark,
                  }}
                  onClick={() => addToCart(product)}
                >
                  <AddShoppingCartIcon />
                </IconButton>
                <Button
                  variant="outlined"
                  onClick={() => addToCartAndBuy(product)}
                >
                  BUY NOW
                </Button>
              </Box>
            )}

            {/* extra details */}
            {isNonMobileScreens && product.display && (
              <Box
                sx={{
                  position: "absolute",
                  top: 100,
                  left: 260,
                  zIndex: 1,
                  p: 2,
                  width: 300,
                  height: 300,
                  borderRadius: "40px",
                  borderTopLeftRadius: 0,
                  border: `1px solid ${palette.primary.main}`,
                }}
                backgroundColor={palette.background.default}
              >
                <Box
                  sx={{ width: "100%" }}
                  display="flex"
                  justifyContent="flex-end"
                >
                  <IconButton onClick={closeExtraDetails}>
                    <CloseIcon sx={{ color: palette.primary.light }} />
                  </IconButton>
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  {!product?.stock && ("AVAILABLE" || 100)}
                </Typography>
                <Typography variant="subtitle2">
                  ({product?.stock || 100} in stock)
                </Typography>
                <Typography variant="subtitle" my={1}>
                  SIZE: {product?.size || 10}
                </Typography>
                <Typography variant="subtitle1">
                  {product.productDescription.length > 200
                    ? product.productDescription.slice(0, 200) + "..."
                    : product.productDescription}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-evenly"
                  alignItems="center"
                  mt={1}
                  mr={isNonMobileScreens ? 6 : 1}
                  gap={1}
                >
                  <IconButton
                    sx={{
                      border: "1px solid yellow",
                      color: palette.primary.dark,
                    }}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                  <Button variant="outlined">BUY NOW</Button>
                </Box>
              </Box>
            )}
          </Card>
        ))}
      </Stack>
      <Box display="flex" justifyContent="center">
        <Button variant="contained" onClick={() => navigate("/store")}>
          Show More
        </Button>
      </Box>
    </Box>
  );
};

export default MostPopularProducts;
