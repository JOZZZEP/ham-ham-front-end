import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { ChangeEvent, useEffect, useState } from "react";
import DefaultPic from "../assets/DefaultPic.png";
import DefaultPicAdd from "../assets/DefaultPicAdd.png";
import { OptionProfileDialog } from "../components/Profile/OptionProfileDialig";
import { PictureDetailDialog } from "../components/Profile/PictureDetailDialog";
import { PictureUploadDialog } from "../components/Profile/PictureUploadDialog";
import { useUserContext } from "../context/UserContext";
import { PictureService } from "../services/PictureService";
import "../util/Animate.css";

function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [optionProfileOpen, setOptionProfileOpen] = useState(false);
  const [uploadPictureOpen, setUploadPictureOpen] = useState(false);

  const [pic, setPic] = useState<any>(null);
  const [pid, setPid] = useState<any>(null);
  const [picDetail, setPicDetail] = useState<any>(null);

  const [pictures, setPictures] = useState([]);
  const pictureService = new PictureService();
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { user } = useUserContext();
  useEffect(() => {
    setLoading(true);
    pictureService
      .picByUserID(user?.uid as number)
      .then((res) => {
        if (res.response) {
          setPictures(res.pictures);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setPictureFile(event.target.files[0]);
      setUploadPictureOpen(true);
    }
  }

  const resetFileInput = () => {
    const fileInput = document.getElementById(
      "picture-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleClickOpen = (pic: any, pid: any, detail: any) => {
    setPid(pid);
    setPic(pic);
    setPicDetail(detail);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Container maxWidth={"md"} sx={{ pt: 2, pb: 2 }}>
        <Card className="bounce-in">
          <Box sx={{ display: "flex", p: 2 }}>
            <Box className="bounce-in" sx={{ flex: "1 0 100px" }}>
              <CardMedia
                draggable={false}
                component="img"
                sx={{ borderRadius: "50%", aspectRatio: "1/1" }}
                image={user?.avatar ? user.avatar : DefaultPic}
              />
            </Box>
            <Box
              sx={{
                flex: "10 0 200px",
                display: "flex",
                flexDirection: "column",
                pl: 2,
              }}
            >
              <CardContent sx={{ position: "relative" }}>
                <Typography component="div" variant="h6">
                  {user?.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="div"
                >
                  @{user?.username}
                </Typography>
                <IconButton
                  size={"large"}
                  sx={{ position: "absolute", right: 0, top: 0 }}
                  onClick={() => setOptionProfileOpen(true)}
                >
                  <MoreHorizIcon />
                </IconButton>
              </CardContent>
            </Box>
          </Box>
          <Box
            sx={{
              ml: 2,
              mr: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Divider sx={{ flex: 1, mr: 1 }} />
            {loading ? (
              <CircularProgress color="warning" size={30} />
            ) : (
              <Typography variant="body1">
                Pictures : {pictures.length}/5
              </Typography>
            )}
          </Box>
          <Box
            sx={{ p: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
          >
            {!loading && pictures.length > 0
              ? pictures.map((pic: any, index) => (
                  <Box className="bounce-in" key={index}>
                    <CardActionArea
                      sx={{ position: "relative" }}
                      onClick={() =>
                        handleClickOpen(
                          pic.picture,
                          pic.picture.pid,
                          pic.detail
                        )
                      }
                    >
                      <CardMedia
                        draggable={false}
                        component="img"
                        sx={{
                          p: 0.3,
                          aspectRatio: "1/1",
                        }}
                        image={pic.picture.url}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          position: "absolute",
                          top: 10,
                          right: 10,
                          backgroundColor: "white",
                          borderRadius: "15px",
                          pl: 1,
                          pr: 1,
                        }}
                      >
                        {pic.picture.dif !== null ? (
                          <Typography
                            variant="h6"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent:"center"
                            }}
                            color={
                              pic.picture.dif < 0
                                ? "green"
                                : pic.picture.dif > 0
                                ? "red"
                                : "gray"
                            }
                          >
                            {pic.picture.dif < 0 ? (
                              <ArrowDropUpIcon />
                            ) : pic.picture.dif > 0 ? (
                              <ArrowDropDownIcon />
                            ) : (
                              <RemoveIcon />
                            )}
                            {pic.picture.dif !== 0 && Math.abs(pic.picture.dif)}
                          </Typography>
                        ) : (
                          <Typography variant="h6" color={"gray"}>
                            No Rank
                          </Typography>
                        )}
                      </Box>
                    </CardActionArea>
                  </Box>
                ))
              : null}
            {!loading && pictures.length < 5 ? (
              <Box className="bounce-in">
                <CardActionArea>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="picture-upload"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="picture-upload">
                    <CardMedia
                      draggable={false}
                      component="img"
                      sx={{
                        p: 0.3,
                        aspectRatio: "1/1",
                      }}
                      image={DefaultPicAdd}
                      onClick={() => {
                        resetFileInput();
                      }}
                    />
                  </label>
                </CardActionArea>
              </Box>
            ) : null}
          </Box>
        </Card>
      </Container>
      <PictureDetailDialog
        open={open}
        onClose={handleClose}
        pic={pic}
        detail={picDetail}
        maxWidth={picDetail ? "lg" : "sm"}
        pid={pid}
      />
      <OptionProfileDialog
        user={user}
        open={optionProfileOpen}
        onClose={() => setOptionProfileOpen(false)}
      />
      <PictureUploadDialog
        open={uploadPictureOpen}
        onClose={() => {
          setUploadPictureOpen(false);
        }}
        picture={pictureFile}
        user={user}
      />
    </>
  );
}

export default ProfilePage;
