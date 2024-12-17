import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Navbar = () => {
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
      <motion.button
        initial={{ x: 70, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <NavLink
          to="/signin"
          className="p-2 px-4 bg-emerald-800 hover:bg-emerald-700 text-white rounded-md cursor-pointer"
        >
          Signin
        </NavLink>
      </motion.button>
    </nav>
  );
};

export default Navbar;
