import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Helper from "../../helpers";

const MeSettings = () => {
  const { user, isNonMobileScreens, setUser, dispatch, api } = Helper();

  const [newProfilePic, setNewProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editName, setEditName] = useState(false);

  const [userUpdated, setUserUpdated] = useState(user);

  const handleProfilePicture = (image) => {
    setNewProfilePic(image);
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    setUserUpdated({ ...userUpdated, picturePath: image.name });
  };

  const updateUser = async () => {
    const formData = new FormData();

    for (let value in userUpdated) {
      formData.append(value, userUpdated[value]);
    }
    formData.append("picture", newProfilePic);
    console.log(formData);
    const response = await fetch(`${api}/auth/updateUser/${user?._id}`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (!data.msg) {
      dispatch(setUser({ user: data }));
      alert("User updated");
      setPreview(null);
      setEditName(false);
      console.log(data);
    } else {
      alert(data.msg);
      console.log(data.msg);
    }
  };

  if (!user) {
    return <center>Please login/register to update your details</center>;
  }

  return (
    <Box p={2}>
      {/* change picture */}
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <img
          src={!preview ? `${api}/assets/${user?.picturePath}` : preview}
          alt="r"
          width={isNonMobileScreens ? 150 : 100}
          height={isNonMobileScreens ? 150 : 100}
          style={{
            borderRadius: "50%",
          }}
        />
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => handleProfilePicture(e.target.files[0])}
          style={{ textAlign: "center" }}
        />
      </Box>

      {/* change name */}

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={2}
        my={2}
      >
        {/* first name */}
        <TextField
          label="First Name"
          sx={{
            gridColumn: "span 2",
            margin: !isNonMobileScreens && ".75rem 0",
          }}
          value={userUpdated?.firstName}
          disabled={editName ? false : true}
          onChange={(e) =>
            setUserUpdated({ ...userUpdated, firstName: e.target.value })
          }
        />
        {/* last name */}
        <TextField
          label="Last Name"
          sx={{
            gridColumn: "span 2",
            margin: !isNonMobileScreens && ".75rem 0",
          }}
          value={userUpdated?.lastName}
          disabled={!editName ? true : false}
          onChange={(e) =>
            setUserUpdated({ ...userUpdated, lastName: e.target.value })
          }
        />
        <TextField
          label="First Name"
          sx={{
            gridColumn: "span 2",
            margin: !isNonMobileScreens && ".75rem 0",
          }}
          value={userUpdated?.location}
          disabled={editName ? false : true}
          onChange={(e) =>
            setUserUpdated({ ...userUpdated, location: e.target.value })
          }
        />
        <Button
          variant="contained"
          // sx={{ mx: 2 }}
          onClick={() => setEditName(!editName)}
        >
          EDIT?
        </Button>
      </Box>

      {/* location */}

      {/* btns */}
      <Box display="flex" gap={2} my={1} justifyContent="flex-end">
        <Button variant="contained" onClick={updateUser}>
          Update
        </Button>
        <Button variant="outlined" onClick={() => setUserUpdated(user)}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default MeSettings;
