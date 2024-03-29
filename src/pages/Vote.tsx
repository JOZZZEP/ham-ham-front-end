import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {
  CardActionArea,
  CardMedia,
  Dialog,
  Fab,
  IconButton,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import DefaultPic from "../assets/DefaultPic.png";
import SunflowerSeed from "../assets/sunflowerSeed.png";
import CustomSetTimeRandomDialog from "../components/CustomDialog/CustomSetTimeRandomDialog";
import { VoteResultDialog } from "../components/Profile/VoteResultDialog";
import { LOCAL_PIC_TIMEOUT, LOCAL_VOTE_PICTURE } from "../constant/Constant";
import { useUserContext } from "../context/UserContext";
import { AdminService } from "../services/AdminService";
import { PictureService } from "../services/PictureService";
import "../util/Animate.css";
import { decode, encode } from "../util/Encrypt";
import { LoadingScreen } from "../util/LoadingScreen";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function VotePage() {
  const [open, setOpen] = useState(false);
  const [openVoteResult, setOpenVoteResult] = useState(false);
  const [voteResult, setVoteResult] = useState<any>(null);
  const [pic, setPic] = useState<any>(null);
  const [ham1Pic, setHam1Pic] = useState<any>(null);
  const [ham2Pic, setHam2Pic] = useState<any>(null);
  const [isVote, setIsVote] = useState(false);
  const [isVoteClick, setIsVoteClick] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeRandomOpen, setTimeRandomOpen] = useState(false);
  const [timeRandom, setTimeRandom] = useState(0);
  const [voteList, setVoteList] = useState<any[]>([]);

  const pictureService = new PictureService();
  const adminService = new AdminService();
  const { user } = useUserContext();

  useEffect(() => {
    setLoading(true);
    adminService.getTimeRandom().then((res) => {
      if (res.response) {
        setTimeRandom(res.time);
      }
    });
    if (!localStorage.getItem(LOCAL_VOTE_PICTURE)) {
      pictureService
        .picRandom(voteList)
        .then((res) => {
          if (res.response) {
            if (res.pictures.length === 2) {
              const pic1 = {
                pid: res.pictures[0].pid,
                url: res.pictures[0].url,
              };
              const pic2 = {
                pid: res.pictures[1].pid,
                url: res.pictures[1].url,
              };
              setHam1Pic(pic1);
              setHam2Pic(pic2);
              localStorage.setItem(
                LOCAL_VOTE_PICTURE,
                encode(
                  JSON.stringify({
                    pic1: pic1,
                    pic2: pic2,
                  })
                )
              );
            } else {
              localStorage.removeItem(LOCAL_VOTE_PICTURE);
              window.location.reload();
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      const pic = JSON.parse(decode(localStorage.getItem(LOCAL_VOTE_PICTURE)!));
      setHam1Pic(pic.pic1);
      setHam2Pic(pic.pic2);
      setLoading(false);
    }
  }, [isVoteClick]);

  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  const vote = async () => {
    setIsVote((prevIsVote) => !prevIsVote);
    await delay(1000);
    setOpen(false);
    await delay(200);
    setIsVote((prevIsVote) => !prevIsVote);
    setLoading(true);
    const currentTime: Date = new Date();
    if (localStorage.getItem("PIC_TIMEOUT")) {
      currentTime.setSeconds(currentTime.getSeconds() + timeRandom);
      const picTimeList: any[] = JSON.parse(
        localStorage.getItem("PIC_TIMEOUT")!
      );
      const updatedPicTimeList = [
        ...picTimeList,
        {
          pid: ham1Pic.pid === pic.pid ? ham1Pic.pid : ham2Pic.pid,
          timeout: currentTime,
        },
      ];

      localStorage.setItem("PIC_TIMEOUT", JSON.stringify(updatedPicTimeList));
      const picTimeNewList: any[] = JSON.parse(
        localStorage.getItem("PIC_TIMEOUT")!
      );

      const picTimeFilter: any[] = picTimeNewList.filter(
        (pic) => new Date(pic.timeout) > new Date()
      );
      localStorage.setItem(LOCAL_PIC_TIMEOUT, JSON.stringify(picTimeFilter));
      const notRandomPic = picTimeFilter.map((pic) => pic.pid);
      setVoteList(notRandomPic);
    } else {
      currentTime.setSeconds(currentTime.getSeconds() + timeRandom);
      localStorage.setItem(
        LOCAL_PIC_TIMEOUT,
        JSON.stringify([
          {
            pid: ham1Pic.pid === pic.pid ? ham1Pic.pid : ham2Pic.pid,
            timeout: currentTime,
          },
        ])
      );
      setVoteList([ham1Pic.pid === pic.pid ? ham1Pic.pid : ham2Pic.pid]);
    }
    pictureService
      .picVote([
        { pid: ham1Pic.pid, result: ham1Pic.pid === pic.pid ? 1 : 0 },
        { pid: ham2Pic.pid, result: ham2Pic.pid === pic.pid ? 1 : 0 },
      ])
      .then((res) => {
        setVoteResult(res);
      })
      .finally(() => {
        setLoading(false);
      });
    localStorage.removeItem(LOCAL_VOTE_PICTURE);
    setOpenVoteResult(true);
  };

  const handleClickOpen = (pic: any) => {
    if (ham1Pic && ham2Pic) {
      setPic(pic);
      setOpen(true);
    }
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
          className="bounce-in"
          display="flex"
          justifyContent="center"
          textAlign={"center"}
        >
          <Typography sx={{ fontSize: { md: 50, xs: 0 }, color: "white" }}>
            WHICH HAM DO YOU LOVE?
          </Typography>
        </Box>
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
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            height: "100%",
            minWidth: "300px",
          }}
        >
          <img
            draggable={false}
            src={pic ? pic.url : DefaultPic}
            style={{
              width: "100%",
              objectFit: "cover",
              aspectRatio: "1/1",
              maxHeight: "100%",
              maxWidth: "100%",
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
              justifyContent: "end",
            }}
            className={`sun-seed  ${isVote ? "feed-ham-ham" : "bounce-in"}`}
          >
            <img
              draggable={false}
              src={SunflowerSeed}
              style={{
                filter: "drop-shadow(2px 2px 10px white)",
                cursor: "pointer",
                maxWidth: 100,
              }}
              onClick={!isVote ? vote : undefined}
            />
          </Box>
          {!isVote && (
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
          )}
        </Box>
      </Dialog>
      <VoteResultDialog
        open={openVoteResult}
        maxWidth={"md"}
        onClose={() => {
          setOpenVoteResult(false);
          setIsVoteClick((prevIsVoteClick) => !prevIsVoteClick);
        }}
        pic1={ham1Pic.url}
        pic2={ham2Pic.url}
        voteResult={voteResult}
      />
      {user?.role === "admin" ? (
        <Fab
          variant="extended"
          size="medium"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "white",
          }}
          onClick={() => {
            setTimeRandomOpen(true);
          }}
        >
          <EditIcon sx={{ mr: 1 }} />
          Set Time
        </Fab>
      ) : null}
      <CustomSetTimeRandomDialog
        title={"Set Time Random"}
        open={timeRandomOpen}
        onClose={() => setTimeRandomOpen(false)}
      />
    </>
  );
}

export default VotePage;
