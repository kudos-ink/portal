import { ReactNode } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

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
        className={`flex items-center gap-8 h-full p-6 ${
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
  <div className="mx-auto md:container">
    <h2 className="text-5xl text-center">Community</h2>
    <h3 className="text-3xl text-center mt-4">
      <strong className="font-bold">Join the conversation now</strong>
    </h3>
    <div className="flex flex-col justify-center items-center gap-8 mt-16 md:flex-row">
      {children}
    </div>
  </div>
);

Community.Card = CommunityCard;

export default Community;
