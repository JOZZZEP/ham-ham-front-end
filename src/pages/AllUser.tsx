import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Ham1 from "../assets/ham1.jpg";
import Ham2 from "../assets/ham2.jpg";
import Ham3 from "../assets/ham3.jpg";
import Ham4 from "../assets/ham4.jpg";
import Ham5 from "../assets/ham5.jpg";

const hams = [Ham1, Ham2, Ham3, Ham4, Ham5];

function AllUserPage() {
  return (
    <>
      <Container maxWidth={"md"} sx={{ pt: 2, pb: 2 }}>
        {hams.map((ham, index) => (
          <Card sx={{mt:1}}>
            <Box key={index} sx={{ display: "flex", p: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 100, borderRadius: "50%", aspectRatio: "1/1" }}
                image={ham}
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
          </Card>
        ))}
      </Container>
    </>
  );
}

export default AllUserPage;
