import { motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./components/ui/card";
import { Link } from "react-router-dom";

const Rules = () => {
  const rules = [
    'Click the "Start" button to begin.',
    "A red box will appear on your screen.",
    "Stay focused! The box will randomly turn green after a short delay.",
    "As soon as the box turns green, click on it as fast as you can.",
    "Your reaction time, measured in milliseconds, will be displayed.",
  ];

  return (
    <motion.section
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-7xl mx-auto mt-20 grid place-items-center gap-6"
    >
      <Card className="p-4">
        <CardTitle className="text-emerald-800 mb-4 text-3xl text-center font-bold tracking-tight">
          How to play?
        </CardTitle>
        <CardDescription className="text-emerald-800">
          <ol className="flex items-start flex-col gap-4 text-lg px-4">
            {rules.map((rule, index) => (
              <li key={index}>
                <span className="font-bold">{index + 1}.</span> {rule}
              </li>
            ))}
          </ol>
        </CardDescription>
        <CardFooter className="mt-8 flex items-center justify-center">
          <motion.button
            initial={{ x: 70, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              to="/"
              className="p-2 px-4 bg-emerald-800 hover:bg-emerald-700 text-white rounded-md cursor-pointer"
            >
              Back
            </Link>
          </motion.button>
        </CardFooter>
      </Card>
    </motion.section>
  );
};

export default Rules;
