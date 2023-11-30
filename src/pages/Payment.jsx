import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Helper from "../helpers";

import CheckoutForm from "../components/CheckoutForm";
import { Box, Button, CardMedia, Typography } from "@mui/material";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import PaymentImage from "../assets/payment.gif";
import GoToTop from "../components/goToTop";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

export default function Payment() {
  const { user, palette, mode, api } = Helper();
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] = useState(null);

  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    paymentIntent();
    console.log("one time");
  }, []);

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

  const paymentIntent = async () => {
    let totalPrice = 0;

    console.log(user.cart);

    for (let i in user.cart) {
      totalPrice +=
        user.cart[i].product.price * user.cart[i].productCountInCart;
    }

    fetch(`${api}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalPrice,
        // paymentMethodTypes: ["card", "ideal"],
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setClientSecret(data?.clientSecret);
        setStripePromise(loadStripe(data?.publishableKey));
      });
  };

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      sx={{
        width: "80%",
        justifyContent: "center",
        gap: 4,
        mx: "auto",
        // my: 2,
        mt: "4.5rem",
      }}
    >
      {/* left */}
      <Box
        backgroundColor={palette.background.alt}
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: undefined, md: "center" },
          // alignItems: { xs: "center", md: "flex-start" },
          p: 2,
          borderRadius: 3,
          my: { xs: 0, md: 1 },
          border: mode === "light" && `1px solid ${palette.primary.main}`,
        }}
      >
        <Box display="flex" justifyContent="center">
          <CardMedia
            component="img"
            image={PaymentImage}
            alt="payment"
            sx={{
              height: 200,
              width: 200,
              borderRadius: 2,
            }}
          />
        </Box>
        {/* items */}
        <Box>
          {user?.cart.map((cartItem, i) => (
            <Box
              key={i}
              width="90%"
              mx="auto"
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              sx={{
                backgroundColor: palette.background.default,
                my: 1,
                borderRadius: 3,
                border: mode === "light" && `1px solid ${palette.primary.main}`,
              }}
            >
              {/* product image */}
              <Box
                width={{ xs: "100%", md: "25%" }}
                p={1}
                display="flex"
                justifyContent="center"
                gap={1}
              >
                <CardMedia
                  component="img"
                  image={`${api}/assets/${cartItem?.product.productImagePath[0]}`}
                  alt="payment"
                  sx={{
                    height: { xs: 75, md: 100 },
                    width: { xs: 75, md: 100 },
                    borderRadius: 2,
                  }}
                />

                <CardMedia
                  component="img"
                  image={`${api}/assets/${cartItem?.product.productImagePath[1]}`}
                  alt="payment"
                  sx={{
                    height: { xs: 75, md: 100 },
                    width: { xs: 75, md: 100 },
                    borderRadius: 2,
                    display: { xs: "block", md: "none" },
                  }}
                />
                <CardMedia
                  component="img"
                  image={`${api}/assets/${cartItem?.product.productImagePath[2]}`}
                  alt="payment"
                  sx={{
                    height: { xs: 75, md: 100 },
                    width: { xs: 75, md: 100 },
                    borderRadius: 2,
                    display: { xs: "block", md: "none" },
                  }}
                />
              </Box>
              {/* product details */}
              <Box
                width={{ xs: "100%", md: "75%" }}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box m={1}>
                  <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
                    {cartItem?.product?.productName.length > 40
                      ? cartItem?.product?.productName.slice(0, 40) + "..."
                      : cartItem?.product?.productName}
                  </Typography>
                  <Typography>
                    {cartItem?.productCountInCart === 1
                      ? cartItem?.productCountInCart + " product"
                      : cartItem?.productCountInCart + " products"}
                  </Typography>
                  <Typography my={1}>
                    <CurrencyRupeeIcon fontSize="10px" />
                    {cartItem?.product.price} for each
                  </Typography>
                </Box>
                <Button size="large">
                  <CurrencyRupeeIcon />
                  {cartItem?.product?.price * cartItem?.productCountInCart}
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      {/* right */}
      <Box
        backgroundColor={palette.neutral.mediumMain}
        p={4}
        height={450}
        width={{ xs: "100%", md: "30%" }}
        sx={{
          position: { xs: undefined, md: "sticky" },
          top: "5rem",
          borderRadius: 3,
          my: { xs: 2, md: 0 },
          p: { xs: 0, md: 2 },
        }}
      >
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm totalPrice={totalPrice} />
          </Elements>
        )}
      </Box>
      <GoToTop />
    </Box>
  );
}
