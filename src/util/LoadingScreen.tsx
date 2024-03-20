import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { BACKGROUND_COLOR } from "../constant/Constant";

export const LoadingScreen = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor: BACKGROUND_COLOR,
        height: "100%",
        width: "100%",
        zIndex: -1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="warning" size={80} />
    </Box>
  );
};
