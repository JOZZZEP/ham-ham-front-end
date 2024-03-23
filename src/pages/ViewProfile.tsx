import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DefaultPic from "../assets/DefaultPic.png";
import { PictureShowDialog } from "../components/Profile/PictureShowDialog";
import { PictureService } from "../services/PictureService";
import { UserService } from "../services/UserService";
import { LoadingScreen } from "../util/LoadingScreen";

function ViewProfilePage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState(null);
  const [pictures, setPictures] = useState([]);
  const pictureService = new PictureService();
  const userService = new UserService();
  const params = useParams();
  const [viewUser, setViewUser] = useState<any>();
  useEffect(() => {
    setLoading(true);
    if (params.username) {
      userService
        .getUserByUsername(params.username)
        .then((res) => {
          pictureService.picByUserID(res.user.uid).then((res) => {
            if (res.response) {
              setPictures(res.pictures);
            }
          });
          setViewUser(res.user);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  const handleClickOpen = (pic: any) => {
    setPic(pic);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Container maxWidth={"md"} sx={{ pt: 2, pb: 2 }}>
        <Card  className="bounce-in">
          <Box sx={{ display: "flex", p: 2 }}>
            <Box className="bounce-in" sx={{ flex: "1 0 100px" }}>
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
          <Divider sx={{ flex: 1, mr: 1, ml: 1 }} />
          <Box
            sx={{ p: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
          >
            {pictures.length !== 0 &&
              pictures.map((pic: any, index) => (
                <Box  className="bounce-in" key={index}>
                  <CardActionArea>
                    <CardMedia
                      draggable={false}
                      component="img"
                      sx={{
                        p: 0.3,
                        aspectRatio: "1/1",
                      }}
                      image={pic.picture.url}
                      onClick={() => handleClickOpen(pic.picture.url)}
                    />
                  </CardActionArea>
                </Box>
              ))}
          </Box>
        </Card>
      </Container>
      <PictureShowDialog open={open} onClose={handleClose} pic={pic} />
    </>
  );
}

export default ViewProfilePage;
