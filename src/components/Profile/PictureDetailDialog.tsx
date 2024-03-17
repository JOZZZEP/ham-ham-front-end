import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { LineChart } from "@mui/x-charts";
import { useState } from "react";
import DefaultPic from "../../assets/DefaultPic.png";
import { PictureService } from "../../services/PictureService";
import CustomConfirmDialog from "../CustomDialog/CustomConfirmDialog";
import CustomDialog from "../CustomDialog/CustomDialog";

export const PictureDetailDialog = (props:any) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pictureService = new PictureService();
  return (<>
    <CustomDialog CustomDialog open={props.open} onClose={props.onClose} maxWidth={props.maxWidth}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          position: "relative",
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
        <Box sx={{ flex: "2 0 200px" }}>
          <img
            draggable={false}
            width={"100%"}
            src={props.pic ? props.pic : DefaultPic}
            style={{
              objectFit: "cover",
              aspectRatio: "1/1",
              borderRadius: "10px",
            }}
          />
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, pt: 1 }}
          >
            <Button
              variant="contained"
              color="error"
              size="large"
              startIcon={<DeleteForeverIcon />}
              onClick={() => setConfirmOpen(true)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="info"
              size="large"
              startIcon={<InsertPhotoIcon />}
            >
              Change
            </Button>
          </Box>
        </Box>
        {props.detail && (
          <Box
            sx={{
              flex: "3 0 350px",
              aspectRatio: "16/9",
              backgroundColor: "white",
              borderRadius: 3,
            }}
          >
            <LineChart
              sx={{ width: "100%" }}
              xAxis={[
                {
                  data: props.detail ? props.detail.list_date : [],
                  label: props.detail ? props.detail.name_month : "NaN",
                  scaleType: "band",
                },
              ]}
              yAxis={[{ label: "Point" }]}
              series={[
                {
                  curve: "linear",
                  data: props.detail ? props.detail.list_win : [],
                  color: "#59a14f",
                  label: "Win",
                },
                {
                  curve: "linear",
                  data: props.detail ? props.detail.list_lose : [],
                  color: "#e15759",
                  label: "Lose",
                },
              ]}
            />
          </Box>
        )}
      </Box>
    </CustomDialog>
    <CustomConfirmDialog
        title={"Delete?"}
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setLoading(true);
          pictureService.picDelete(props.pid).then(()=>{
            window.location.reload();
          })
        }}
        confirmColor={"error"}
        confirmLabel={"Delelte"}
        loading={loading}
      />
  </>
  );
};
