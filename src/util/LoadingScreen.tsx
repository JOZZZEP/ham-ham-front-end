import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export const LoadingScreen = (props: any) => {
  return (
    <>
      {props.isLoading && (
        <Box
          sx={{
            position: "fixed",
            backgroundColor: "rgb(250, 177, 117)",
            height: "100%",
            width: "100%",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="warning" size={80} />
        </Box>
      )}
    </>
  );
};
