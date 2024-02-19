import { useState, useEffect } from "react";

const useClientReady = () => {
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  return isClientReady;
};

export default useClientReady;
