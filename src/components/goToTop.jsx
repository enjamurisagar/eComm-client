import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import Helper from "../helpers";

const GoToTop = () => {
  const { palette } = Helper();

  const gotToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        right: { xs: "3rem", md: "5rem" },
        bottom: { xs: "3rem", md: "2rem" },
        zIndex: 100,
      }}
    >
      {scrollPosition > 100 && (
        <IconButton
          sx={{
            backgroundColor: palette.neutral.dark,
            //   color: palette.neutral.light,
            "&:hover": {
              backgroundColor: palette.neutral.medium,
            },
          }}
          onClick={gotToTop}
        >
          <NavigationIcon
            sx={{
              color: palette.background.default,
            }}
          />
        </IconButton>
      )}
    </Box>
  );
};

export default GoToTop;
