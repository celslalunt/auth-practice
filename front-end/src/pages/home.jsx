import { Outlet } from "react-router-dom";
import { Heroes } from "../components/heroes";
import { Navbar } from "../components/navbar";

export const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Heroes />
      <Outlet />
  </div>
  );
};
