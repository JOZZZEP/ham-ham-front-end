import LockResetIcon from "@mui/icons-material/LockReset";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, useState } from "react";
import { LOCAL_AUTH_TOKEN } from "../../constant/Constant";
import { useUserContext } from "../../context/UserContext";
import { UserService } from "../../services/UserService";
import CustomDialog from "../CustomDialog/CustomDialog";
import CustomTextField from "../CustomTextfield/CustomTextField";

export const EditProfileDialog = (props: any) => {
  const { user } = useUserContext();
  const [nameInput, setNameInput] = useState(user?.name);
  const [usernameInput, setUsernameInput] = useState(user?.username);
  const [passwordInput, setPasswordInput] = useState("");
  const [newPWInput, setNewPWInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameValid, setUsernameValid] = useState(true);
  const [usernameError, setUsernameError] = useState("");
  const [textFieldError, setTextFieldError] = useState("");
  const userService = new UserService();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isNewPassword, setIsNewPassword] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!usernameValid) {
      return;
    }
    if (passwordInput !== "") {
      setTextFieldError("");
      if (isNewPassword && newPWInput === "") {
        setTextFieldError("Enter New Password");
        return;
      }

      const userEdit = {
        uid: user?.uid,
        name: nameInput,
        username: usernameInput,
        password: passwordInput,
        newPassword: newPWInput !== "" ? newPWInput : "",
        avatar: avatarFile ? avatarFile : user?.avatar,
      };

      setLoading(true);
      userService
        .editUser(userEdit)
        .then((res) => {
          if (res.response) {
            localStorage.setItem(LOCAL_AUTH_TOKEN, res.token);
            window.location.reload();
          } else {
            setTextFieldError(res.error);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setTextFieldError("Confirm Password to Edit");
    }
  };
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setAvatarFile(event.target.files[0]);
      setTextFieldError("");
    }
  }

  function isValidUsername(inputStr: string) {
    const pattern: RegExp = /^[a-zA-Z0-9_]+$/;
    if (!pattern.test(inputStr) && inputStr !== "") {
      setUsernameError("Username a-z A-Z 0-9 _");
      setUsernameValid(false);
    } else {
      setUsernameError("");
      setUsernameValid(true);
    }
    setTextFieldError("");
  }

  return (
    <CustomDialog open={props.open}>
      <Card sx={{ backgroundColor: "white !important", position: "relative" }}>
        {loading && (
          <CircularProgress
            color="warning"
            size={50}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-25px",
              marginLeft: "-25px",
              zIndex: 999,
            }}
          />
        )}
        <CardContent>
          <Box
            className="bounce-in"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 1,
            }}
          >
            <Typography color={"rgb(200, 120, 20)"} variant="h5">
              Edit Profile
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
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
                  image={
                    avatarFile ? URL.createObjectURL(avatarFile) : user?.avatar
                  }
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
                    disabled={loading}
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
                  justifyContent: "start",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CustomTextField
                  disabled={loading}
                  fullWidth
                  value={nameInput}
                  label="Name"
                  onChange={(e: any) => {
                    setNameInput(e.target.value);
                    setTextFieldError("");
                  }}
                />
                <CustomTextField
                  disabled={loading}
                  fullWidth
                  value={usernameInput}
                  label="Username"
                  FormHelperTextProps={{ sx: { color: "red" } }}
                  helperText={usernameError}
                  onChange={(e: any) => {
                    setUsernameInput(e.target.value);
                    isValidUsername(e.target.value);
                  }}
                />
              </Box>
            </Box>
            <CustomTextField
              disabled={loading}
              value={passwordInput}
              autoComplete="off"
              label="Password"
              type="text"
              onChange={(e: any) => {
                setPasswordInput(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title={"Change Password"}>
                      <IconButton
                        onClick={() => {
                          setIsNewPassword((isNew) => !isNew);
                        }}
                      >
                        <LockResetIcon
                          color={isNewPassword ? "success" : "disabled"}
                        />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
            {isNewPassword && (
              <CustomTextField
                disabled={loading}
                value={newPWInput}
                autoComplete="off"
                label="New Password"
                onChange={(e: any) => {
                  setNewPWInput(e.target.value);
                }}
                type={"text"}
              />
            )}
            {textFieldError && (
              <Typography color={"red"} variant="body1">
                *{textFieldError}
              </Typography>
            )}
          </Box>
          <Divider className="bounce-in" sx={{ m: 1 }} />
          <Box
            className="bounce-in"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 1,
            }}
          >
            <Button
              disabled={loading}
              variant="contained"
              fullWidth
              size="large"
              sx={{
                fontSize: "1.3rem",
                borderRadius: "10rem",
                backgroundColor: "rgb(240, 165, 70)",
                boxShadow: 0,
                ":hover": {
                  backgroundColor: "rgb(200, 120, 20)",
                  boxShadow: 0,
                },
              }}
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Button
              disabled={loading}
              variant="outlined"
              fullWidth
              size="large"
              sx={{
                fontSize: "1rem",
                borderRadius: "10rem",
                color: "rgb(240, 165, 70)",
                borderColor: "rgb(240, 165, 70)",
                ":hover": {
                  backgroundColor: "rgb(200, 120, 20)",
                  color: "white",
                  borderColor: "rgb(200, 120, 20)",
                },
              }}
              onClick={() => {
                setNameInput(user?.name!);
                setUsernameInput(user?.username!);
                setPasswordInput("");
                setNewPWInput("");
                setAvatarFile(null);
                props.onClose();
              }}
            >
              Close
            </Button>
          </Box>
        </CardContent>
      </Card>
    </CustomDialog>
  );
};
