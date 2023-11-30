import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Helper from "../../helpers";
import Dropzone from "react-dropzone";
import FlexBetween from "../../utils/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { storeCategories } from "../../lib/storeCategories";

const AddProduct = () => {
  const [productImage, setProductImage] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  // const chooseSubCategory = {
  //   electronics: [
  //     { value: "mobiles", label: "Mobiles" },
  //     { value: "tablets", label: "Tablets" },
  //     { value: "laptops", label: "Laptops" },
  //   ],
  //   men: [
  //     { value: "topwear", label: "Top wear" },
  //     { value: "bottomwear", label: "Bottom wear" },
  //     { value: "ethnicwear", label: "Ethnic wear" },
  //   ],
  // };

  const { palette, isNonMobileScreens, adminToken, api } = Helper();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCreateProduct = async (values) => {
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    productImage.forEach((image) => formData.append("productPicture", image));
    productImage.forEach((image) =>
      formData.append("productImagePath", image.name)
    );

    console.log(formData);

    const response = await fetch(`http://localhost:5000/admin/products/new`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    if (data.msg) {
      alert(data.msg);
    } else {
      alert("added");
      reset();
      setSubCategory("");
      setProductImage("");
    }
  };

  // const addSubCategory = () => {
  //   if (subCategoryText.trim().length > 0) {
  //     setSubCategory([...subCategory, subCategoryText]);
  //     setSubCategoryText("");
  //   }
  // };
  return (
    <Box
      width={isNonMobileScreens ? "50%" : "94%"}
      backgroundColor={palette.background.alt}
      p="1.5rem"
      mt="2rem"
      borderRadius="1rem"
    >
      <form onSubmit={handleSubmit(handleCreateProduct)}>
        {/* category */}

        <FormHelperText sx={{ mb: 1, fontSize: 14 }}>Category</FormHelperText>
        <Select
          required
          sx={{ width: "100%" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          {storeCategories.map((cat, i) => (
            <MenuItem value={cat.category} key={i}>
              {cat.label}
            </MenuItem>
          ))}
        </Select>

        <FormHelperText sx={{ mb: 1, fontSize: 14 }}>
          Sub Category
        </FormHelperText>
        <Select
          required
          sx={{ width: "100%" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subCategory}
          label="Sub Category"
          onChange={(e) => setSubCategory(e.target.value)}
        >
          {storeCategories.map(
            (cat) =>
              cat.category === category &&
              cat.subCategory.map((subCat, i) => (
                <MenuItem value={subCat} key={i}>
                  {subCat}
                </MenuItem>
              ))
          )}
        </Select>

        {/* product name */}
        <Box display="grid" width="100%" m=".75rem 0">
          <TextField
            label="Product name"
            type="text"
            {...register("productName", { required: true })}
          />
          {errors.productName && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </Box>
        {/* price */}
        <Box display="grid" width="100%" m=".75rem 0">
          <TextField
            label="Price"
            type="number"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </Box>
        {/* discount */}
        <Box display="grid" width="100%" m=".75rem 0">
          <TextField
            label="Discount"
            type="number"
            {...register("discount", { required: true })}
          />
          {errors.discount && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </Box>
        {/* prod description */}
        <Box display="grid" width="100%" m=".75rem 0">
          <TextField
            label="Description"
            type="text"
            {...register("productDescription", { required: true })}
          />
          {errors.productDescription && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </Box>
        {/* image */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gap=".25rem"
          border={`1px solid ${palette.neutral.medium}`}
          borderRadius="5px"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg, .jpeg, .png"
            multiple={false}
            onDrop={(acceptedFiles) =>
              setProductImage([...productImage, acceptedFiles[0]])
            }
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                p="0.5rem"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <input {...getInputProps()} />
                {!productImage[0] ? (
                  <span>Add picture 1 here</span>
                ) : (
                  <FlexBetween>
                    <Typography>{productImage[0]?.name}</Typography>
                    <EditOutlinedIcon />
                  </FlexBetween>
                )}
              </Box>
            )}
          </Dropzone>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gap=".25rem"
          border={`1px solid ${palette.neutral.medium}`}
          borderRadius="5px"
          p="1rem"
          m="1rem 0"
        >
          <Dropzone
            acceptedFiles=".jpg, .jpeg, .png"
            multiple={false}
            onDrop={(acceptedFiles) =>
              setProductImage([...productImage, acceptedFiles[0]])
            }
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                p="0.5rem"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <input {...getInputProps()} />
                {!productImage[1] ? (
                  <span>Add picture 2 here</span>
                ) : (
                  <FlexBetween>
                    <Typography>{productImage[1]?.name}</Typography>
                    <EditOutlinedIcon />
                  </FlexBetween>
                )}
              </Box>
            )}
          </Dropzone>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gap=".25rem"
          border={`1px solid ${palette.neutral.medium}`}
          borderRadius="5px"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg, .jpeg, .png"
            multiple={false}
            onDrop={(acceptedFiles) =>
              setProductImage([...productImage, acceptedFiles[0]])
            }
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                p="0.5rem"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <input {...getInputProps()} />
                {!productImage[2] ? (
                  <span>Add picture 3 here</span>
                ) : (
                  <FlexBetween>
                    <Typography>{productImage[2]?.name}</Typography>
                    <EditOutlinedIcon />
                  </FlexBetween>
                )}
              </Box>
            )}
          </Dropzone>
        </Box>
        {/* size */}
        <Box display="grid" width="100%" m=".75rem 0">
          <TextField
            label="Size"
            type="number"
            {...register("size", { required: true })}
          />
          {errors.size && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </Box>
        {/* stock */}
        <Box display="grid" width="100%" m=".75rem 0">
          <TextField
            label="Stock"
            type="number"
            {...register("stock", { required: true })}
          />
          {errors.stock && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </Box>

        {/* button */}
        <Box>
          <Button
            fullWidth
            type="submit"
            sx={{
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
            }}
          >
            ADD PRODUCT
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddProduct;
