import { lazy } from "react";
import { Outlet } from "react-router-dom";

const Navbar = lazy(() => import("./components/Navbar"));

function App() {
  return (
    <section className="max-w-7xl mx-auto py-4 px-2">
      <Navbar />
      <Outlet />
    </section>
  );
}

export default App;
