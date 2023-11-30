import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Helper from "../helpers";
import ProductCard from "./ProductCard";
import { storeCategories } from "../lib/storeCategories";
import StoreSingleCategory from "./StoreSingleCategory";
import axios from "axios";

const StoreRightProducts = ({
  allProducts,
  selectedCategory,
  setSelectedCategory,
  filters,
}) => {
  const skeletonList = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const { palette, isNonMobileScreens, api } = Helper();

  // const [storeProducts, setStoreProducts] = useState([]);
  const [categories, setCategories] = useState(storeCategories);
  const [subCategory, setSubCategory] = useState([]);
  const [singleCategoryProducts, setSingleCategoryProducts] = useState([]);

  useEffect(() => {
    filterSingleCategory();
  }, [selectedCategory, subCategory, filters]);

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

  const discountMarks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 30,
      label: "30",
    },
    {
      value: 40,
      label: "40",
    },
    {
      value: 50,
      label: "50",
    },
    {
      value: 60,
      label: "60",
    },
    {
      value: 70,
      label: "70",
    },
  ];

  const filterSingleCategory = async () => {
    if (selectedCategory === "all") {
      await axios.get(`${api}/products`).then((resp) => {
        const products = resp.data;
        const filteredByFilters = products.filter(
          (product) =>
            product.price >= parseInt(minMarks[filters.minPrice / 10].label) &&
            product.price <= parseInt(maxMarks[filters.maxPrice / 10].label) &&
            product.discount >= filters.discount
          // product.rating !== 5 &&
          // product.rating === parseInt(filters.rating)
        );
        setSingleCategoryProducts(filteredByFilters);

        if (filters.rating != 5) {
          const filteredByRating = filteredByFilters.filter(
            (product) => product.rating === parseInt(filters.rating)
          );
          setSingleCategoryProducts(filteredByRating);
        }
      });
    } else {
      const filteredProducts = allProducts?.filter(
        (product) => product.category === selectedCategory
      );
      setSingleCategoryProducts(filteredProducts);
      const isSubCategoryActive = subCategory?.filter(
        (subCategory) => subCategory.active && subCategory
      );
      if (isSubCategoryActive?.length > 0) {
        const filteredSubCatProducts = filteredProducts.filter(
          (product) => product.subCategory === isSubCategoryActive[0]?.subCat
        );
        setSingleCategoryProducts(filteredSubCatProducts);

        //filter by filter
        const filteredByPrice = filteredSubCatProducts.filter(
          (product) =>
            product.price >= parseInt(minMarks[filters.minPrice / 10].label) &&
            product.price <= parseInt(maxMarks[filters.maxPrice / 10].label) &&
            product.discount >= filters.discount
        );
        setSingleCategoryProducts(filteredByPrice);

        if (filters.rating != 5) {
          const filteredByRating = filteredByPrice.filter(
            (product) => product.rating === parseInt(filters.rating)
          );
          setSingleCategoryProducts(filteredByRating);
        }
      } else {
        //filter by filter
        const filteredByPrice = filteredProducts.filter(
          (product) =>
            product.price >= parseInt(minMarks[filters.minPrice / 10].label) &&
            product.price <= parseInt(maxMarks[filters.maxPrice / 10].label) &&
            product.discount >= filters.discount
        );
        setSingleCategoryProducts(filteredByPrice);

        if (filters.rating != 5) {
          const filteredByRating = filteredByPrice.filter(
            (product) => product.rating === parseInt(filters.rating)
          );
          setSingleCategoryProducts(filteredByRating);
        }
      }
    }

    //filter by filters
  };

  const handleCategoryActive = (category) => {
    const categoriesFiltered = categories.map((cat) => {
      return cat.category === category
        ? { ...cat, active: true }
        : { ...cat, active: false };
    });
    setCategories(categoriesFiltered);
    setSelectedCategory(category);
  };
  return (
    <Box width="100%" p={1} mt={{ sx: 0, md: "4rem" }}>
      <Stack
        direction="row"
        flexDirection="row"
        sx={{
          overflowX: "auto",
          justifyContent: { xs: undefined, md: "center" },
          // backgroundColor: "red",
          height: "3.5rem",
          py: 1,
          position: "sticky",
          top: { xs: "3rem", md: "4rem" },
          backgroundColor: palette.background.default,
          zIndex: 2,
        }}
        gap={2}
      >
        {categories.map((category, i) => (
          <Button
            // fullWidth
            variant={category.active ? "contained" : "outlined"}
            onClick={() => handleCategoryActive(category.category)}
            key={i}
            sx={{
              // maxWidth: "40px",
              minWidth: 100,
            }}
          >
            {isNonMobileScreens
              ? category.label
              : category.label.length > 10
              ? category.label.slice(0, 10) + "..."
              : category.label}
          </Button>
        ))}
      </Stack>

      <StoreSingleCategory
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        singleCategoryProducts={singleCategoryProducts}
        setSingleCategoryProducts={setSingleCategoryProducts}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        categories={categories}
        setCategories={setCategories}
        noNeedOfAnyFunction={false}
        //filters
        filters={filters}
      />
    </Box>
  );
};

export default StoreRightProducts;
