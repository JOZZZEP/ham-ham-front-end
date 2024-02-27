import { AppBar, IconButton, Toolbar, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import HamHamBanner from "../assets/HamHamBanner.png";
import HamHamSmallBanner from "../assets/HamHamSmallBanner.png";
import Profile from "../assets/profile.png";
import "./Animate.css";

function Header() {
  // const navigate = useNavigate();
  const isSmallThan500 = useMediaQuery("(max-width: 500px)");
  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "rgb(250, 177, 117)", boxShadow: 0, pt: 1 }}
      >
        <Toolbar className="tool-bar">
          <img
            className="bounce-in"
            src={isSmallThan500 ? HamHamSmallBanner : HamHamBanner}
            height={50}
            style={{ filter: "drop-shadow(0 0 2px white" }}
          />
          <Box
            flexGrow={1}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton
              className="bounce-in"
              size="medium"
              onClick={() => {
                console.log("555");
                
              }}
            >
              <img
                src={Profile}
                height={50}
                style={{ filter: "drop-shadow(0 0 5px white)" }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
