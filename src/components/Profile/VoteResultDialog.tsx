import CloseIcon from "@mui/icons-material/Close";
import { Card, Chip, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import DefaultPic from "../../assets/DefaultPic.png";
import CustomDialog from "../CustomDialog/CustomDialog";
import EquationComponent from "../Equation";

export const VoteResultDialog = (props: any) => {
  return (
    <>
      {props.voteResult && (
        <CustomDialog
          CustomDialog
          open={props.open}
          onClose={props.onClose}
          maxWidth={props.maxWidth}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              position: "relative",
            }}
          >
            <IconButton
              onClick={props.onClose}
              sx={{
                position: "absolute",
                right: 10,
                top: 10,
                width: "3rem",
                height: "3rem",
                backgroundColor: "rgb(250, 177, 117)",
                zIndex: 999,
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
            <Card
              sx={{
                flex: "1 0 280px",
                backgroundColor: "white !important",
                p: 1,
              }}
            >
              <img
                draggable={false}
                width={"100%"}
                src={props.pic1 ? props.pic1 : DefaultPic}
                style={{
                  objectFit: "cover",
                  aspectRatio: "1/1",
                  borderRadius: "10px",
                }}
              />
              <Box
                p={1}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  position: "relative",
                }}
              >
                <EquationComponent
                  isP1={true}
                  voteResult={props.voteResult.result}
                />
                <Box sx={{ position: "absolute", top: 5, right: 5 }}>
                  {props.voteResult.result.p1.result === 1 ? (
                    <Chip label="WIN" color="success" />
                  ) : (
                    <Chip label="LOSE" color="error" />
                  )}
                </Box>
              </Box>
            </Card>
            <Card
              sx={{
                flex: "1 0 280px",
                backgroundColor: "white !important",
                p: 1,
              }}
            >
              <img
                draggable={false}
                width={"100%"}
                src={props.pic2 ? props.pic2 : DefaultPic}
                style={{
                  objectFit: "cover",
                  aspectRatio: "1/1",
                  borderRadius: "10px",
                }}
              />
              <Box
                p={1}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  position: "relative",
                }}
              >
                <EquationComponent
                  isP1={false}
                  voteResult={props.voteResult.result}
                />
                <Box sx={{ position: "absolute", top: 5, right: 5 }}>
                  {props.voteResult.result.p2.result === 1 ? (
                    <Chip label="WIN" color="success" />
                  ) : (
                    <Chip label="LOSE" color="error" />
                  )}
                </Box>
              </Box>
            </Card>
          </Box>
        </CustomDialog>
      )}
    </>
  );
};
