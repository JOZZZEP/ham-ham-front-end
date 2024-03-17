import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import DefaultPic from "../assets/DefaultPic.png";
import Ham1 from "../assets/ham1.jpg";
import Ham2 from "../assets/ham2.jpg";
import Ham3 from "../assets/ham3.jpg";
import Ham4 from "../assets/ham4.jpg";
import Ham5 from "../assets/ham5.jpg";
import { PictureShowDialog } from "../components/Profile/PictureShowDialog";
import { useUserContext } from "../context/UserContext";
import { PictureService } from "../services/PictureService";
import { UserService } from "../services/UserService";

const hams = [Ham1, Ham2, Ham3, Ham4, Ham5];

function ViewProfilePage() {
  const [open, setOpen] = useState(false);
  const [optionProfileOpen, setOptionProfileOpen] = useState(false);
  const [uploadPictureOpen, setUploadPictureOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [pic, setPic] = useState(null);
  const [picDetail, setPicDetail] = useState(null);

  const [pictures, setPictures] = useState([]);
  const pictureService = new PictureService();
  const userService = new UserService();
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const params = useParams();

  const { user } = useUserContext();
  const [viewUser, setViewUser] = useState<any>();
  useEffect(() => {
    return () => {
      console.log(params.username);

      if (params.username) {
        userService.getUserByUsername(params.username).then((res) => {
          console.log(res.user);
          pictureService.picByUserID(res.user.uid).then((res) => {
            if (res.response) {
              setPictures(res.pictures);
            }
          });
          setViewUser(res.user);
        });
      }
    };
  }, []);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length !== 0) {
      setPictureFile(event.target.files![0]);
      setUploadPictureOpen(true);
    }
  }

  const handleClickOpen = (pic: any, detail: any) => {
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
        <Card>
          <Box sx={{ display: "flex", p: 2 }}>
            <Box sx={{ flex: "1 0 100px" }}>
              <CardMedia
                draggable={false}
                component="img"
                sx={{ borderRadius: "50%", aspectRatio: "1/1" }}
                image={viewUser ? viewUser.avatar : DefaultPic}
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
                  {viewUser?.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="div"
                >
                  @{viewUser?.username}
                </Typography>
              </CardContent>
            </Box>
          </Box>
          <Box
            mt={2}
            sx={{ p: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
          >
            {pictures.length !== 0 &&
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
                        handleClickOpen(pic.picture.url, pic.detail)
                      }
                    />
                  </CardActionArea>
                </Box>
              ))}
          </Box>
        </Card>
      </Container>
      <PictureShowDialog open={open} onClose={handleClose} pic={pic}/>
    </>
  );
}

export default ViewProfilePage;
