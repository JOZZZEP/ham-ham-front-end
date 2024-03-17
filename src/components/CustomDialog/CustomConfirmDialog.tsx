import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const CustomConfirmDialog = (props: any) => {
  return (
    <Dialog
      open={props.open}
      maxWidth={"sm"}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "rgb(250, 177, 117)",
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
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              disabled={props.loading}
              variant="contained"
              size="large"
              color={props.closeColor ? props.closeColor : "inherit"}
              onClick={props.onClose}
            >
              {props.closeLabel ? props.closeLabel : "Close"}
            </Button>
            <Box sx={{ position: "relative" }}>
              <Button
                disabled={props.loading}
                variant="contained"
                size="large"
                color={props.confirmColor ? props.confirmColor : "success"}
                onClick={props.onConfirm}
              >
                {props.confirmLabel ? props.confirmLabel : "Confirm"}
              </Button>
              {props.loading && (
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

export default CustomConfirmDialog;
