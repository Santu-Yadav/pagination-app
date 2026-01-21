import { useEffect, useState } from "react";

export const useDebounce = (inputString: string, delay: number): string => {
  const [debouncedString, setDebouncedString] = useState<string>(inputString);

  useEffect(() => {
    let timerId = setTimeout(() => {
      setDebouncedString(inputString);
    }, delay);

    return () => clearTimeout(timerId);
  }, [inputString, delay]);

  return debouncedString;
};
