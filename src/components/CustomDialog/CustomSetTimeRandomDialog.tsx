import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { AdminService } from "../../services/AdminService";
import CustomTextField from "../CustomTextfield/CustomTextField";

const CustomSetTimeRandomDialog = (props: any) => {
  const [timeRandom, setTimeRandom] = useState(0);
  const [loading, setLoading] = useState(true);
  const adminService = new AdminService();
  const { user} = useUserContext();
  useEffect(() => {
    setLoading(true);
    adminService
      .getTimeRandom()
      .then((res) => {
        if (res.response) {
          setTimeRandom(res.time);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      maxWidth={"sm"}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "white",
          animation: "bounce-in 500ms ease-out",
          borderRadius: 3,
        },
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: props.width,
            height: props.height,
          },
        },
      }}
    >
      <DialogContent
        sx={{
          padding: props.padding ?? 2,
        }}
      >
        <Box p={2}>
          <Typography pb={2} variant="h5">
            {props.title}
          </Typography>
          <Box pb={3}>
            <CustomTextField
              disabled={loading}
              autoComplete="off"
              value={timeRandom}
              label="Set Time Random"
              onChange={(e: any) => {
                if (e.target.value < 0) {
                  e.target.value = 0;
                }
                setTimeRandom(e.target.value);
              }}
              type={"number"}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              disabled={loading}
              variant="contained"
              size="large"
              color={props.closeColor ? props.closeColor : "inherit"}
              onClick={props.onClose}
            >
              {props.closeLabel ? props.closeLabel : "Close"}
            </Button>
            <Box sx={{ position: "relative" }}>
              <Button
                disabled={loading}
                variant="contained"
                size="large"
                color={props.confirmColor ? props.confirmColor : "success"}
                onClick={() => {
                  setLoading(true);
                  adminService
                    .updateTimeRandom(user?.uid!, timeRandom)
                    .then(() => props.onClose())
                    .finally(() => setLoading(false));
                }}
              >
                {props.confirmLabel ? props.confirmLabel : "Confirm"}
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
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CustomSetTimeRandomDialog;
