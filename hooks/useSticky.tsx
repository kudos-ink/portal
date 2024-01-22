import { useState, useEffect, RefObject } from "react";
import { throttle } from "@/utils/misc";

const useSticky = (ref: RefObject<HTMLElement>) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      requestAnimationFrame(() => {
        if (ref.current) {
          const boundingRect = ref.current.getBoundingClientRect();
          const isElementTopAboveViewport = boundingRect.top < 10;

          if (isSticky !== isElementTopAboveViewport) {
            setIsSticky(isElementTopAboveViewport);
          }
        }
      });
    }, 500);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky, ref]);

  return isSticky;
};

export default useSticky;
