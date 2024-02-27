import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AllUserPage from "./pages/AllUser";
import Header from "./pages/Header";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import RankPage from "./pages/Rank";
import RegisterPage from "./pages/Register";
import VotePage from "./pages/Vote";

const routers = createBrowserRouter([
  { path: "/", element: <VotePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/rank", element: <RankPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/alluser", element: <AllUserPage /> },
]);

function App() {
  return (
    <>
        <Header />
        <div className="app-body">
          <RouterProvider router={routers} />
        </div>
    </>
  );
}

export default App;
