import { useState, useEffect } from "react";

interface IContext {
  isSubscribed: boolean;
  onSuccessfulSubscription: () => void;
}

const useEmailSubscriptionStatus = (key: string): IContext => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  useEffect(() => {
    const subscriptionStatus = localStorage.getItem(key) === "true";
    setIsSubscribed(subscriptionStatus);
  }, [key]);

  const onSuccessfulSubscription = () => {
    localStorage.setItem(key, "true");
    setIsSubscribed(true);
  };

  return { isSubscribed, onSuccessfulSubscription };
};

export default useEmailSubscriptionStatus;
