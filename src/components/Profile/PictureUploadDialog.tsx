import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import { Button, CircularProgress, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import DefaultPic from "../../assets/DefaultPic.png";
import { PictureService } from "../../services/PictureService";
import CustomDialog from "../CustomDialog/CustomDialog";

export const PictureUploadDialog = (props: any) => {
  const pictureService = new PictureService();
  const [loading, setLoading] = useState(false);
  const handleClickUpload = (pic: any) => {
    setLoading(true);
    pictureService
      .picUserUpload({ picture: pic, uid: props.user.uid })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <CustomDialog
      CustomDialog
      open={props.open}
      onClose={props.onClose}
      maxWidth={"sm"}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          position: "relative",
        }}
      >
        <IconButton
          disabled={loading}
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
        <Box sx={{ flex: "2 0 200px" }}>
          <img
            draggable={false}
            width={"100%"}
            src={
              props.picture ? URL.createObjectURL(props.picture) : DefaultPic
            }
            style={{
              objectFit: "cover",
              aspectRatio: "1/1",
              borderRadius: "10px",
              opacity: loading ? 0.5 : 1,
            }}
          />
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, pt: 1 }}
          >
            <Button
              disabled={loading}
              variant="contained"
              color="error"
              size="large"
              startIcon={<CancelIcon />}
              onClick={props.onClose}
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant="contained"
              color="info"
              size="large"
              startIcon={<UploadIcon />}
              onClick={() => handleClickUpload(props.picture)}
            >
              Upload
            </Button>
          </Box>
          {loading && (
            <CircularProgress
              color="warning"
              size={60}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-30px",
                marginLeft: "-30px",
              }}
            />
          )}
        </Box>
      </Box>
    </CustomDialog>
  );
};
