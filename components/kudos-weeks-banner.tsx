import Link from "next/link";
import { Link as NuiLink } from "@nextui-org/link";

function KudosWeeksBanner({ children }: { children: React.ReactNode }) {
  return (
    <NuiLink
      className="w-full"
      href="/events/kudos-weeks"
      color="foreground"
      title="Kudos Weeks event page"
      as={Link}
    >
      <blockquote className="relative w-full flex justify-between items-center text-lg border px-4 py-3 rounded-xl [&amp;>p]:m-0 border-primary bg-primarlay my-2 cursor-pointer hover:bg-primary transition-colors">
        <span>{children}</span>
        <span className="font-bold absolute right-6 transform -translate-x-1/2 text-2xl animate-bounce-right">
          {" "}
          &gt;{" "}
        </span>
      </blockquote>
    </NuiLink>
  );
}

export default KudosWeeksBanner;
