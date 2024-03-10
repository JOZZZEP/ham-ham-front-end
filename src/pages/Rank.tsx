import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from "@mui/material";
import { Box, Container } from "@mui/system";
import Ham1 from "../assets/ham1.jpg";
import Ham2 from "../assets/ham2.jpg";
import Ham3 from "../assets/ham3.jpg";
import Ham4 from "../assets/ham4.jpg";
import Ham5 from "../assets/ham5.jpg";
import "./Animate.css";

const hams = [Ham1, Ham2, Ham3, Ham4, Ham5];

function RankPage() {
  return (
    <>
      <Container maxWidth={"sm"}>
        <Box pt={2}>
          {hams.map((ham, index) => (
            <Card key={index} sx={{ mb: 2, borderRadius:5}}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: "rgb(250, 177, 117)" }}
                    aria-label="recipe"
                  >
                    HH
                  </Avatar>
                }
                title={"Ham Ham "+(index+1)}
                subheader="September 14, 2024"
              />
              <CardMedia component="img" height="100%" image={ham} />
              <CardContent sx={{display:'flex'}}>
                <Typography variant="h2">{index + 1}</Typography>
                <Typography variant="h5" color={"green"}><ArrowDropUpIcon/>{index + 1}</Typography>
              </CardContent>
              {/* <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">F</IconButton>
            </CardActions> */}
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
}

export default RankPage;
