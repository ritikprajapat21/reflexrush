import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <section className="max-w-7xl mx-auto py-4 px-2">
      <Navbar />
      <Outlet />
    </section>
  );
}

export default App;
