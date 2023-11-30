import React, { useEffect, useState } from "react";

import Helper from "../helpers";
import { Box, Button, CardMedia, IconButton, Typography } from "@mui/material";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import RemoveIcon from "@mui/icons-material/Remove";
import { setUserCart } from "../state";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EmptyCart from "../assets/empty_cart.jpg";
import GoToTop from "../components/goToTop";

const Cart = () => {
  const { user, palette, mode, dispatch, navigate, setUser, api } = Helper();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let price = 0;
    if (user?.cart.length) {
      for (let value in user?.cart) {
        price +=
          user?.cart[value].product.price *
          user?.cart[value].productCountInCart;
      }
      setTotalPrice(price);
    }
  }, [user]);
  const incrementCartItem = async (productId) => {
    const response = await fetch(`${api}/auth/incrementCartItem/${user?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    //getting the updated cart from backend
    if (!data.msg) {
      // filtering cart items whose count > 0
      dispatch(setUserCart({ cart: data }));
    } else {
      alert(data.msg);
    }
  };
  const decrementCartItem = async (productId) => {
    const response = await fetch(`${api}/auth/decrementCartItem/${user?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    //getting the updated cart from backend
    if (!data.msg) {
      // filtering cart items whose count > 0
      dispatch(setUserCart({ cart: data }));
    } else {
      alert(data.msg);
    }
  };

  const calculateOriginalPrice = (discount, price) => {
    const originalPrice = price + price * (discount / 100);
    return Math.floor(originalPrice, 3);
  };

  const removeFromCart = async (productId) => {
    const response = await fetch(`${api}/auth/removeFromCart/${user?._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    const data = await response.json();

    if (!data.msg) {
      dispatch(setUser({ user: data }));
    } else {
      alert(data.msg);
    }
  };

  if (!user) {
    return (
      <Box
        mt="4rem"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        width="100%"
      >
        <Box width="100%" display="flex" justifyContent="center">
          <CardMedia
            component="img"
            image={EmptyCart}
            alt={"Empty Cart"}
            sx={{
              height: 250,
              width: 250,
            }}
          />{" "}
        </Box>
        <Typography variant="h4" my={2} textAlign="center">
          Please login/register to see your bag
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      width="95%"
      mx="auto"
      mt="4rem"
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      gap={2}
    >
      {!user?.cart.length && (
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          width={"100%"}
          alignItems="center"
          my={2}
        >
          <CardMedia
            component="img"
            image={EmptyCart}
            alt={"Empty Cart"}
            sx={{
              height: 250,
              width: 250,
            }}
          />
          <Typography variant="h3">No items have been added yet!</Typography>
          <Button
            variant="contained"
            width="50%"
            onClick={() => navigate("/store")}
          >
            Go back to Store
          </Button>
        </Box>
      )}

      {/* left */}
      {user?.cart.length > 0 && (
        <Box width={{ xs: "95%", md: "70%" }} mx="auto">
          {user?.cart?.map((cartItem, i) => (
            <Box
              key={i}
              mx="auto"
              my={2}
              p={2}
              borderRadius={5}
              sx={{
                backgroundColor: palette.neutral.light,
                border: mode === "light" && `2px solid ${palette.primary.main}`,
              }}
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
            >
              {/* left */}
              <Box
                width={{ xs: "95%", md: "20%" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                m={1}
              >
                <CardMedia
                  component="img"
                  image={`${api}/assets/${cartItem?.product?.productImagePath[0]}`}
                  alt={cartItem?.product?.productImagePath[0]}
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: 2,
                  }}
                />
              </Box>
              {/* right */}

              <Box
                width={{ xs: "95%", md: "80%" }}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                gap={2}
                // justifyContent="center"
                // backgroundColor="purple"
              >
                {/* details */}
                <Box
                  width={{ xs: "95%", md: "70%" }}
                  mx="auto"
                  backgroundColor={palette.background.alt}
                  borderRadius={3}
                  p={2}
                >
                  <Typography>{cartItem.product.productDescription}</Typography>
                  {/* price */}
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    // justifyContent="space-evenly"
                    mt={1}
                  >
                    <Typography
                      variant="h3"
                      sx={{ color: "red", textDecoration: "line-through" }}
                    >
                      <CurrencyRupeeIcon />
                      {calculateOriginalPrice(
                        cartItem?.product.discount,
                        cartItem?.product.price
                      )}
                    </Typography>
                    <Typography variant="h2">
                      <CurrencyRupeeIcon />
                      {cartItem.product.price}
                    </Typography>
                    <Typography
                      sx={{ color: "lightgreen" }}
                      variant="subtitle2"
                    >
                      {cartItem.product?.discount} % discount
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    Total price:
                    <Typography variant="h2">
                      <CurrencyRupeeIcon />
                      {cartItem?.product.price *
                        cartItem?.productCountInCart}{" "}
                      /-
                    </Typography>
                  </Box>
                </Box>
                {/* right right */}
                <Box
                  width={{ xs: "95%", md: "30%" }}
                  m="auto"
                  // display="flex"
                  // flexDirection="column"
                  // justifyContent="center"
                  // alignItems="center"
                  backgroundColor={palette.background.alt}
                  p={1}
                  borderRadius={3}
                >
                  <Box>
                    <Typography variant="h5" textAlign="center">
                      {cartItem?.productCountInCart} product(s) added
                    </Typography>
                    {/* + / - */}
                    <Box display="flex" justifyContent="center" my={2} gap={1}>
                      <Box>
                        <IconButton
                          sx={{ border: `1px solid ${palette.primary.light}` }}
                          onClick={() =>
                            incrementCartItem(cartItem?.product?._id)
                          }
                        >
                          <PlusOneIcon />
                        </IconButton>
                      </Box>
                      <Box>
                        <IconButton
                          sx={{ border: `1px solid ${palette.primary.light}` }}
                          onClick={() =>
                            decrementCartItem(cartItem?.product?._id)
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    {/* remove from cart */}
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => removeFromCart(cartItem?.product._id)}
                    >
                      remove from cart
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
      {/* right */}
      {user?.cart.length > 0 && (
        <Box
          width={{ xs: "95%", md: "30%" }}
          backgroundColor={palette.neutral.light}
          height="50vh"
          mx="auto"
          my={2}
          sx={{
            p: 2,
            borderRadius: 5,
            border: mode === "light" && `2px solid ${palette.primary.main}`,
            overflow: "scroll",
            position: "sticky",
            top: { xs: undefined, md: "5rem" },
          }}
        >
          {user?.cart.map((cartItem, i) => (
            <Box display="flex" justifyContent="space-between" my={1}>
              <Typography key={i}>
                {cartItem.product.productName.slice(0, 50)}
              </Typography>
              <Typography variant="h5" display="flex" alignItems="center">
                <CurrencyRupeeIcon />
                {cartItem.product.price * cartItem.productCountInCart}
              </Typography>
            </Box>
          ))}
          <Box display="flex" my={2} justifyContent="center">
            <Typography variant="h4">
              Sub Total:
              <CurrencyRupeeIcon />
              {totalPrice}
            </Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/payment")}
          >
            Check out
          </Button>
        </Box>
      )}
      <GoToTop />
    </Box>
  );
};

export default Cart;
