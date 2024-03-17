import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HamHamBanner from "../assets/HamHamBanner.png";
import CustomTextField from "../components/CustomTextfield/CustomTextField";
import { LOCAL_AUTH_TOKEN } from "../constant/Constant";
import { useAuthContext } from "../context/AuthContext";
import { useUserContext } from "../context/UserContext";
import { UserResponse } from "../model/UserResponse";
import { AuthService } from "../services/AuthService";

function LoginPage() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuthContext();

  const authService = new AuthService();
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { setUser } = useUserContext();
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleClickLogin = () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (username && password) {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        Promise.race([
          authService.login({
            username: username,
            password: password,
          }),
          new Promise(() => {
            setTimeout(() => {}, 10000);
          }),
        ])
          .then((res: any) => {
            console.log(res);
            if (res) {
              if (Object.keys(res).length !== 0) {
                const user: UserResponse = {
                  uid: res.user.uid,
                  name: res.user.name,
                  username: res.user.username,
                  avatar: res.user.avatar,
                  role: res.user.role,
                };
                setUser(user);
                setAuth(true);
                localStorage.setItem(LOCAL_AUTH_TOKEN, res.token);
                setSuccess(true);
              }
            } else {
              console.error("Invalid response received during login");
            }
          })
          .catch((error) => {
            if (error.message === "Login request timed out") {
              console.error("Login request timed out");
            } else {
              console.error("Error occurred during login:", error);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };
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
            <Box p={"1rem"}>
              <img
                className="bounce-in"
                src={HamHamBanner}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
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
                  Login
                </Typography>
                <CustomTextField
                  disabled={loading}
                  inputRef={usernameRef}
                  label="Username"
                  sx={{ fontSize: "1rem" }}
                />
                <CustomTextField
                  disabled={loading}
                  inputRef={passwordRef}
                  label="Password"
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
                    variant="contained"
                    disabled={loading}
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
                    onClick={handleClickLogin}
                  >
                    Login
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
                  variant="outlined"
                  disabled={loading}
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
                    navigate("/register");
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}

export default LoginPage;
