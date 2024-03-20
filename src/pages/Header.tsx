import GroupsIcon from "@mui/icons-material/Groups";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
// import MmsIcon from "@mui/icons-material/Mms";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultPic from "../assets/DefaultPic.png";
import HamHamBanner from "../assets/HamHamBanner.png";
import HamHamSmallBanner from "../assets/HamHamSmallBanner.png";
import { MenuDrawer } from "../components/Drawer/MenuDrawer";
import { useAuthContext } from "../context/AuthContext";
import { useUserContext } from "../context/UserContext";
import "../util/Animate.css";

function Header() {
  const navigate = useNavigate();
  const isSmallThan700 = useMediaQuery("(max-width: 700px)");
  const { user } = useUserContext();
  const { auth } = useAuthContext();
  const [drawerOpen, setDrawerOpen] = useState(false);

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
                  src={isSmallThan700 ? HamHamSmallBanner : HamHamBanner}
                  height={45}
                  style={{ filter: "drop-shadow(0 0 2px white" }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          {auth ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {isSmallThan700 ? (
                <Tooltip title="Menu">
                  <IconButton
                    className="bounce-in"
                    onClick={() => {
                      setDrawerOpen(true);
                    }}
                    sx={{
                      backgroundColor: "rgb(196, 128, 73)",
                    }}
                  >
                    <MenuIcon fontSize="large" sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Tooltip title="Vote">
                    <IconButton
                      className="bounce-in"
                      onClick={() => {
                        if (location.pathname !== "/") {
                          navigate("/");
                        }
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      sx={{
                        backgroundColor: "rgb(196, 128, 73)",
                      }}
                    >
                      <ThumbsUpDownIcon
                        fontSize="large"
                        sx={{ color: "white" }}
                      />
                    </IconButton>
                  </Tooltip>
                  {/* <Tooltip title="Feed">
                    <IconButton
                      className="bounce-in"
                      onClick={() => {
                        if (location.pathname !== "/") {
                          navigate("/");
                        }
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      sx={{
                        backgroundColor: "rgb(196, 128, 73)",
                      }}
                    >
                      <MmsIcon fontSize="large" sx={{ color: "white" }} />
                    </IconButton>
                  </Tooltip> */}
                  <Tooltip title="Rank">
                    <IconButton
                      className="bounce-in"
                      onClick={() => {
                        if (location.pathname !== "/rank") {
                          navigate("/rank");
                        }
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      sx={{
                        backgroundColor: "rgb(196, 128, 73)",
                      }}
                    >
                      <LeaderboardIcon
                        fontSize="large"
                        sx={{ color: "white" }}
                      />
                    </IconButton>
                  </Tooltip>
                  {user?.role === "admin" && (
                    <Tooltip title="All User">
                      <IconButton
                        className="bounce-in"
                        onClick={() => {
                          if (location.pathname !== "/alluser") {
                            navigate("/alluser");
                          }
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        sx={{
                          backgroundColor: "rgb(196, 128, 73)",
                        }}
                      >
                        <GroupsIcon fontSize="large" sx={{ color: "white" }} />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              )}
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
                    width: 50,
                    height: 50,
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
      <MenuDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      />
    </>
  );
}

export default Header;
