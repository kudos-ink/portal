import { ReactNode } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import Email from "./email";

const COMMUNITY_TITLE = "Community";

interface ICommunityCardProps {
  icon: ReactNode;
  isRtl?: boolean;
  link: string;
  name: string;
}

const CommunityCard = ({ icon, isRtl, link, name }: ICommunityCardProps) => (
  <Link href={link} target="_blank" rel="noreferrer" title={name}>
    <Card className="w-[350px] bg-primary">
      <CardBody
        className={`flex items-center gap-8 h-full p-6 font-bentoga ${
          isRtl ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {icon}
        <h4 className="text-6xl text-cente text-background">{name}</h4>
      </CardBody>
    </Card>
  </Link>
);

interface ICommunityProps {
  children: ReactNode;
}

const Community = ({ children }: ICommunityProps) => (
  <div className="flex flex-col items-center mx-auto md:container">
    <Link
      href="#community"
      aria-label={COMMUNITY_TITLE}
      title={COMMUNITY_TITLE}
    >
      <h2
        id="community"
        className="text-foreground text-5xl text-center font-bentoga"
      >
        {COMMUNITY_TITLE}
      </h2>
    </Link>
    <div className="grid gap-12 md:grid-cols-2">
      <div>
        <h3 className="text-3xl text-center mt-4">
          <strong className="font-bold">Stay in the loop</strong>
        </h3>
        <h4 className="text-xl text-center mt-4">
          Join our mailing list to stay in the loop with our newest feature
          releases (no spam).
        </h4>
        <div className="flex flex-col justify-center items-center gap-8 mt-16 md:flex-row">
          <Email />
        </div>
      </div>
      <div>
        <h3 className="text-3xl text-center mt-4">
          <strong className="font-bold">Join the conversation now</strong>
        </h3>
        <div className="flex flex-col justify-center items-center gap-8 mt-16 md:flex-row">
          {children}
        </div>
      </div>
    </div>
  </div>
);

Community.Card = CommunityCard;

export default Community;
