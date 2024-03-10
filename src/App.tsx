import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuthContext } from "./context/AuthContext";
import AllUserPage from "./pages/AllUser";
import Header from "./pages/Header";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import RankPage from "./pages/Rank";
import RegisterPage from "./pages/Register";
import VotePage from "./pages/Vote";

function App() {
  const { auth, setAuth } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuth(localStorage.getItem("auth") === "login");
    setLoading(false);
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <>
      {auth ? (
        <>
          <Header />
          <div className="app-body">
            <Routes>
              <Route path="/" element={<VotePage />} />
              <Route path="/rank" element={<RankPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/alluser" element={<AllUserPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      ) : (
        <div className="app-body">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
