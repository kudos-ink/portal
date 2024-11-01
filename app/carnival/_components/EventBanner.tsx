import NextImage from "next/image";
import { IconRepo, IconSocial, IconWeb } from "@/assets/icons";
import Countdown from "@/components/countdown";

const EventBanner = () => (
  <article className="rounded-xl p-6 bg-container-1 border-container-stroke-separator relative overflow-hidden h-[675px]">
    <NextImage
      className="hidden md:block pointer-events-none absolute -left-[5px] -top-[30px] h-[calc(100%_+_60px)] w-[calc(100%_+_10px)] max-w-[initial] object-cover object-top"
      src="/images/kudos-weeks.png"
      alt="Event banner"
      height={983}
      width={1200}
    />
    <NextImage
      className="md:hidden pointer-events-none absolute -left-[5px] -top-[30px] h-[calc(100%_+_60px)] w-[calc(100%_+_10px)] max-w-[initial] object-cover object-top"
      src="/images/kudos-carnival-mobile.png"
      alt="Event banner"
      height={662}
      width={775}
    />
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background/50 to-transparent"></div>
    <div className="relative flex flex-col gap-6 md:w-6/12">
      <div className="flex flex-col gap-1">
        <span className="text-xl text-primary italic">
          {"kudos < > PBA host"}
        </span>
        <span className="tracking-tight text-6xl font-bold">
          Kudos Carnival
        </span>
        <span className="text-xl text-default-600">
          November 1 - December 15, 2024
        </span>
      </div>

      <Countdown date="2024-11-01T14:00:00.536328Z" />

      <h3 className="hidden md:block text-xl text-default-600 mt-4">
        Want to level up your contributions? Make an impact on Polkadot, solve
        key issues, and rise up the Kudos leaderboard!
      </h3>
      <div className="gap-3 flex flex-col sm:flex-row">
        <div className="flex min-w-40 flex-col gap-2 rounded-xl bg-default text-default-foreground p-3">
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-text-1 flex items-center gap-2">
              <IconSocial size={16} /> Participants
            </span>
          </div>
          <span className="text-2xl font-bold text-text-1">TBA</span>
        </div>
        <div className="flex min-w-40 flex-col gap-2 rounded-xl bg-default text-default-foreground p-3">
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-text-1 flex items-center gap-2">
              <IconRepo size={16} /> Issues to challenge
            </span>
          </div>
          <span className="text-2xl font-bold text-text-1">
            TBA
            {/* 87 <span className="text-default-600 font-medium">/ 134</span> */}
          </span>
        </div>
        <div className="flex min-w-40 flex-col gap-2 rounded-xl bg-default text-default-foreground p-3">
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-text-1 flex items-center gap-2">
              <IconWeb size={16} /> Projects
            </span>
          </div>
          <span className="text-2xl font-bold text-text-1">TBA</span>
        </div>
      </div>
    </div>
  </article>
);

export default EventBanner;
