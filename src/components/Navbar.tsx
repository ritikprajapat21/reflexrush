import { motion } from "framer-motion";
import { lazy } from "react";
import { NavLink, useLocation } from "react-router-dom";

const BestTime = lazy(() => import("./BestTime"));
const AuthHeader = lazy(() => import("./AuthHeader"));

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="px-2 md:px-0 flex justify-between md:justify-around items-center">
      <motion.div
        initial={{ x: -70, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <NavLink to="/">
          <img src="/rr.svg" alt="Logo" className="w-16 h-16" />
        </NavLink>
      </motion.div>
      <div className="flex gap-6">
        <BestTime />
        {location.pathname !== "/signin" && <AuthHeader />}
      </div>
    </nav>
  );
};

export default Navbar;
