import Link from "next/link";
import { Button } from "@nextui-org/button";
import { TwitterIcon, GithubIcon } from "@/assets/icons";
import { SITE_CONFIG } from "@/data/config";

const Footer = () => (
  <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
    <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
      Built by{" "}
      <a
        href={SITE_CONFIG.links.twitter}
        target="_blank"
        rel="noreferrer"
        className="font-medium underline underline-offset-4"
      >
        Kudos
      </a>
      . The source code is available on{" "}
      <a
        href={SITE_CONFIG.links.github}
        target="_blank"
        rel="noreferrer"
        className="font-medium underline underline-offset-4"
      >
        GitHub
      </a>
      .
    </p>
    <div className="flex items-center gap-4">
      <span>Join the Kudos community</span>
      <div className="flex items-center space-x-2">
        <Link
          href={SITE_CONFIG.links.twitter}
          target="_blank"
          rel="noreferrer"
          title="Twitter"
        >
          <Button
            size="sm"
            isIconOnly
            aria-label="Kudos on Twitter"
            variant="flat"
          >
            <TwitterIcon className="text-foreground" />
          </Button>
        </Link>
        <Link
          href={SITE_CONFIG.links.githubOrg}
          target="_blank"
          rel="noreferrer"
          title="Github"
        >
          <Button
            size="sm"
            isIconOnly
            aria-label="Kudos on Github"
            variant="flat"
          >
            <GithubIcon className="text-foreground" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

export default Footer;
