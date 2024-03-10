import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";

import Ham1 from "../assets/ham1.jpg";
import Ham2 from "../assets/ham2.jpg";
import SunflowerSeed from "../assets/sunflowerSeed.png";
import "./Animate.css";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function VotePage() {

  const [open, setOpen] = useState(false);
  const [pic, setPic] = useState(null);
  const [isFeeding, setIsFeeding] = useState(false);

  const feed = async () => {
    setIsFeeding(prevIsFeeding => !prevIsFeeding);
    await delay(1000);
    setOpen(false);
    await delay(200);
    setIsFeeding(prevIsFeeding => !prevIsFeeding);
  };

  const handleClickOpen = (pic: any) => {
    setPic(pic);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <img
              draggable={false}
              src={Ham1}
              onClick={() => handleClickOpen(Ham1)}
              width={"100%"}
              style={{
                objectFit: "cover",
                aspectRatio: "1/1",
                borderRadius: "10px",
              }}
            />
          </Box>
          <Box className="bounce-in ham2" flex={"1 1 450px"}>
            <img
              draggable={false}
              src={Ham2}
              onClick={() => handleClickOpen(Ham2)}
              width={"100%"}
              style={{
                objectFit: "cover",
                aspectRatio: "1/1",
                borderRadius: "10px",
              }}
            />
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
          },
        }}
      >
        <DialogContent
          sx={{
            padding: "1",
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
              width={"100%"}
              src={pic!}
              style={{
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
              className={`sun-seed  ${
                isFeeding ? "feed-ham-ham" : "bounce-in"
              }`}
            >
              <img
                src={SunflowerSeed}
                width={100}
                style={{
                  filter: "drop-shadow(2px 2px 10px white)",
                }}
                onClick={!isFeeding ? feed : undefined}
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
