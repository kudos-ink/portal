import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Link as NuiLink } from "@nextui-org/link";
import IssuesApi from "@/api/core/issues";
import { GithubIcon, TwitterIcon } from "@/assets/icons";
import About from "@/components/about";
import Community from "@/components/community";
import CtaBanner from "@/components/cta-banner";
import Toolbar from "@/components/filters/toolbar";
import ProjectCarousel from "@/components/project-carousel";
import { container, subtitle, title } from "@/components/primitives";
import StaticTable from "@/components/table/static-table";
import { DefaultFiltersProvider } from "@/components/providers/filters";
import { SITE_CONFIG } from "@/data/config";
import {
  DEFAULT_HOMEPAGE_PAGE_SIZE,
  DEFAULT_PAGINATED_RESPONSE,
} from "@/data/fetch";

const EXPLORE_LABEL = "Explore Open Contributions";

export default async function Home() {
  const issues = await IssuesApi.getIssues({
    offset: 0,
    limit: DEFAULT_HOMEPAGE_PAGE_SIZE,
  }).catch((error) => {
    console.error("Error fetching issues:", error);
    return DEFAULT_PAGINATED_RESPONSE;
  });

  return (
    <>
      <section
        className={`flex flex-col items-center text-center pt-10 pb-24 sm:pb-28 ${container()}`}
      >
        <h1 className={title()}>
          Find Great-Fit <span className="text-primary">Polkadot</span>{" "}
          Collaborations:
          <br />
          Earn Incentives, Collect Kudos
        </h1>
        <h2 className={`mt-8 ${subtitle()}`}>
          Navigate the Substrate ecosystem like never before - to meet teams and
          start proactively working on your next challenge.
        </h2>
      </section>

      <section className={"mb-8 " + container()}>
        <NuiLink
          className="w-full"
          href="/events/kudos-weeks"
          color="foreground"
          title="Kudos Weeks event page"
          as={Link}
        >
          <blockquote className="relative w-full flex justify-between items-center text-lg border px-4 py-3 rounded-xl [&amp;>p]:m-0 border-primary bg-primarlay my-2 cursor-pointer hover:bg-primary transition-colors">
            <span>
              ♨️ <strong>Kudos Weeks</strong> are about to start! -{" "}
              <strong>From Nov 1 to Dec 15</strong>: Level up your
              contributions, solve key issues, and rise up the Kudos
              leaderboard!
            </span>
            <span className="font-bold absolute right-6 transform -translate-x-1/2 text-2xl animate-bounce-right">
              {" "}
              &gt;{" "}
            </span>
          </blockquote>
        </NuiLink>
      </section>

      <DefaultFiltersProvider>
        <div className="flex flex-col">
          <Toolbar label="Latest Contributions" />
          <section className={container()}>
            <StaticTable data={issues.data} />
          </section>
        </div>
      </DefaultFiltersProvider>

      <section className={"flex flex-col items-center " + container()}>
        <NuiLink
          href="/explore/open-contributions"
          aria-label={EXPLORE_LABEL}
          title={EXPLORE_LABEL}
        >
          <Button
            className="font-semibold mt-8 mx-auto"
            color="primary"
            size="lg"
          >
            {EXPLORE_LABEL}
          </Button>
        </NuiLink>
      </section>
      <section className={container() + " pt-32"}>
        <ProjectCarousel />
      </section>

      <section className={container() + " pt-20"}>
        <CtaBanner />
      </section>

      <section className={container() + " pt-32"}>
        <About />
      </section>

      <section className={container() + " py-24"}>
        <Community>
          <Community.Card
            icon={<GithubIcon className="text-background" size={56} />}
            link={SITE_CONFIG.links.githubOrg}
            name="Github"
          />
          <Community.Card
            icon={<TwitterIcon className="text-background" size={56} />}
            isRtl
            link={SITE_CONFIG.links.twitter}
            name="Twitter"
          />
        </Community>
      </section>
    </>
  );
}
