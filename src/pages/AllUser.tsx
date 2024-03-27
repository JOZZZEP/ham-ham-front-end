import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/UserService";
import { LoadingScreen } from "../util/LoadingScreen";

function AllUserPage() {
  const navigate = useNavigate();
  const [allUser, setAllUser] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const userService = new UserService();
  useEffect(() => {
    setLoading(true);
    userService
      .getAllUser()
      .then((res: any) => {
        if (res.response) setAllUser(res.user);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  return (
    <>
      <Container maxWidth={"md"} sx={{ pt: 2, pb: 2 }}>
        {allUser.slice(1).map((user: any, index: any) => (
          <Card key={index} sx={{ mt: 1, borderRadius: 3 }}>
            <CardActionArea
              onClick={() => {
                if (location.pathname !== `/userprofile/${user.uid}`) {
                  navigate(`/userprofile/${user.uid}`);
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
