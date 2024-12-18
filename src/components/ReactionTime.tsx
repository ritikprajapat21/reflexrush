import { lazy, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useTime from "@/lib/useTime";
import { Link } from "react-router-dom";

const Block = lazy(() => import("./Block"));
const Confetti = lazy(() => import("react-confetti-boom"));

const ReactionTime = () => {
  const [start, setStart] = useState<Boolean>(false);
  const [win, setWin] = useState<"pending" | "won" | "lost">("pending");
  const [winTime, setWinTime] = useState<Number>(0);
  const [duration, setDuration] = useState<Number>(0);
  const { checkTime, bestTime } = useTime();

  useEffect(() => {
    if (start) {
      setDuration(Math.floor(Math.random() * 6));
    }
  }, [start]);

  useEffect(() => {
    if (winTime !== 0) {
      checkTime(winTime);
    }
  }, [winTime]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
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
        className="text-center mb-2"
      >
        Check your reaction time and challenge other
      </motion.p>
      {bestTime !== Infinity && (
        <p className="text-emerald-400">
          Your current best time is:{" "}
          <span className="font-bold text-emerald-400">
            {bestTime.toString()} ms
          </span>
        </p>
      )}
      <AnimatePresence mode="wait" initial={false}>
        {!start && (
          <motion.div
            key="buttons"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="flex flex-col gap-4 justify-center items-stretch"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 px-4 bg-emerald-800 hover:bg-emerald-700 text-white rounded-md cursor-pointer"
              onClick={() => {
                setWin("pending");
                setWinTime(0);
                setStart(true);
              }}
            >
              Start Game
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 px-4 bg-emerald-800 hover:bg-emerald-700 text-white rounded-md cursor-pointer"
            >
              <Link to="/rules">How to play?</Link>
            </motion.button>
          </motion.div>
        )}
        {start && (
          <Block
            duration={duration}
            setDuration={setDuration}
            setStart={setStart}
            setWin={setWin}
            win={win}
            setWinTime={setWinTime}
          />
        )}
      </AnimatePresence>
      {win === "won" && (
        <>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold"
          >
            You took {` ${winTime}`}ms!
          </motion.div>
          <Confetti
            mode="boom"
            particleCount={50}
            colors={["#ff577f", "#ff884b"]}
          />
        </>
      )}
      {win === "lost" && (
        <motion.div
          key="lost"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold"
        >
          You clicked too early!
        </motion.div>
      )}
    </div>
  );
};

export default ReactionTime;
