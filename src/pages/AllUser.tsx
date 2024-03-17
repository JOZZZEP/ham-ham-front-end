import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ham1 from "../assets/ham1.jpg";
import Ham2 from "../assets/ham2.jpg";
import Ham3 from "../assets/ham3.jpg";
import Ham4 from "../assets/ham4.jpg";
import Ham5 from "../assets/ham5.jpg";
import { UserService } from "../services/UserService";

const hams = [Ham1, Ham2, Ham3, Ham4, Ham5];

function AllUserPage() {
  const navigate = useNavigate();
  const [allUser, setAllUser] = useState<any>([]);

  const userService = new UserService();
  useEffect(() => {
    return () => {
      userService.getAllUser().then((res: any) => {
        console.log(res);
        setAllUser(res.user);
      });
    };
  }, []);

  return (
    <>
      <Container maxWidth={"md"} sx={{ pt: 2, pb: 2 }}>
        {allUser.map((user: any, index: any) => (
          <Card key={index} sx={{ mt: 1, borderRadius: 3 }}>
            <CardActionArea
              onClick={() => {
                console.log(5555);

                if (location.pathname !== `/viewprofile/${user.username}`) {
                  navigate(`/viewprofile/${user.username}`);
                }
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Box
                sx={{ display: "flex", p: 2, justifyContent: "space-between" }}
              >
                <Box sx={{ display: "flex" }}>
                  <img
                    style={{
                      width: 100,
                      borderRadius: "50%",
                      aspectRatio: "1/1",
                    }}
                    src={user.avatar}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column", pl: 2 }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h6">
                        {user.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        @{user.username}
                      </Typography>
                    </CardContent>
                  </Box>
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default AllUserPage;
