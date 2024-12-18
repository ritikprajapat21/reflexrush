import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface InterfaceProps {
  duration: Number;
  setStart: Dispatch<SetStateAction<Boolean>>;
  setWinTime: Dispatch<SetStateAction<Number>>;
  setDuration: Dispatch<SetStateAction<Number>>;
  setWin: Dispatch<SetStateAction<"pending" | "won" | "lost">>;
  win: "pending" | "won" | "lost";
}

interface BlockProps {
  color: String;
  onClick: () => void;
}

const Block: React.FC<BlockProps> = ({ color, onClick }) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`w-40 h-40 cursor-pointer ${color} rounded-md`}
      onClick={onClick}
    />
  );
};

const Interface: React.FC<InterfaceProps> = ({
  duration,
  setStart,
  setDuration,
  setWinTime,
  setWin,
  win,
}) => {
  const [change, setChange] = useState(false);
  const [intialTime, setIntialTime] = useState<null | Date>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setChange(true);
      setIntialTime(new Date());
    }, Number(duration) * 1000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [duration]);

  const winClick = () => {
    const time = new Date();

    const diff = time.getTime() - intialTime?.getTime()!;

    setStart(false);
    setWin("won");
    setChange(false);
    setDuration(0);
    setWinTime(diff);
  };

  const loseClick = () => {
    setStart(false);
    setIntialTime(null);
    setChange(false);
    setDuration(0);
    setWin("lost");
  };

  return (
    <div>
      {win === "pending" ? (
        change ? (
          <Block color="bg-green-700" onClick={winClick} />
        ) : (
          <Block color="bg-red-700" onClick={loseClick} />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default Interface;
