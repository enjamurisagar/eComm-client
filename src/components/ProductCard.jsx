import {
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import Helper from "../helpers";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ProductCard = ({
  product,
  showExtraDetails,
  closeExtraDetails,
  setSelectedCategory,
  categories,
  setCategories,
  noNeedOfAnyFunction, //from singleProduct.js
}) => {
  const { isNonMobileScreens, palette, user, dispatch, setUserCart, api } =
    Helper();
  const navigate = useNavigate();

  const calculateOriginalPrice = (discount, price) => {
    const originalPrice = price + price * (discount / 100);
    return Math.floor(originalPrice, 3);
  };

  const goToCategory = (category) => {
    //from this parent
    const categoriesFiltered = categories.map((cat) => {
      return cat.category === category
        ? { ...cat, active: true }
        : { ...cat, active: false };
    });
    setCategories(categoriesFiltered);
    setSelectedCategory(category);
  };

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  const addToCart = async () => {
    if (!user) {
      alert("Login/Register to add to Bag");
      return;
    }
    const response = await fetch(`${api}/auth/addToCart/${user?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: product, productCount: 1 }),
    });
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

  const addToCartAndBuy = async () => {
    if (!user) {
      alert("Login/Register to make purchase");
      return;
    }
    const response = await fetch(`${api}/auth/addToCart/${user?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: product, productCount: 1 }),
    });
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
    <Card
      onMouseEnter={
        noNeedOfAnyFunction ? () => {} : () => showExtraDetails(product._id)
      }
      onMouseLeave={noNeedOfAnyFunction ? () => {} : () => closeExtraDetails()}
      sx={{
        width: 350,
        height: !isNonMobileScreens ? 460 : 400,
        cursor: "pointer",
        position: "relative",
        overflow: "visible",
        m: noNeedOfAnyFunction && 3,
        borderRadius: 4,
      }}
    >
      {/* image */}
      <Box
        display="flex"
        justifyContent="center"
        my={2}
        onClick={() => navigate(`/product/${product._id}`)}
      >
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

      <Box display="flex" gap={1} mx={2}>
        <Button
          variant="outlined"
          size="small"
          onClick={
            noNeedOfAnyFunction
              ? () => {}
              : () => goToCategory(product.category)
          }
        >
          {product.category}
        </Button>
        <Button variant="outlined" size="small">
          {product.subCategory}
        </Button>
      </Box>
      <StyledRating
        sx={{ mx: 2, my: 1 }}
        name="customized-color"
        defaultValue={product?.rating || 4.5}
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" sx={{ color: "red" }} />}
        emptyIcon={
          <FavoriteBorderIcon fontSize="inherit" sx={{ color: "red" }} />
        }
        readOnly
      />
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
            onClick={addToCart}
          >
            <AddShoppingCartIcon />
          </IconButton>
          <Button variant="outlined" onClick={addToCartAndBuy}>
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
          <Box sx={{ width: "100%" }} display="flex" justifyContent="flex-end">
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
              onClick={() => addToCart(product._id)}
            >
              <AddShoppingCartIcon />
            </IconButton>
            <Button variant="outlined" onClick={addToCartAndBuy}>
              BUY NOW
            </Button>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default ProductCard;
