import {
  Box,
  Button,
  CardMedia,
  IconButton,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Helper from "../helpers";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import RemoveIcon from "@mui/icons-material/Remove";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "@emotion/styled";
import Marquee from "react-fast-marquee";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import GoToTop from "./goToTop";

const SingleProduct = () => {
  const { palette, isNonMobileScreens, mode, user, setUserCart, api } =
    Helper();
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);
  const [product, setProduct] = useState([]);
  const [mayLikeProducts, setMayLikeProducts] = useState([]);
  const [productCount, setProductCount] = useState(1);
  const { id } = useParams();

  const [isImageActive, setIsImageActive] = useState([
    { id: 0, active: true },
    { id: 1, active: false },
    { id: 2, active: false },
  ]);

  const [review, setReview] = useState({
    rating: 2,
    message: "",
  });
  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getSingleProduct();
    setReload(false);
  }, [id, reload]);

  const getSingleProduct = async () => {
    const response = await fetch(`${api}/products`);
    const data = await response.json();
    const singleProduct = data.filter((product) => product._id === id);
    setProduct(singleProduct);

    //maylikeproducts
    const category = singleProduct[0].category;

    const maylikeproducts = data.filter(
      (product) => product.category === category && product._id !== id
    );

    setMayLikeProducts(maylikeproducts);

    console.log(category);
  };

  const handleImageActive = (i) => {
    const filtered = isImageActive.map((image) => {
      return image.id === i
        ? { ...image, active: true }
        : { ...image, active: false };
    });
    setIsImageActive(filtered);
  };
  const calculateOriginalPrice = (discount, price) => {
    const originalPrice = price + price * (discount / 100);
    return Math.floor(originalPrice, 3);
  };

  const handleRemoveProductCount = () => {
    if (productCount > 1) setProductCount(productCount - 1);
  };

  const postReview = async () => {
    if (!user) {
      alert("Please register/login");
    } else if (review.message.trim() === "") {
      alert("Message cannot be empty");
    } else {
      const response = await fetch(`${api}/products/product/review/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...review,
          picturePath: user.picturePath,
          fullName: user.firstName + " " + user.lastName,
        }),
      });
      const data = await response.json();
      if (data === "success") {
        setReview({
          rating: 2,
          message: "",
        });
        setReload(true);
      }
    }
  };

  const addToCart = async (product, productCount) => {
    if (!user) {
      alert("Please register/login to add to cart");
      return;
    }
    const response = await fetch(`${api}/auth/addToCart/${user?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: product[0], productCount }),
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

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  return (
    <Box mt={"5rem"}>
      <Box
        sx={{
          width: "90%",
          // height: "25rem",
          backgroundColor: palette.background.alt,
          borderRadius: 5,
          my: 2,
          mx: "auto",
          p: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow: `0 1px 10px 0px ${palette.neutral.medium}`,
        }}
      >
        {/* image */}
        <Box
          sx={{
            width: { xs: "100%", md: "30%" },
            // backgroundColor: "orange",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* image top */}
          {!product.length ? (
            <Skeleton
              variant="rectangular"
              sx={{
                width: { xs: 200, md: 250 },
                height: { xs: 200, md: 250 },
                borderRadius: 5,
              }}
            />
          ) : (
            isImageActive.map(
              (item, i) =>
                isImageActive[i].active && (
                  <CardMedia
                    component="img"
                    image={`${api}/assets/${product[0]?.productImagePath[i]}`}
                    alt={product.productImagePath}
                    sx={{
                      height: { xs: 200, md: 250 },
                      width: { xs: 200, md: 250 },
                      borderRadius: 5,
                    }}
                  />
                )
            )
          )}
          <Box display="flex" gap={2} my={2}>
            {product[0]?.productImagePath.map((image, i) => (
              <CardMedia
                key={i}
                component="img"
                image={`${api}/assets/${product[0]?.productImagePath[i]}`}
                alt={product.productImagePath}
                sx={{
                  height: 50,
                  width: 50,
                  cursor: "pointer",
                  borderRadius: 3,
                  border: isImageActive[i].active
                    ? `3px solid ${palette.primary.main}`
                    : "none",
                  "&:hover": {
                    opacity: 0.5,
                  },
                }}
                onMouseEnter={() => handleImageActive(i)}
                onClick={() => handleImageActive(i)}
              />
            ))}
          </Box>
        </Box>

        {/* details */}
        <Box
          sx={{
            width: { xs: "100%", md: "70%" },
            my: { xs: 3, md: 0 },
          }}
        >
          <Typography sx={{ fontSize: { xs: 20, md: 25 } }}>
            {product[0]?.productName}
          </Typography>
          <Box display="flex" gap={1} my={1}>
            <StyledRating
              name="customized-color"
              defaultValue={product[0]?.rating || 4.5}
              precision={0.5}
              icon={<FavoriteIcon fontSize="inherit" sx={{ color: "red" }} />}
              emptyIcon={
                <FavoriteBorderIcon fontSize="inherit" sx={{ color: "red" }} />
              }
              readOnly
            />

            <Typography>
              {product[0]?.reviews.length > 0 &&
                product[0]?.reviews.length + " reviews"}
            </Typography>
          </Box>

          <Box
            display="flex"
            sx={{
              flexDirection: { xs: "column", md: "row" },
              // backgroundColor: "orange",
            }}
            gap={2}
            my={1}
          >
            {/* left */}
            <Box width={{ xs: "100%", md: "40%" }}>
              {/* cat */}
              <Box
                display="flex"
                gap={1}
                justifyContent={{ xs: "center", sm: "flex-start" }}
              >
                <Button variant="outlined" size="small">
                  {product[0]?.category}
                </Button>
                <Button variant="outlined" size="small">
                  {product[0]?.subCategory}
                </Button>
              </Box>
              {/* price and discount */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent={{ xs: "center", sm: "flex-start" }}
                gap={1}
              >
                <Typography
                  fontSize={20}
                  sx={{ color: "red", textDecoration: "line-through" }}
                >
                  <CurrencyRupeeIcon />
                  {calculateOriginalPrice(
                    product[0]?.discount,
                    product[0]?.price
                  )}
                </Typography>
                <Typography fontSize={30}>
                  <CurrencyRupeeIcon />
                  {product[0]?.price}
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: "lightgreen",
                  textAlign: { xs: "center", sm: "left" },
                }}
                variant="subtitle2"
              >
                {product[0]?.discount} % off
              </Typography>
              {/* add to bag */}
              <Box
                display="flex"
                justifyContent={{ xs: "center", sm: "flex-start" }}
                my={1}
                gap={1}
              >
                {/* add to cart */}
                <Button
                  variant="contained"
                  onClick={() => addToCart(product, productCount)}
                >
                  <Typography fontSize={{ xs: 10 }}>
                    Add{" "}
                    <span style={{ fontSize: "20px", margin: "0 5px" }}>
                      {productCount}
                    </span>{" "}
                    {productCount > 1 ? "products" : "product"} to Bag
                  </Typography>
                </Button>
                <IconButton
                  sx={{ border: `1px solid ${palette.primary.light}` }}
                  onClick={() => setProductCount(productCount + 1)}
                >
                  <PlusOneIcon />
                </IconButton>
                <IconButton
                  sx={{ border: `1px solid ${palette.primary.light}` }}
                  onClick={handleRemoveProductCount}
                >
                  <RemoveIcon />
                </IconButton>
              </Box>
              {/* buy now */}
              <Button
                sx={{
                  my: 2,
                }}
                fullWidth
                variant="outlined"
              >
                BUY NOW
              </Button>
            </Box>
            {/* right */}
            <Box
              width={{ xs: "100%", md: "60%" }}
              sx={{
                backgroundColor: palette.neutral.light,
                height: 200,
                overflow: "scroll",
                p: 2,
                borderRadius: 3,
              }}
            >
              <Typography variant="h4" sx={{ my: 1 }}>
                About Product
              </Typography>

              {product[0]?.productDescription}
              {product[0]?.productDescription}
              {product[0]?.productDescription}
              {product[0]?.productDescription}
              {product[0]?.productDescription}
              {product[0]?.productDescription}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* reviews box*/}
      <Box
        width="95%"
        mx="auto"
        my={5}
        display="flex"
        gap={2}
        flexDirection={{ xs: "column", md: "row" }}
        // sx={{
        //   flexDirection: { xs: "column", md: "row" },
        // }}
      >
        {/* reviews section */}
        <Box
          width={{ xs: "90%", md: "50%" }}
          height="50vh"
          m="auto"
          backgroundColor={palette.neutral.light}
          // border={`1px solid ${palette.primary.main}`}
          borderRadius={3}
          px={2}
          sx={{
            overflow: "scroll",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              position: "sticky",
              top: "0",
              zIndex: 1,
              backgroundColor: palette.neutral.light,
              py: 2,
            }}
          >
            Reviews and ratings...
          </Typography>
          {/* person */}

          <Box display="flex" flexDirection="column-reverse">
            {product[0]?.reviews.length > 0 ? (
              product[0]?.reviews?.map((review, i) => (
                <Box
                  width="90%"
                  my={2}
                  p={1}
                  backgroundColor={palette.background.alt}
                  borderRadius={2}
                  key={i}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    {/* profile icon */}
                    <CardMedia
                      component="img"
                      image={`${api}/assets/${review?.picturePath}`}
                      alt={product?.productImagePath}
                      sx={{
                        height: 40,
                        width: 40,
                        borderRadius: "50%",
                      }}
                    />
                    {/* <AccountCircleIcon /> */}

                    <Typography>
                      {review?.fullName || "Profile name"}
                    </Typography>
                  </Box>
                  {/* rating */}
                  <Box my={1}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={review?.rating}
                      precision={0.5}
                      readOnly
                    />
                  </Box>
                  <Typography>{review?.message}</Typography>
                </Box>
              ))
            ) : (
              <Typography sx={{ textAlign: "center" }} variant="h4">
                No reviews yet
              </Typography>
            )}
          </Box>
        </Box>
        {/* form */}
        <Box
          width={{ xs: "90%", md: "50%" }}
          // height="30vh"
          mx="auto"
          backgroundColor={palette.background.alt}
          borderRadius={3}
          p={2}
          // border={`1px solid ${palette.primary.main}`}
        >
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Wanna review the product ?
          </Typography>
          {/* form */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            my={2}
          >
            <StyledRating
              name="customized-color"
              defaultValue={review.rating}
              // getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
              precision={0.5}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              sx={{ my: 1 }}
              onChange={(event, value) =>
                setReview({ ...review, rating: value })
              }
            />
            <Typography>{labels[review.rating]}</Typography>
            {/* <TextField
              sx={{
                height: 20,
                width: "50%",
              }}
            /> */}
            <textarea
              className="text-area"
              cols={isNonMobileScreens ? "45" : "30"}
              rows="5"
              style={{
                backgroundColor: palette.background.alt,
                outline: "none",
                borderRadius: "16px",
                color: mode === "light" ? "black" : "white",
                padding: "5px 10px",
                fontSize: "20px",
              }}
              value={review.message}
              onChange={(e) =>
                setReview({ ...review, message: e.target.value })
              }
            ></textarea>
            <Button
              sx={{
                my: 1,
                width: "40%",
                p: 1,
              }}
              variant="contained"
              onClick={postReview}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>

      {/* may like products */}
      <Marquee pauseOnHover>
        {mayLikeProducts?.map((product) => (
          <ProductCard product={product} noNeedOfAnyFunction={true} />
        ))}
      </Marquee>
      <GoToTop />
    </Box>
  );
};

export default SingleProduct;
