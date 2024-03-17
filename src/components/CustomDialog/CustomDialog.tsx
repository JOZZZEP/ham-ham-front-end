import { Dialog, DialogContent } from "@mui/material";
const CustomDialog = (props: any) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      maxWidth={props.maxWidth}
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
        {props.children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
