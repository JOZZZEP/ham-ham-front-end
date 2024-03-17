import GroupsIcon from "@mui/icons-material/Groups";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LoginIcon from "@mui/icons-material/Login";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import DefaultPic from "../assets/DefaultPic.png";
import HamHamBanner from "../assets/HamHamBanner.png";
import HamHamSmallBanner from "../assets/HamHamSmallBanner.png";
import { useAuthContext } from "../context/AuthContext";
import { useUserContext } from "../context/UserContext";
import "../util/Animate.css";

function Header() {
  const navigate = useNavigate();
  const isSmallThan500 = useMediaQuery("(max-width: 800px)");
  const { user } = useUserContext();
  const { auth } = useAuthContext();

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "rgb(250, 177, 117)", boxShadow: 0 }}
      >
        <Toolbar className="tool-bar">
          <Box flexGrow={1}>
            <Tooltip title={"Vote"}>
              <IconButton
                className="bounce-in"
                size="large"
                onClick={() => {
                  if (location.pathname !== "/") {
                    navigate("/");
                  }
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                sx={{ borderRadius: 4 }}
              >
                <img
                  className="bounce-in"
                  draggable={false}
                  src={isSmallThan500 ? HamHamSmallBanner : HamHamBanner}
                  height={45}
                  style={{ filter: "drop-shadow(0 0 2px white" }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          {auth ? (
            <Box sx={{display:"flex", alignItems:"center"}}>
              {user?.role === "admin" && (
                <Tooltip title="All User" sx={{ mr: 1 }}>
                  <IconButton
                    className="bounce-in"
                    onClick={() => {
                      if (location.pathname !== "/alluser") {
                        navigate("/alluser");
                      }
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <GroupsIcon fontSize="large" sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Rank" sx={{ mr: 1 }}>
                <IconButton
                  className="bounce-in"
                  onClick={() => {
                    if (location.pathname !== "/rank") {
                      navigate("/rank");
                    }
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <LeaderboardIcon fontSize="large" sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Profile">
                <Avatar
                  className="bounce-in"
                  draggable={false}
                  src={user?.avatar ? user.avatar : DefaultPic}
                  sx={{
                    bgcolor: "rgb(250, 177, 117)",
                    filter: "drop-shadow(0 0 2px white)",
                    cursor: "pointer",
                    "&:hover": {
                      opacity: 0.9,
                    },
                  }}
                  onClick={() => {
                    if (location.pathname !== "/profile") {
                      navigate("/profile");
                    }
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </Tooltip>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="success"
              disabled={location.pathname === "/login"}
              size="medium"
              endIcon={<LoginIcon />}
              onClick={() => {
                if (location.pathname !== "/login") {
                  navigate("/login");
                }
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
