import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { GithubIcon, TwitterIcon } from "@/assets/icons";
import About from "@/components/about";
import Community from "@/components/community";
import CtaBanner from "@/components/cta-banner";
import Toolbar from "@/components/filters/toolbar";
import { container, title } from "@/components/primitives";
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
        className={`flex flex-col items-center text-center pt-10 pb-22 ${container()}`}
      >
        <h1 className={title()}>
          Find Collaborations,
          <br />
          Collect Kudos
        </h1>
      </section>
      <section className={container() + " py-8 pt-24"}>
        <CtaBanner />
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

      <section className={container() + " pt-40"}>
        <About />
      </section>

      <section className={container() + " py-40"}>
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
