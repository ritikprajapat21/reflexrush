import { useEffect, useState } from "react";

export default function useTime() {
  const [bestTime, setBestTime] = useState<Number>(Infinity);

  useEffect(() => {
    setBestTime(Number(localStorage.getItem("bestTime") || Infinity));
  }, []);

  const checkTime = (newTime: Number) => {
    console.log(newTime, bestTime);
    if (newTime < bestTime) {
      setBestTime(newTime);
      localStorage.setItem("bestTime", String(newTime));
    }
  };

  return { checkTime, bestTime };
}
