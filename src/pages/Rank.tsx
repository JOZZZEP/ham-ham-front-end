import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Avatar,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultPic from "../assets/DefaultPic.png";
import { PictureShowDialog } from "../components/Profile/PictureShowDialog";
import { PictureService } from "../services/PictureService";
import "../util/Animate.css";
import { LoadingScreen } from "../util/LoadingScreen";

function RankPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [pic, setPic] = useState(null);
  const pictureService = new PictureService();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    pictureService
      .picRank()
      .then((res) => {
        if (res.response) {
          setPictures(res.pictures);
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
      <Container maxWidth={"sm"}>
        <Box pt={2}>
          {pictures.map((pic: any, index) => (
            <Card className="bounce-in" key={index} sx={{ mb: 2, borderRadius: 5 }}>
              <CardHeader
                avatar={
                  <Avatar
                    src={pic.avatar}
                    sx={{
                      bgcolor: "rgb(250, 177, 117)",
                      cursor: "pointer",
                      "&:hover": {
                        opacity: 0.9,
                      },
                    }}
                    onClick={() => {
                      if (
                        location.pathname !== `/viewprofile/${pic.username}`
                      ) {
                        navigate(`/viewprofile/${pic.username}`);
                      }
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                }
                title={
                  <Typography
                    variant="h6"
                    sx={{
                      display: "inline-block",
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => {
                      if (
                        location.pathname !== `/viewprofile/${pic.username}`
                      ) {
                        navigate(`/viewprofile/${pic.username}`);
                      }
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {pic.username}
                  </Typography>
                }
                subheader={pic.date}
                action={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pr: 1,
                      gap: 1,
                    }}
                  >
                    <Typography variant="h4">{index + 1}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                     {pic.dif !== null ? (
                            <Typography
                              variant="h6"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent:"center"
                              }}
                              color={
                                pic.dif < 0
                                  ? "green"
                                  : pic.dif > 0
                                  ? "red"
                                  : "gray"
                              }
                            >
                              {pic.dif < 0 ? (
                                <ArrowDropUpIcon />
                              ) : pic.dif > 0 ? (
                                <ArrowDropDownIcon />
                              ) : (
                                <RemoveIcon />
                              )}
                              {pic.dif !== 0 &&
                                Math.abs(pic.dif)}
                            </Typography>
                          ) : (
                            <Typography variant="h6" color={"gray"}>No Rank</Typography>
                          )}
                      <Typography variant="body1">{pic.score}</Typography>
                    </Box>
                  </Box>
                }
              />
              <CardActionArea>
                <CardMedia
                  draggable={false}
                  component="img"
                  height="100%"
                  image={pic.url ? pic.url : DefaultPic}
                  onClick={() => handleClickOpen(pic.url)}
                />
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
      <PictureShowDialog open={open} onClose={handleClose} pic={pic} />
    </>
  );
}

export default RankPage;
