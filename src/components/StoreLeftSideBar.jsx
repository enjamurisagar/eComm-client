import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import React, { useState } from "react";
import Helper from "../helpers";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const StoreLeftSideBar = ({ filters, setFilter, showInMobile }) => {
  const { palette, mode } = Helper();

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
  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

  return (
    <Stack
      // mx={1}
      // display="flex"
      direction="row"
      flexDirection="column"
      alignItems="center"
      sx={{
        overflowY: "scroll",
      }}
      height={{ xs: undefined, md: "90vh" }}
      p={1}
      display={{ xs: "none", md: "block" }}
      width="100%"
    >
      <Box display="flex" justifyContent="center">
        <Button
          endIcon={<FilterAltIcon />}
          variant="outlined"
          fullWidth
          sx={{ my: 1, width: "80%" }}
        >
          Filter
        </Button>
      </Box>

      {/* selected filters */}
      <Box width="90%" backgroundColor={palette.neutral.light} borderRadius={2}>
        {(filters?.minPrice > 0 ||
          filters.discount !== 0 ||
          filters?.rating != 5) && (
          <Typography textAlign="center">FILTERS APPLIED</Typography>
        )}
        {(filters?.minPrice > 0 || filters?.maxPrice < 100) && (
          <Box display="flex" alignItems="center">
            <Checkbox checked disabled size="small" />
            <Typography>
              {minMarks[filters.minPrice / 10].label} /- to{" "}
              {maxMarks[filters.maxPrice / 10].label} /-
            </Typography>
          </Box>
        )}
        {filters.discount !== 0 && (
          <Box display="flex" alignItems="center">
            <Checkbox checked disabled size="small" />
            <Typography>Upto {filters.discount} % off</Typography>
          </Box>
        )}
        {filters?.rating != 5 && (
          <Box display="flex" alignItems="center">
            <Checkbox checked disabled size="small" />
            <Typography>{filters.rating} rating</Typography>
          </Box>
        )}
      </Box>

      {/* by price */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography>BY PRICE</Typography>
        <Box
          height={300}
          display="flex"
          gap={2}
          sx={{
            backgroundColor: palette.neutral.light,
            border: mode === "light" && `1px solid ${palette.primary.main}`,
            borderRadius: 2,
          }}
          p={2}
          alignItems="center"
        >
          {/* min */}
          <Box height={250}>
            {/* <Typography>Min value </Typography> */}
            <Slider
              // getAriaLabel={() => "Temperature range"}
              defaultValue={filters?.minPrice}
              onChange={(e, val) => setFilter({ ...filters, minPrice: val })}
              step={10}
              // valueLabelDisplay="auto"
              onKeyDown={preventHorizontalKeyboardNavigation}
              marks={minMarks}
              sx={{
                "& .MuiSlider-markLabel": {
                  fontSize: "10px",
                },
                '& input[type="range"]': {
                  WebkitAppearance: "slider-vertical",
                },
              }}
              orientation="vertical"
            />
          </Box>
          {/* max */}
          <Box height={250}>
            {/* <Typography>Min value </Typography> */}
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={filters.maxPrice}
              onChange={(e, val) => setFilter({ ...filters, maxPrice: val })}
              step={10}
              // valueLabelDisplay="auto"
              marks={maxMarks}
              orientation="vertical"
              onKeyDown={preventHorizontalKeyboardNavigation}
              sx={{
                "& .MuiSlider-markLabel": {
                  fontSize: "10px",
                },
                '& input[type="range"]': {
                  WebkitAppearance: "slider-vertical",
                },
              }}
            />
          </Box>
        </Box>
        <Box display="flex" gap={2}>
          <Typography>
            Min: {minMarks[filters.minPrice / 10].label} /- to Max:{" "}
            {maxMarks[filters.maxPrice / 10].label} /-
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ width: "100%", my: 1 }} />

      {/* by discount */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography sx={{ textAlign: "center" }}>BY DISCOUNT</Typography>
        <Box
          width={200}
          backgroundColor={palette.neutral.light}
          px={2}
          py={1}
          sx={{
            borderRadius: 3,
          }}
        >
          <Slider
            defaultValue={filters.discount}
            step={10}
            marks={discountMarks}
            min={0}
            max={70}
            // getAriaLabel={() => "Temperature range"}
            // value={sliderMinValue}
            onChange={(e, val) => setFilter({ ...filters, discount: val })}
            // valueLabelDisplay="auto"
            onKeyDown={preventHorizontalKeyboardNavigation}
            sx={{
              "& .MuiSlider-markLabel": {
                fontSize: "10px",
              },
              '& input[type="range"]': {
                WebkitAppearance: "slider-vertical",
              },
            }}
          />
        </Box>
        <Typography textAlign="center">
          From {discountMarks[filters?.discount / 10].label} % off
        </Typography>
      </Box>

      <Divider sx={{ width: "100%", my: 1 }} />
      {/* by rating */}
      <Box width="100%">
        <Typography textAlign="center">BY RATING</Typography>
        <FormControl sx={{ mx: 1 }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            // defaultValue="female"
            name="radio-buttons-group"
            onChange={(e, val) => setFilter({ ...filters, rating: val })}
          >
            <FormControlLabel value={4} control={<Radio />} label="4 rating" />
            <FormControlLabel value={3} control={<Radio />} label="3 rating" />
            <FormControlLabel value={2} control={<Radio />} label="2 rating" />
            <FormControlLabel value={1} control={<Radio />} label="1 rating" />
            <FormControlLabel
              value={5}
              control={<Radio />}
              label="No selection"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default StoreLeftSideBar;
