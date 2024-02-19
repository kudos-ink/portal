"use client";

import { Skeleton } from "@nextui-org/skeleton";
import { IS_EMAIL_SUBSCRIBED } from "@/data/local-storage";
import useClientReady from "@/hooks/useClientReady";
import useEmailSubscriptionStatus from "@/hooks/useEmailSubscriptionStatus";
import Email from "../email";

const TopBar = () => {
  const isClientReady = useClientReady();
  const { isSubscribed, onSuccessfulSubscription } =
    useEmailSubscriptionStatus(IS_EMAIL_SUBSCRIBED);

  const renderSubscriptionMessage = () => {
    return isSubscribed ? (
      <span>Thank you for joining us!</span>
    ) : (
      <>
        <span className="hidden sm:inline">
          Get the Latest Features (zero spam): Join Kudos Updates
        </span>
        <span className="inline sm:hidden">Get Kudos Updates (zero spam)</span>
      </>
    );
  };

  const renderContent = () => {
    if (!isClientReady) {
      return (
        <Skeleton className="w-4/12 rounded-lg">
          <div className="h-6 w-4/12 rounded-lg bg-default-500" />
        </Skeleton>
      );
    }

    return (
      <>
        <div className="flex items-center gap-2">
          <div className="mr-2 rounded bg-danger px-1.5 py-0.5 text-xs font-bold text-white">
            <span className="mr-1 hidden sm:inline">Mailing list</span>▶
          </div>
          <div className="font-bold">{renderSubscriptionMessage()}</div>
        </div>
        {!isSubscribed && (
          <Email
            buttonProps={{
              className: "font-semibold h-11",
              color: "default",
              variant: "flat",
            }}
            inputProps={{
              color: "default",
              classNames: {
                inputWrapper: "border-foreground h-11 font-semibold",
                helperWrapper: "!hidden",
              },
              variant: "bordered",
            }}
            onSuccessfulSubscription={onSuccessfulSubscription}
          />
        )}
      </>
    );
  };

  return (
    <div className="bg-primary top-0 z-10">
      <div className="flex flex-col justify-center items-center gap-3 py-3 lg:flex-row lg:gap-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default TopBar;
