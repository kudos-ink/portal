import { GithubIcon, TwitterIcon } from "@/assets/icons";
import { SITE_CONFIG } from "@/data/config";
import { Link } from "@nextui-org/link";

const SocialLinks = () => (
  <ul className="flex items-center gap-4">
    <li className="flex items-center">
      <Link
        href={SITE_CONFIG.links.twitter}
        target="_blank"
        rel="noreferrer"
        title="Twitter"
      >
        <TwitterIcon className="text-foreground" />
      </Link>
    </li>
    <li className="flex items-center">
      <Link
        href={SITE_CONFIG.links.githubOrg}
        target="_blank"
        rel="noreferrer"
        title="Github"
      >
        <GithubIcon className="text-foreground" />
      </Link>
    </li>
  </ul>
);

export default SocialLinks;
