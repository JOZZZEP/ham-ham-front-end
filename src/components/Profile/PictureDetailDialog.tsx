import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LineChart } from "@mui/x-charts";
import { ChangeEvent, useState } from "react";
import DefaultPic from "../../assets/DefaultPic.png";
import { PictureService } from "../../services/PictureService";
import CustomConfirmDialog from "../CustomDialog/CustomConfirmDialog";
import CustomDialog from "../CustomDialog/CustomDialog";
import { PictureUploadDialog } from "./PictureUploadDialog";

export const PictureDetailDialog = (props: any) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [uploadPictureOpen, setUploadPictureOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pictureService = new PictureService();
  const [pictureFile, setPictureFile] = useState<File | null>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setPictureFile(event.target.files[0]);
      setUploadPictureOpen(true);
    }
  }

  const resetFileInput = () => {
    console.log(props.pid);

    const fileInput = document.getElementById(
      "picture-change"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };
  return (
    <>
      <CustomDialog
        CustomDialog
        open={props.open}
        onClose={props.onClose}
        maxWidth={props.maxWidth}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
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
          <Box sx={{ flex: "1 0 35%"}}>
            <img
              draggable={false}
              width={"100%"}
              src={props.pic ? props.pic.url : DefaultPic}
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
                component="label"
                variant="contained"
                color="info"
                size="large"
                startIcon={<InsertPhotoIcon />}
                onClick={() => {
                  resetFileInput();
                }}
              >
                Change
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="picture-change"
                  type="file"
                  onChange={handleFileChange}
                />
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              flex: "2 0 60%",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {props.pic && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "space-evenly",
                  backgroundColor: "white",
                  borderRadius: 3,
                  p: 1,
                }}
              >
                <Box textAlign={"center"} sx={{ fontSize: { md: 18, xs: 16 } }}>
                  <Box color={"gray"}>RANK</Box>
                  {props.pic.difRank !== null ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ fontSize: { md: 18, xs: 16 } }}>
                        {props.pic.rank}
                      </Typography>
                      <Typography
                        variant="body1"
                        color={
                          props.pic.difRank < 0
                            ? "green"
                            : props.pic.difRank > 0
                            ? "red"
                            : "gray"
                        }
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {props.pic.difRank < 0 ? (
                          <ArrowDropUpIcon />
                        ) : props.pic.difRank > 0 ? (
                          <ArrowDropDownIcon />
                        ) : null}
                        {props.pic.difRank != null &&
                          props.pic.difRank !== 0 &&
                          Math.abs(props.pic.difRank)}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="h6" color={"gray"}>
                      No Rank
                    </Typography>
                  )}
                </Box>
                <Box textAlign={"center"} sx={{ fontSize: { md: 18, xs: 16 } }}>
                  <Box color={"gray"}>SCORE</Box>
                  {props.pic.score && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ fontSize: { md: 18, xs: 16 } }}>
                        {props.pic.score}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        color={
                          props.pic.difScore > 0
                            ? "green"
                            : props.pic.difScore < 0
                            ? "red"
                            : "gray"
                        }
                      >
                        {props.pic.difScore > 0 ? (
                          <ArrowDropUpIcon />
                        ) : props.pic.difScore < 0 ? (
                          <ArrowDropDownIcon />
                        ) : null}
                        {props.pic.difScore !== null &&
                          props.pic.difScore !== 0 &&
                          Math.abs(props.pic.difScore)}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box textAlign={"center"} sx={{ fontSize: { md: 18, xs: 16 } }}>
                  <Box color={"gray"}>UPLOAD</Box>
                  {props.pic.date}
                </Box>
              </Box>
            )}
            {props.detail && (
              <Box
                sx={{
                  aspectRatio: "16/9",
                  backgroundColor: "white",
                  borderRadius: 3,
                }}
              >
                <LineChart
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
                      data: props.detail ? props.detail.list_total : [],
                      color: "#008080",
                      label: "Point",
                    },
                  ]}
                />
              </Box>
            )}
          </Box>
        </Box>
      </CustomDialog>
      <CustomConfirmDialog
        title={"Delete?"}
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setLoading(true);
          pictureService.picDelete(props.pid).then(() => {
            window.location.reload();
          });
        }}
        confirmColor={"error"}
        confirmLabel={"Delelte"}
        loading={loading}
      />
      <PictureUploadDialog
        open={uploadPictureOpen}
        onClose={() => {
          setUploadPictureOpen(false);
        }}
        picture={pictureFile}
        user={props.user}
        pid={props.pid}
        isChange={true}
      />
    </>
  );
};
