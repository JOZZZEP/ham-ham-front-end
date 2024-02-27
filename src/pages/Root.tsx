import { Outlet } from "react-router-dom";
import Header from "./Header";

function RootPage() {
    return (
      <>
        <h1>Root Layout</h1>
        <Header />
        <Outlet />
      </>
    );
}

export default RootPage;