import { Button } from "@nextui-org/button";
import { Link as NuiLink } from "@nextui-org/link";
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
import { DEFAULT_HOMEPAGE_PAGE_SIZE } from "@/data/fetch";
import { fetchTasks } from "@/lib/api/tasks";

const EXPLORE_LABEL = "Explore Open Contributions";

export default async function Home() {
  const tasks = await fetchTasks({
    limit: DEFAULT_HOMEPAGE_PAGE_SIZE,
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

      <DefaultFiltersProvider>
        <div className="flex flex-col">
          <Toolbar label="Suggested Contributions" />
          <section className={container()}>
            <StaticTable data={tasks.data} clickableLabels />
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
