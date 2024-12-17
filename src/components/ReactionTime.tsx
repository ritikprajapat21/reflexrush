import { useEffect, useState } from "react";
import Block from "./Block";
import Confetti from "react-confetti-boom";
import { AnimatePresence, motion } from "framer-motion";
import { useFirebase } from "../context/FirebaseProvider";

const ReactionTime = () => {
  const [start, setStart] = useState<Boolean>(false);
  const [win, setWin] = useState<"pending" | "won" | "lost">("pending");
  const [winTime, setWinTime] = useState<Number>(0);
  const [time, setTime] = useState<Number>(0);

  useEffect(() => {
    if (start) {
      setTime(Math.floor(Math.random() * 6));
    }
  }, [start]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <AnimatePresence mode="wait" initial={false}>
        {!start && (
          <motion.button
            key="button"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
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
        )}
        {start && (
          <Block
            time={time}
            setTime={setTime}
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
