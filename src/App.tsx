import { motion } from "framer-motion";
import ReactionTime from "./components/ReactionTime";

function App() {
  return (
    <section className="max-w-7xl mx-auto py-4">
      <motion.h1
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-3xl text-center font-bold tracking-tight mt-4"
      >
        Reflex Rush
      </motion.h1>
      <motion.p
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-4"
      >
        Check your reaction time and challenge other
      </motion.p>
      <ReactionTime />
    </section>
  );
}

export default App;
