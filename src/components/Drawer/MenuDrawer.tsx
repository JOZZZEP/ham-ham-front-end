import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
// import GroupsIcon from "@mui/icons-material/Groups";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
// import LoginIcon from "@mui/icons-material/Login";
// import MenuIcon from "@mui/icons-material/Menu";
// import MmsIcon from "@mui/icons-material/Mms";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import { useNavigate } from "react-router-dom";
import { BACKGROUND_COLOR } from "../../constant/Constant";

export const MenuDrawer = (props: any) => {
  const navigate = useNavigate();
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
          </List>
        </Box>
      </Drawer>
    </div>
  );
};
