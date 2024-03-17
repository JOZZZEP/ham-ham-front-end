import CloseIcon from "@mui/icons-material/Close";
import {
  CardActionArea,
  CardMedia,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import DefaultPic from "../assets/DefaultPic.png";
import SunflowerSeed from "../assets/sunflowerSeed.png";
import { useAuthContext } from "../context/AuthContext";
import { PictureService } from "../services/PictureService";
import "../util/Animate.css";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function VotePage() {
  const [open, setOpen] = useState(false);
  const [pic, setPic] = useState<any>(null);
  const [ham1Pic, setHam1Pic] = useState<any>(null);
  const [ham2Pic, setHam2Pic] = useState<any>(null);
  const [isVote, setIsVote] = useState(false);
  const [isVoteClick, setIsVoteClick] = useState(false);
  const { auth } = useAuthContext();

  const pictureService = new PictureService();

  useEffect(() => {
    return () => {
      if (!localStorage.getItem("votePic")) {
        pictureService.picRandom().then((res) => {
          if (res.response) {
            const pic1 = { pid: res.pictures[0].pid, url: res.pictures[0].url };
            const pic2 = { pid: res.pictures[1].pid, url: res.pictures[1].url };
            setHam1Pic(pic1);
            setHam2Pic(pic2);
            localStorage.setItem(
              "votePic",
              JSON.stringify({
                pic1: pic1,
                pic2: pic2,
              })
            );
          }
        });
      } else {
        const pic = JSON.parse(localStorage.getItem("votePic")!);
        setHam1Pic(pic.pic1);
        setHam2Pic(pic.pic2);
      }
    };
  }, [isVoteClick]);

  const vote = async () => {
    pictureService
      .picVote([
        { pid: ham1Pic.pid, result: ham1Pic.pid === pic.pid ? 1 : 0 },
        { pid: ham2Pic.pid, result: ham2Pic.pid === pic.pid ? 1 : 0 },
      ])
      .then((res) => {
        console.log(res);
      });
    setIsVoteClick((prevIsVoteClick) => !prevIsVoteClick);
    localStorage.removeItem("votePic");
    setIsVote((prevIsVote) => !prevIsVote);
    await delay(1000);
    setOpen(false);
    await delay(200);
    setIsVote((prevIsVote) => !prevIsVote);
  };

  const handleClickOpen = (pic: any) => {
    setPic(pic);
    setOpen(true);
  };

  const handleClose = () => {
    if (!isVote) {
      setOpen(false);
    }
  };

  return (
    <>
      <Container maxWidth={"lg"}>
        <Box
          sx={{
            pt: 2,
            pb: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          <Box className="bounce-in ham1" flex={"1 1 450px"}>
            <CardActionArea>
              <CardMedia
                draggable={false}
                image={ham1Pic ? ham1Pic.url : DefaultPic}
                onClick={() => handleClickOpen(ham1Pic)}
                sx={{
                  objectFit: "cover",
                  aspectRatio: "1/1",
                  borderRadius: "10px",
                }}
              />
            </CardActionArea>
          </Box>
          <Box className="bounce-in ham2" flex={"1 1 450px"}>
            <CardActionArea>
              <CardMedia
                draggable={false}
                image={ham2Pic ? ham2Pic.url : DefaultPic}
                onClick={() => handleClickOpen(ham2Pic)}
                sx={{
                  objectFit: "cover",
                  aspectRatio: "1/1",
                  borderRadius: "10px",
                }}
              />
            </CardActionArea>
          </Box>
        </Box>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"sm"}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "rgb(250, 177, 117)",
            animation: "bounce-in 500ms ease-out",
            borderRadius: 3,
          },
        }}
      >
        <DialogContent
          sx={{
            padding: 2,
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              draggable={false}
              src={pic ? pic.url : DefaultPic}
              style={{
                width: "100%",
                objectFit: "cover",
                aspectRatio: "1/1",
                borderRadius: "10px",
              }}
            />
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 10,
                top: 10,
                width: "3rem",
                height: "3rem",
                backgroundColor: "rgb(250, 177, 117)",
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
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                right: 20,
                display: "flex",
                alignItems: "center",
              }}
              className={`sun-seed  ${isVote ? "feed-ham-ham" : "bounce-in"}`}
            >
              <img
                draggable={false}
                src={SunflowerSeed}
                width={100}
                style={{
                  filter: "drop-shadow(2px 2px 10px white)",
                  cursor: "pointer"
                }}
                onClick={!isVote ? vote : undefined}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: 40,
                right: 150,
              }}
            >
              <Typography
                variant="h6"
                color={"white"}
                sx={{
                  filter: "drop-shadow(3px 3px 4px black)",
                }}
              >
                Vote --&gt;
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default VotePage;
