import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { LOCAL_AUTH_TOKEN } from "./constant/Constant";
import { useAuthContext } from "./context/AuthContext";
import { useUserContext } from "./context/UserContext";
import { UserResponse } from "./model/UserResponse";
import AllUserPage from "./pages/AllUser";
import Header from "./pages/Header";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import RankPage from "./pages/Rank";
import RegisterPage from "./pages/Register";
import UserProfilePage from "./pages/UserProfile";
import ViewProfilePage from "./pages/ViewProfile";
import VotePage from "./pages/Vote";
import { AuthService } from "./services/AuthService";
import { LoadingScreen } from "./util/LoadingScreen";

function App() {
  const { auth, setAuth } = useAuthContext();
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(true);
  const authService = new AuthService();

  useEffect(() => {
    if (localStorage.getItem(LOCAL_AUTH_TOKEN)) {
      authService
        .getUserByToken(localStorage.getItem(LOCAL_AUTH_TOKEN)!)
        .then((res) => {
          if (res.response) {
            if (Object.keys(res).length !== 0) {
              const user: UserResponse = {
                uid: res.user.uid,
                name: res.user.name,
                username: res.user.username,
                avatar: res.user.avatar,
                role: res.user.role,
              };
              setUser(user);
              setAuth(true);
              setLoading(false);
            }
          }
        });
    } else {
      setLoading(false);
    }
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
      {auth ? (
        user?.role === "admin" ? (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<VotePage />} />
              <Route path="/rank" element={<RankPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/userprofile/:uid"
                element={<UserProfilePage />}
              />
              <Route path="/alluser" element={<AllUserPage />} />
              <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
          </>
        ) : (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<VotePage />} />
              <Route path="/rank" element={<RankPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/viewprofile/:username"
                element={<ViewProfilePage />}
              />
              <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
          </>
        )
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<VotePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
