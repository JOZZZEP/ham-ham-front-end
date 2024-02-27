import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  useMediaQuery,
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
  const isSmallThan800 = useMediaQuery("(max-width: 800px)");
  const isSmallThan1000 = useMediaQuery("(max-width: 1000px)");

  const [open, setOpen] = useState(false);
  const [pic, setPic] = useState(null);
  const [isFeeding, setIsFeeding] = useState(false);

  const feed = async () => {
    setIsFeeding(!isFeeding);
    await delay(2000);
    setIsFeeding(false);
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
      <Container
        maxWidth={isSmallThan800 ? "md" : "lg"}
      >
        <Box
          sx={{
            pt: isSmallThan800 ? "1rem" : "2rem",
            pb: isSmallThan800 ? "2rem" : "4rem",
            display: "flex",
            flexDirection: isSmallThan800 ? "column" : "row",
            gap: isSmallThan800 ? "2rem" : "4rem",
          }}
        >
          <Box className="bounce-in ham1" flex={1}>
            <img
              src={Ham1}
              onClick={() => handleClickOpen(Ham1)}
              width={"100%"}
              style={{
                objectFit: "cover",
                aspectRatio: isSmallThan800
                  ? "10/9"
                  : isSmallThan1000
                  ? "3/4"
                  : "1/1",
                borderRadius: "1rem",
              }}
            />
          </Box>
          <Box className="bounce-in ham2" flex={1}>
            <img
              src={Ham2}
              onClick={() => handleClickOpen(Ham2)}
              width={"100%"}
              style={{
                objectFit: "cover",
                aspectRatio: isSmallThan800
                  ? "10/9"
                  : isSmallThan1000
                  ? "3/4"
                  : "1/1",
                borderRadius: "1rem",
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
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box>
            <img
              width={"100%"}
              src={pic!}
              style={{
                objectFit: "cover",
                aspectRatio: "1/1",
                borderRadius: "10px",
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: "flex", position: "relative", pb: 2 }}>
          <Box flex={2} sx={{ display: "flex", justifyContent: "center" }}>
            <img
              className={`sun-seed  ${isFeeding ? "bounce-out" : "bounce-in"}`}
              src={SunflowerSeed}
              height={60}
              style={{ filter: "drop-shadow(0 0 5px white)", zIndex: 99 }}
              onClick={!isFeeding ? feed : undefined}
            />
          </Box>
          <IconButton
            size="medium"
            onClick={handleClose}
            sx={{ position: "absolute" }}
          >
            <CloseIcon sx={{ color: "white", fontSize: 50 }} />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default VotePage;
