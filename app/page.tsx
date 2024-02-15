import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { GithubIcon, TwitterIcon } from "@/assets/icons";
import About from "@/components/about";
import Community from "@/components/community";
import CtaBanner from "@/components/cta-banner";
import Toolbar from "@/components/filters/toolbar";
import { container, subtitle, title } from "@/components/primitives";
import StaticTable from "@/components/table/static-table";
import { FiltersProvider } from "@/contexts/filters";
import { SITE_CONFIG } from "@/data/config";
import { queryDatabase } from "@/lib/notion";
import { fetchFilterOptions } from "@/lib/repository-metadata";
import { initFilters } from "@/utils/filters";
import { transformNotionDataToContributions } from "@/utils/notion";

const EXPLORE_LABEL = "Explore Open Contributions";

export default async function Home() {
  const filterOptions = await fetchFilterOptions();
  const filters = initFilters();
  const data = await queryDatabase();
  const contributions = transformNotionDataToContributions(data);

  return (
    <>
      <section
        className={`flex flex-col items-center text-center pt-10 pb-24 ${container()}`}
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

      <FiltersProvider
        initialFilters={filters}
        initialFilterOptions={filterOptions}
      >
        <div className="flex flex-col">
          <Toolbar label="Latest Contributions" />
          <section className={container()}>
            <StaticTable data={contributions} />
          </section>
        </div>
      </FiltersProvider>

      <section className={"flex flex-col items-center " + container()}>
        <Link
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
        </Link>
      </section>

      <section className={container() + " pt-32"}>
        <CtaBanner />
      </section>

      <section className={container() + " pt-24"}>
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
