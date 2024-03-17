import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultPic from "../assets/DefaultPic.png";
import { AuthService } from "../services/AuthService";

const CssTextField = styled(TextField)({
  "& label": {
    color: "rgb(200, 120, 20)",
  },
  "& label.Mui-focused": {
    color: "rgb(200, 120, 20)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "rgb(200, 120, 20)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgb(200, 120, 20)",
      borderRadius: "10rem",
    },
    "&:hover fieldset": {
      borderColor: "rgb(200, 120, 20)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgb(200, 120, 20)",
    },
  },
});

function RegisterPage() {
  const authService = new AuthService();
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const nameRef = useRef<HTMLInputElement>();
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const rePasswordRef = useRef<HTMLInputElement>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: any) => {
    setLoading(true);
    event.preventDefault();

    const name = nameRef.current?.value;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    authService
      .register({
        name: name,
        username: username,
        password: password,
        avatar: avatarFile,
      })
      .then(() => {
        navigate("/login", { replace: true });
        setLoading(false);
      });
  };

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setAvatarFile(event.target.files[0]);
    }
  }

  return (
    <>
      <Container maxWidth={"sm"} sx={{ height: "100%" }}>
        <Box
          pt={5}
          pb={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Card sx={{ p: 3, borderRadius: "1rem" }}>
            <CardContent>
              <Box
                className="bounce-in"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  p: "0 1rem",
                }}
              >
                <Typography color={"rgb(200, 120, 20)"} variant="h4">
                  Sign Up
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
                        avatarFile
                          ? URL.createObjectURL(avatarFile)
                          : DefaultPic
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
                    <CssTextField
                      disabled={loading}
                      fullWidth
                      inputRef={nameRef}
                      label="Name"
                      sx={{ fontSize: "1rem" }}
                    />
                    <CssTextField
                      disabled={loading}
                      fullWidth
                      inputRef={usernameRef}
                      label="Username"
                      sx={{ fontSize: "1rem" }}
                    />
                  </Box>
                </Box>
                <CssTextField
                  disabled={loading}
                  inputRef={passwordRef}
                  label="Password"
                  type="password"
                />
                <CssTextField
                  disabled={loading}
                  inputRef={rePasswordRef}
                  label="Repeat Password"
                  type="password"
                />
              </Box>
              <Divider className="bounce-in" sx={{ m: 3 }} />
              <Box
                className="bounce-in"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  p: "0 1rem",
                }}
              >
                <Box sx={{ position: "relative" }}>
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
                    Sign Up
                  </Button>
                  {loading && (
                    <CircularProgress
                      color="warning"
                      size={30}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-15px",
                        marginLeft: "-15px",
                      }}
                    />
                  )}
                </Box>
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
                    navigate(-1);
                  }}
                >
                  Back
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}

export default RegisterPage;
