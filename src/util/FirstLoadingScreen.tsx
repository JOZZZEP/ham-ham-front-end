import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BACKGROUND_COLOR } from "../constant/Constant";

export const FirstLoadingScreen = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: BACKGROUND_COLOR,
        height: "100%",
        width: "100%",
        zIndex: -1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress color="warning" size={80} />
        <Typography sx={{ fontSize: 30, color: "white" ,p:2}}>
          Waiting for Backend <a href="https://render.com">render.com</a>
        </Typography>
        <Typography sx={{ fontSize: 30, color: "white" }}>
          Please wait about 1-3 minute
        </Typography>
      </Box>
    </Box>
  );
};
