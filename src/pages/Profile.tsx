import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { ChangeEvent, useEffect, useState } from "react";
import DefaultPic from "../assets/DefaultPic.png";
import DefaultPicAdd from "../assets/DefaultPicAdd.png";
import Ham1 from "../assets/ham1.jpg";
import Ham2 from "../assets/ham2.jpg";
import Ham3 from "../assets/ham3.jpg";
import Ham4 from "../assets/ham4.jpg";
import Ham5 from "../assets/ham5.jpg";
import { OptionProfileDialog } from "../components/Profile/OptionProfileDialig";
import { PictureDetailDialog } from "../components/Profile/PictureDetailDialog";
import { PictureUploadDialog } from "../components/Profile/PictureUploadDialog";
import { useUserContext } from "../context/UserContext";
import { PictureService } from "../services/PictureService";

const hams = [Ham1, Ham2, Ham3, Ham4, Ham5];

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

  const { user } = useUserContext();
  useEffect(() => {
    return () => {
      pictureService.picByUserID(user?.uid as number).then((res) => {
        if (res.response) {
          setPictures(res.pictures);
        }
      });
    };
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
    console.log(pid);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Container maxWidth={"md"} sx={{ pt: 2, pb: 2 }}>
        <Card>
          <Box sx={{ display: "flex", p: 2 }}>
            <Box sx={{ flex: "1 0 100px" }}>
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
            <Typography variant="body1">
              Pictures : {pictures.length}/5
            </Typography>
          </Box>
          <Box
            sx={{ p: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
          >
            {pictures.length > 0 &&
              pictures.map((pic: any, index) => (
                <Box key={index}>
                  <CardActionArea>
                    <CardMedia
                      draggable={false}
                      component="img"
                      sx={{
                        p: 0.3,
                        aspectRatio: "1/1",
                      }}
                      image={pic.picture.url}
                      onClick={() =>
                        handleClickOpen(
                          pic.picture.url,
                          pic.picture.pid,
                          pic.detail
                        )
                      }
                    />
                  </CardActionArea>
                </Box>
              ))}
            {pictures.length < 5 && (
              <Box>
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
            )}
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
