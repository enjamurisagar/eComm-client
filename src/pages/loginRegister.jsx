import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import Helper from "../helpers";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexBetween from "../utils/FlexBetween";
// const registerSchema = yup.object().shape({

const Auth = () => {
  const { isNonMobileScreens, palette, dispatch, setLogin, navigate, api } =
    Helper();
  const [picture, setPicture] = useState(null);
  const [pageType, setPageType] = useState("register");

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const submitRegister = async (values) => {
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }

    formData.append("picture", picture);
    formData.append("picturePath", picture.name);
    console.log(formData);

    const response = await fetch(`${api}/auth/register`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!data.msg) {
      setPageType("login");
    }
    console.log(data);
  };
  const submitLogin = async (values) => {
    const response = await fetch(
      // "https://enjamurisagar-mern.vercel.app/auth/login",
      `${api}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (!data.msg) {
      dispatch(setLogin({ user: data.user, token: data.token }));
      navigate("/");
    } else {
      alert(data.msg);
    }
  };

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box
        m="2rem auto"
        backgroundColor={palette.background.alt}
        p="2rem"
        borderRadius="1.5rem"
        width={isNonMobileScreens ? "50%" : "93%"}
      >
        <form
          onSubmit={
            pageType === "register"
              ? handleSubmit(submitRegister)
              : handleSubmit(submitLogin)
          }
        >
          {/* include validation with required or other standard HTML validation rules */}

          <Box
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0,1fr))"
            sx={{
              "& > div": {
                gridColumn: isNonMobileScreens ? "span 2" : "span 4",
              },
            }}
          >
            {/* full name */}
            {pageType === "register" && (
              <>
                <Box
                  display={isNonMobileScreens ? "flex" : undefined}
                  justifyContent="space-between"
                  m=".75rem 0"
                >
                  {/* first name */}
                  <Box
                    display="grid"
                    width={isNonMobileScreens ? "48%" : undefined}
                  >
                    <TextField
                      label="First Name"
                      {...register("firstName", { required: true })}
                      sx={{
                        gridColumn: "span 2",
                        margin: !isNonMobileScreens && ".75rem 0",
                      }}
                    />
                    {errors.firstName && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </Box>
                  {/* last name */}
                  <Box
                    display="grid"
                    width={isNonMobileScreens ? "48%" : undefined}
                  >
                    <TextField
                      label="Last Name"
                      {...register("lastName", { required: true })}
                      sx={{
                        gridColumn: "span 2",
                        margin: !isNonMobileScreens && ".75rem 0",
                      }}
                    />
                    {errors.lastName && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </Box>
                </Box>
                {/* picture */}
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem 0"
                >
                  <Dropzone
                    acceptedFiles=".jpg, .jpeg, .png"
                    multiple={false}
                    onDrop={(acceptedFiles) => setPicture(acceptedFiles[0])}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        p="1rem"
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        <input {...getInputProps()} />
                        {!picture ? (
                          <span>Add picture here</span>
                        ) : (
                          <FlexBetween>
                            <Typography>{picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                {/* location */}
                <Box display="grid" m=".75rem 0">
                  <TextField
                    label="Location"
                    {...register("location", { required: true })}
                  />
                  {errors.location && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                </Box>
              </>
            )}

            {/* email */}
            <Box display="grid" width="100%" m=".75rem 0">
              <TextField
                label="Email"
                type="email"
                {...register(
                  "email",
                  { required: true },
                  { pattern: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi }
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
                {pageType === "register" ? "REGISTER" : "LOGIN"}
              </Button>
            </Box>
            <Typography
              sx={{
                m: ".5rem 0",
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
              onClick={() =>
                setPageType(pageType === "register" ? "login" : "register")
              }
            >
              {pageType === "login"
                ? "Don't have an account? Register here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Auth;
