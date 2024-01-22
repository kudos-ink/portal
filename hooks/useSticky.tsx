import { useState, useEffect, RefObject } from "react";
import { useMediaQuery } from "react-responsive";
import { debounce, throttle } from "@/utils/misc";

const useSticky = (ref: RefObject<HTMLElement>) => {
  const [isSticky, setIsSticky] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 639 }); // tailwind lg default: 640px

  useEffect(() => {
    const updateSticky = () => {
      if (ref.current) {
        const boundingRect = ref.current.getBoundingClientRect();
        const isElementTopAboveViewport = boundingRect.top < 10;

        if (isSticky !== isElementTopAboveViewport) {
          setIsSticky(isElementTopAboveViewport);
        }
      }
    };

    const handleScroll = isMobile
      ? throttle(updateSticky, 500)
      : debounce(updateSticky, 10);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, isSticky, ref]);

  return isSticky;
};

export default useSticky;
