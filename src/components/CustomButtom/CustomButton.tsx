import { Button, Typography } from "@mui/material";

const CustomButton = (props: any) => {
  return (
    <Button
      variant={props.variant}
      disabled={props.disabled}
      fullWidth={props.fullWidth}
      size={props.size}
      sx={{
        width:`${props.width}`,
        fontSize: "1.3rem",
        borderRadius: "10rem",
        backgroundColor: "rgb(240, 165, 70)",
        boxShadow: 0,
        ":hover": {
          backgroundColor: "rgb(200, 120, 20)",
          boxShadow: 0,
        },
      }}
      onClick={props.onClick}
    >
      <Typography color={"white"} variant="h6">
        {props.children}
      </Typography>
    </Button>
  );
};
export default CustomButton;
