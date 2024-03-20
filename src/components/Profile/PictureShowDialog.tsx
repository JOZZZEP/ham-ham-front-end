import CloseIcon from "@mui/icons-material/Close";
import { Dialog, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import DefaultPic from "../../assets/DefaultPic.png";
export const PictureShowDialog = (props: any) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      maxWidth={"xl"}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "rgb(250, 177, 117)",
          animation: "bounce-in 500ms ease-out",
          borderRadius: 3,
        },
        "& .MuiDialog-container": {
          "& .MuiPaper-root": { 
            height: "100%",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent:"center",
          alignItems:"center",
          position: "relative",
          height:"100%",
        }}
      >
      <IconButton
          onClick={props.onClose}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            width: "3rem",
            height: "3rem",
            backgroundColor: "rgb(250, 177, 117)",
            zIndex: 999,
          }}
        >
          <CloseIcon
            sx={{
              color: "white",
              fontSize: "2rem",
              filter: "drop-shadow(3px 3px 2px black)",
            }}
          />
        </IconButton>
          <img
            draggable={false}
            src={props.pic ? props.pic : DefaultPic}
            style={{
              maxHeight:"100%",
              maxWidth:"100%",
            }}
          />
      </Box>
    </Dialog>
  );
};
