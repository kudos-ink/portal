import Link from "next/link";
import { Link as NuiLink } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import NextImage from "next/image";

interface IEventBannerProps {}

const EventBanner = ({}: IEventBannerProps) => {
  return (
    <div className="relative py-4 px-3 bg-default-100 rounded-md overflow-hidden">
      <NextImage
        className="pointer-events-none absolute -left-[5px] -top-[10px] h-[calc(100%_+_60px)] w-[calc(140%_+_10px)] md:w-[calc(104%_+_10px)] max-w-[initial] object-cover object-top"
        src="/images/kudos-weeks.png"
        alt="Event banner"
        height={983}
        width={1200}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background/60 to-transparent"></div>
      <div className="relative z-10 flex flex-col items-start w-8/12 md:w-6/12">
        <h4 className="tracking-tight text-lg font-bold text-foreground">
          Kudos Carnival
        </h4>
        <p className="mt-2">
          A 6-week event (November 1st - December 15th), designed to enhance
          contributions to the Polkadot ecosystem.
        </p>
        <NuiLink href="/carnival" title="Kudos Weeks event page" as={Link}>
          <Button className="mt-4 font-black" color="primary">
            Join in
          </Button>
        </NuiLink>
      </div>
    </div>
  );
};

export default EventBanner;
