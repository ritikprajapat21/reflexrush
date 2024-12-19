import { useFirebase } from "@/context/FirebaseProvider";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const AuthHeader = () => {
  const { user } = useFirebase();
  console.log(user);

  if (user) {
    return (
      <motion.button
        initial={{ x: 70, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <NavLink
          to="/profile"
          className="p-2 px-4 bg-emerald-800 hover:bg-emerald-700 text-white rounded-md cursor-pointer"
        >
          Profile
        </NavLink>
      </motion.button>
    );
  }

  return (
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
        Sign in
      </NavLink>
    </motion.button>
  );
};

export default AuthHeader;
