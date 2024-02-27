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
import { useNavigate } from "react-router-dom";
import HamHamBanner from "../assets/HamHamBanner.png";

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
  const navigate = useNavigate();
  return (
    <>
      <Container maxWidth={"sm"} sx={{ height: "100%"}}>
        <Box
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
                  Register
                </Typography>
                <CssTextField label="Username" sx={{ fontSize:"1rem"}}/>
                <CssTextField label="Password" />
                <CssTextField label="Re-Password" />
              </Box>
              <Divider className="bounce-in" sx={{m:3}}/>
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
                    fontSize:"1.5rem",
                    borderRadius: "10rem",
                    backgroundColor: "rgb(240, 165, 70)",
                    boxShadow:0,
                    ":hover": {
                      backgroundColor: "rgb(200, 120, 20)",
                      boxShadow:0,
                    },
                  }}
                  onClick={() => {
                    navigate("/", { replace: true });
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  sx={{
                    fontSize:"1rem",
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
