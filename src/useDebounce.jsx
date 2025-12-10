import { useEffect, useState } from "react";

export const useDebounce = (inputString, delay) => {
  const [debouncedString, setDebouncedString] = useState(inputString);

  useEffect(() => {
    let timerId = setTimeout(() => {
      setDebouncedString(inputString);
    }, delay);

    return () => clearTimeout(timerId);
  }, [inputString, delay]);

  return debouncedString;
};
