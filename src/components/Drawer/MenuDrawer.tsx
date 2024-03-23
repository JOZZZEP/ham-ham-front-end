import GroupsIcon from "@mui/icons-material/Groups";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { BACKGROUND_COLOR } from "../../constant/Constant";
import { useUserContext } from "../../context/UserContext";

export const MenuDrawer = (props: any) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  return (
    <div>
      <Drawer
        anchor="right"
        open={props.open}
        onClose={props.onClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: BACKGROUND_COLOR,
          },
        }}
      >
        <Box sx={{ width: 250 }} onClick={props.onClose}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (location.pathname !== "/") {
                    navigate("/");
                  } else {
                    window.location.reload();
                  }
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <ListItemIcon>
                  <ThumbsUpDownIcon fontSize="large" sx={{ color: "white" }} />
                </ListItemIcon>
                <Typography variant="h4" color={"white"}>
                  Vote
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (location.pathname !== "/rank") {
                    navigate("/rank");
                  } else {
                    window.location.reload();
                  }
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <ListItemIcon>
                  <LeaderboardIcon fontSize="large" sx={{ color: "white" }} />
                </ListItemIcon>
                <Typography variant="h4" color={"white"}>
                  Rank
                </Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
            {user?.role === "admin" && (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (location.pathname !== "/alluser") {
                      navigate("/alluser");
                    } else {
                      window.location.reload();
                    }
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <ListItemIcon>
                    <GroupsIcon fontSize="large" sx={{ color: "white" }} />
                  </ListItemIcon>
                  <Typography variant="h4" color={"white"}>
                    All User
                  </Typography>
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};
