import React, { useEffect } from "react";
import { storeCategories } from "../lib/storeCategories";
import { Box, Button, Skeleton, Stack } from "@mui/material";
import ProductCard from "./ProductCard";
import Helper from "../helpers";

const StoreSingleCategory = ({
  selectedCategory,
  singleCategoryProducts,
  setSingleCategoryProducts,
  subCategory,
  setSubCategory,
  setSelectedCategory,
  categories,
  setCategories,
  //filter
  filters,
}) => {
  const { palette, isNonMobileScreens } = Helper();

  useEffect(() => {
    const category = storeCategories.filter(
      (cat) => cat.category === selectedCategory
    );

    // subcat
    const subCat = category[0]?.subCategory?.map((subCat) => {
      return { subCat: subCat, active: false };
    });
    setSubCategory(subCat);

    // // filter by filter
    // if (parseInt(minMarks[filters.minPrice / 10].label) !== 0) {
    //   const filterByFilters = singleCategoryProducts.filter(
    //     (product) =>
    //       product.price >= parseInt(minMarks[filters.minPrice / 10].label)
    //   );
    //   console.log("filter applied");
    //   setSingleCategoryProducts(filterByFilters);
    // }
  }, [selectedCategory]);

  const showExtraDetails = (id) => {
    const productsFiltered = singleCategoryProducts.map((product) => {
      return product._id === id
        ? { ...product, display: true }
        : { ...product, display: false };
    });
    setSingleCategoryProducts(productsFiltered);
  };

  const closeExtraDetails = () => {
    const productsFiltered = singleCategoryProducts.map((product) => {
      return { ...product, display: false };
    });
    setSingleCategoryProducts(productsFiltered);
  };

  const handleActiveSubCategory = (subCat) => {
    const filtered = subCategory.map((subCategory) => {
      return subCategory.subCat === subCat
        ? { ...subCategory, active: true }
        : { ...subCategory, active: false };
    });
    setSubCategory(filtered);
  };
  const skeletonList = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  // console.log(singleCategoryProducts);
  // console.log(filters);

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      my={2}
    >
      {/* sub categories */}
      {selectedCategory !== "all" && (
        <Box
          width={{ xs: "100%", md: "8%" }}
          sx={{
            position: "sticky",
            top: "6.5rem",

            left: 0,
            display: "flex",
            justifyContent: "center",
            backgroundColor: palette.background.default,
            zIndex: 1,
          }}
        >
          {/* sub categories */}
          <Stack
            direction={{ xs: "row", md: "column" }}
            sx={{
              flexDirection: "column",
              overflowX: "auto",
              mb: { xs: 2, md: 0 },
            }}
            gap={1}
          >
            {subCategory?.map((subCat, i) => (
              <Button
                // fullWidth
                size="small"
                variant={subCat.active ? "contained" : "outlined"}
                onClick={() => handleActiveSubCategory(subCat.subCat)}
                key={i}
                sx={{
                  p: 1,
                }}
              >
                {subCat.subCat}
              </Button>
            ))}
          </Stack>
        </Box>
      )}

      {/* products */}
      <Stack
        width={
          selectedCategory === "all"
            ? "100%"
            : !isNonMobileScreens
            ? "100%"
            : "92%"
        }
        // width={{ xs: "100%", md: "92%" }}
        direction="row"
        sx={{
          flexWrap: "wrap",
          overflowX: "auto",
          justifyContent: "center",
        }}
        gap={2}
      >
        {!singleCategoryProducts.length
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
          : singleCategoryProducts.map((product, i) => (
              <ProductCard
                product={product}
                key={i}
                showExtraDetails={showExtraDetails}
                closeExtraDetails={closeExtraDetails}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
                setCategories={setCategories}
              />
            ))}
      </Stack>
    </Box>
  );
};

export default StoreSingleCategory;
