import { useState, useEffect, RefObject } from "react";

const useSticky = (ref: RefObject<HTMLElement>) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const boundingRect = ref.current.getBoundingClientRect();
        const isElementTopAboveViewport = boundingRect.top <= 0;
        setIsSticky(isElementTopAboveViewport);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  return isSticky;
};

export default useSticky;
