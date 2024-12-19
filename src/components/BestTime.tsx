import useTime from "@/lib/useTime";
import { useEffect } from "react";

const BestTime = () => {
  const { bestTime } = useTime();

  useEffect(() => {
    console.log(bestTime);
  }, [bestTime]);

  if (bestTime === Infinity) {
    return null;
  }
  console.log(bestTime);

  return (
    <div className="flex flex-col text-emerald-400 leading-tight items-center justify-center">
      <p className="text-sm text-white tracking-tighter">Your best time:</p>
      <p className="font-bold tracking-tight text-xl">
        {bestTime.toString()} ms
      </p>
    </div>
  );
};

export default BestTime;
