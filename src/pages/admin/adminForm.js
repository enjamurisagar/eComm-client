import React from "react";
import { useForm } from "react-hook-form";
import Helper from "../../helpers";
import { Box, Button, TextField } from "@mui/material";

const AdminForm = () => {
  const { setAdminLogin, dispatch, palette, isNonMobileScreens, api } =
    Helper();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const handleAdmin = async (values) => {
    const response = await fetch(
      // "https://enjamurisagar-mern.vercel.app/admin/login",
      `${api}/admin/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.adminToken) {
      dispatch(
        setAdminLogin({ admin: data.admin, adminToken: data.adminToken })
      );
    }
  };

  return (
    <Box
      width={isNonMobileScreens ? "50%" : "94%"}
      backgroundColor={palette.background.alt}
      p="1.5rem"
      mt="2rem"
    >
      <form onSubmit={handleSubmit(handleAdmin)}>
        {/* email */}
        <Box display="grid" width="100%" m=".75rem 0">
          <TextField
            label="Email"
            type="email"
            {...register(
              "email",
              { required: true },
              { pattern: /\b[\w.-]+@[\w\.-]+\.\w{2,4}\b/gi }
            )}
          />
          {errors.email && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </Box>
        {/* pass */}
        <Box display="grid" width="100%" m="1rem 0">
          <TextField
            label="Password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
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
            ADMIN LOGIN
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AdminForm;
