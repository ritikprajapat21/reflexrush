import useTime from "@/lib/useTime";
import { motion } from "framer-motion";
import { lazy } from "react";
import { NavLink, useLocation } from "react-router-dom";

const AuthHeader = lazy(() => import("./AuthHeader"));

const Navbar = () => {
  const { bestTime } = useTime();
  const location = useLocation();

  return (
    <nav className="flex justify-around items-center">
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
        {bestTime !== Infinity && (
          <div className="flex flex-col text-emerald-400 leading-tight items-center justify-center">
            <p className="text-sm text-white tracking-tighter">
              Your best time:
            </p>
            <p className="font-bold tracking-tight text-xl">
              {bestTime.toString()} ms
            </p>
          </div>
        )}
        {location.pathname !== "/signin" && <AuthHeader />}
      </div>
    </nav>
  );
};

export default Navbar;
