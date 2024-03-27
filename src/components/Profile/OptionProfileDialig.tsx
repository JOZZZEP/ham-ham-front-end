import {
  Button,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import DefaultPic from "../../assets/DefaultPic.png";
import { LOCAL_AUTH_TOKEN } from "../../constant/Constant";
import { useAuthContext } from "../../context/AuthContext";
import CustomConfirmDialog from "../CustomDialog/CustomConfirmDialog";
import CustomDialog from "../CustomDialog/CustomDialog";

import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUserContext } from "../../context/UserContext";
import { EditProfileDialog } from "./EditProfileDialog";

export const OptionProfileDialog = (props: any) => {
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const { setAuth } = useAuthContext();
  const { setUser } = useUserContext();
  return (
    <>
      <CustomDialog open={props.open} onClose={props.onClose} maxWidth={"xs"}>
        <Box sx={{ display: "flex", flexWrap:"wrap", p: 2 }}>
          <Box sx={{ flex: "1 0 100px" }}>
            <CardMedia
              component="img"
              sx={{ borderRadius: "50%", aspectRatio: "1/1" }}
              image={props.user?.avatar ? props.user.avatar : DefaultPic}
            />
          </Box>
          <Box
            sx={{
              flex: "2 0 200px",
              display: "flex",
              flexDirection: "column",
              pl: 2,
            }}
          >
            <CardContent sx={{ position: "relative" }}>
              <Typography component="div" variant="h6">
                {props.user?.name}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                component="div"
              >
                @{props.user?.username}
              </Typography>
              <Tooltip title={"Edit Profile"}>
                <IconButton
                  size={"large"}
                  sx={{ position: "absolute", right: 0, top: 0 }}
                  onClick={() => setEditProfileOpen(true)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </CardContent>
          </Box>
        </Box>
        <Box sx={{ display: "flex", p: 1, justifyContent: "center" }}>
          <Button
            variant="contained"
            color="error"
            size="large"
            endIcon={<LogoutIcon />}
            onClick={() => setConfirmOpen(true)}
          >
            Logout
          </Button>
        </Box>
      </CustomDialog>
      <CustomConfirmDialog
        title={"Logout?"}
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setUser(null)
          localStorage.removeItem(LOCAL_AUTH_TOKEN);
          setAuth(false);
        }}
      />
      <EditProfileDialog
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
      />
    </>
  );
};
