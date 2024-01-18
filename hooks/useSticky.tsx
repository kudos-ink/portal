import { useState, useEffect, RefObject } from "react";
import { debounce } from "@/utils/misc";

const useSticky = (ref: RefObject<HTMLElement>) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (ref.current) {
        const boundingRect = ref.current.getBoundingClientRect();
        const isElementTopAboveViewport = boundingRect.top <= 0;
        setIsSticky(isElementTopAboveViewport);
      }
    }, 10); // Adjust the debounce time (in ms) as needed

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  return isSticky;
};

export default useSticky;
