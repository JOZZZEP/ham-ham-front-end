import {
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { LineChart } from "@mui/x-charts";
import { useState } from "react";
import DefaultPic from "../assets/DefaultPic.png";
import Ham1 from "../assets/ham1.jpg";
import Ham2 from "../assets/ham2.jpg";
import Ham3 from "../assets/ham3.jpg";
import Ham4 from "../assets/ham4.jpg";
import Ham5 from "../assets/ham5.jpg";

const hams = [Ham1, Ham2, Ham3, Ham4, Ham5];

function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [pic, setPic] = useState(null);

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
        <Card>
          <Box sx={{ display: "flex", p: 2 }}>
            <CardMedia
              component="img"
              sx={{ width: "25%", borderRadius: "50%", aspectRatio: "1/1" }}
              image={DefaultPic}
            />
            <Box sx={{ display: "flex", flexDirection: "column", pl: 2 }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  HAMHAMLOVELY
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  @hamhamlov
                </Typography>
              </CardContent>
            </Box>
          </Box>
          <Divider sx={{ m: 2 }} />
          <Box mt={2} sx={{ display: "flex", flexWrap: "wrap", p: 1 }}>
            {hams.map((ham, index) => (
              <Box
                key={index}
                sx={{
                  flex: index < 2 ? "1 0 50%" : "1 0 33%",
                  maxWidth: index < 2 ? "1 0 50%" : "1 0 33%",
                }}
              >
                <CardMedia
                  draggable={false}
                  component="img"
                  sx={{
                    p: 0.3,
                    aspectRatio: "1/1",
                  }}
                  image={ham}
                  onClick={() => handleClickOpen(ham)}
                />
              </Box>
            ))}
          </Box>
        </Card>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"xl"}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "rgb(250, 177, 117)",
            animation: "bounce-in 500ms ease-out",
          },
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "90%",
              height: "80%",
            },
          },
        }}
      >
        <DialogContent
          sx={{
            padding: "1",
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            <Box sx={{ flex: "1 0 350px" }}>
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
            </Box>
            <Box
              sx={{
                flex: "3 0 350px",
                aspectRatio: "16/9",
                backgroundColor: "white",
                borderRadius: 3,
              }}
            >
              <LineChart
                sx={{ width: "100%" }}
                xAxis={[
                  {
                    data: [
                      "22",
                      "23",
                      "24",
                      "25",
                      "26",
                      "27",
                      "28",
                      "29",
                      "30",
                      "31",
                    ],
                    label: "Day",
                    scaleType: "band",
                  },
                ]}
                yAxis={[{ label: "Point" }]}
                series={[
                  {
                    curve: "linear",
                    data: [3, 4, 5, 6, 2, 4, 8, 1, 5, 2],
                    color: "#59a14f",
                    label: "Win",
                  },
                  {
                    curve: "linear",
                    data: [2, 10, 2, 8, 1, 5, 10, 2, 8, 1],
                    color: "#e15759",
                    label: "Lose",
                  },
                ]}
              />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProfilePage;
