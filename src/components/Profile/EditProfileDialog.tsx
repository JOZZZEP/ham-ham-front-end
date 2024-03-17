import { Button, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, useRef, useState } from "react";
import DefaultPic from "../../assets/DefaultPic.png";
import { AuthService } from "../../services/AuthService";
import CustomButton from "../CustomButtom/CustomButton";
import CustomDialog from "../CustomDialog/CustomDialog";
import CustomTextField from "../CustomTextfield/CustomTextField";

export const EditProfileDialog = (props: any) => {
  const nameRef = useRef<HTMLInputElement>();
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const rePasswordRef = useRef<HTMLInputElement>();
  const authService = new AuthService();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const name = nameRef.current?.value;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    authService.register({
      name: name,
      username: username,
      password: password,
      avatar: avatarFile,
    });
  };

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setAvatarFile(event.target.files[0]);
    }
  }
  const resetFileInput = () => {
    const fileInput = document.getElementById(
      "avatar-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };
  return (
    <CustomDialog open={props.open}>
      <Box sx={{ backgroundColor: "white", p: 3, borderRadius: 3 }}>
        <Box sx={{ display: "flex", gap: 3, backgroundColor: "white" }}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CardMedia
              component="img"
              sx={{
                borderRadius: "50%",
                aspectRatio: "1/1",
              }}
              image={avatarFile ? URL.createObjectURL(avatarFile) : DefaultPic}
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="avatar-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="avatar-upload">
              <Button
                variant="contained"
                size="small"
                sx={{
                  fontSize: "1.2rem",
                  borderRadius: "10rem",
                  backgroundColor: "rgb(240, 165, 70)",
                  boxShadow: 0,
                  ":hover": {
                    backgroundColor: "rgb(200, 120, 20)",
                    boxShadow: 0,
                  },
                }}
                component="span"
                fullWidth
                onClick={() => resetFileInput()}
              >
                <Typography color={"white"} variant="body1">
                  UPLOAD
                </Typography>
              </Button>
            </label>
          </Box>
          <Box
            sx={{
              flex: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <CustomTextField
              fullWidth
              inputRef={nameRef}
              label="Name"
              sx={{ fontSize: "1rem" }}
            />
            <CustomTextField
              fullWidth
              inputRef={usernameRef}
              label="Username"
              sx={{ fontSize: "1rem" }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            mt: 4,
            flex: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CustomTextField
            fullWidth
            inputRef={passwordRef}
            label="Password"
            type="password"
          />
          <CustomTextField
            fullWidth
            inputRef={rePasswordRef}
            label="New Password"
            type="password"
          />
        </Box>
        <Box
          sx={{
            mt: 4,
            flex: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CustomButton width="100px" size={"large"} onClick={props.onClose}>
            Close
          </CustomButton>
          <CustomButton width="100px" size={"large"}>
            Save
          </CustomButton>
        </Box>
      </Box>
    </CustomDialog>
  );
};
