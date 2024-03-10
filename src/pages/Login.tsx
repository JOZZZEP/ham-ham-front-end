import {
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import HamHamBanner from "../assets/HamHamBanner.png";
import { useAuthContext } from "../context/AuthContext";
import { UserResponse } from "../model/UserResponse";
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

function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();

  const authService = new AuthService();
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const handleClickLogin = () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (username && password) {
      const user: UserResponse = {
        username: username,
        password: password,
      };
      authService
        .login(user)
        .then((res: UserResponse) => {
          console.log(res);
          if (Object.keys(res).length !== 0) {
            setAuth(true);
          }
        })
        .catch((error) => {
          console.error("Error occurred during login:", error);
        });
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
                <CssTextField
                  inputRef={usernameRef}
                  label="Username"
                  sx={{ fontSize: "1rem" }}
                />
                <CssTextField inputRef={passwordRef} label="Password" />
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
                <Button
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
                  onClick={handleClickLogin}
                >
                  Login
                </Button>
                <Button
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
