import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { IconSocial, IconWeb } from "@/assets/icons";
import IssuesApi from "@/api/core/issues";
import ProjectsApi from "@/api/core/projects";
import Toolbar from "@/components/filters/toolbar";
import { Project, ProjectQueryParams } from "@/types/project";
import { container } from "@/components/primitives";
import PaginatedTable from "@/components/table/paginated-table";
import { FiltersProvider } from "@/contexts/filters";
import { SITE_CONFIG } from "@/data/config";
import { DEFAULT_PAGINATED_RESPONSE, DEFAULT_QUERY } from "@/data/fetch";
import { getFilterOptions } from "@/lib/filters";
import { initFilters } from "@/utils/filters";
import { FilterOptions } from "@/types/filters";
import { Issue, IssueQueryParams } from "@/types/issue";
import { Leaderboard } from "@/types/leaderboard";
import { PaginatedCustomResponse, PaginatedCustomResponseSnakeCase } from "@/types/pagination";
import EventBanner from "./_components/EventBanner";
import { BannerProps } from "@/types/banner";

const MOCKED_WEEKLY_LEADERBOARD: Leaderboard[] = [
  {
    avatar: "https://avatars.githubusercontent.com/u/10196091?v=4",
    name: "Ankan",
    username: "Ank4n",
    score: 11,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/1728078?v=4",
    name: "Michal Kucharczyk",
    username: "michalkucharczyk",
    score: 9,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/37149322?v=4",
    name: "Facundo Farall",
    username: "ffarall",
    score: 7,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/4390772?v=4",
    name: "Francisco Aguirre",
    username: "franciscoaguirre",
    score: 7,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/48095175?v=4",
    username: "CJ13th",
    score: 7,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/5718007?v=4",
    name: "Bastian Köcher",
    username: "bkchr",
    score: 5,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/85124277?v=4",
    name: "Benjamin Salon",
    username: "benjaminsalon",
    score: 4,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/26460174?v=4",
    name: "Igor Papandinas",
    username: "ipapandinas",
    score: 2,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/22482966?v=4",
    username: "leapalazzolo",
    score: 2,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/2580396?v=4",
    name: "Alexander Theißen",
    username: "athei",
    score: 1,
  },
].map((item, idx) => ({ id: idx + 1, ...item }));

const MOCKED_TOTAL_LEADERBOARD: Leaderboard[] = [
  {
    avatar: "https://avatars.githubusercontent.com/u/48095175?v=4",
    username: "CJ13th",
    score: 34,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/4390772?v=4",
    name: "Francisco Aguirre",
    username: "franciscoaguirre",
    score: 27,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/10196091?v=4",
    name: "Ankan",
    username: "Ank4n",
    score: 21,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/1728078?v=4",
    name: "Michal Kucharczyk",
    username: "michalkucharczyk",
    score: 20,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/22482966?v=4",
    username: "leapalazzolo",
    score: 18,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/37149322?v=4",
    name: "Facundo Farall",
    username: "ffarall",
    score: 15,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/26460174?v=4",
    name: "Igor Papandinas",
    username: "ipapandinas",
    score: 13,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/5718007?v=4",
    name: "Bastian Köcher",
    username: "bkchr",
    score: 8,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/2580396?v=4",
    name: "Alexander Theißen",
    username: "athei",
    score: 7,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/85124277?v=4",
    name: "Benjamin Salon",
    username: "benjaminsalon",
    score: 4,
  },
].map((item, idx) => ({ id: idx + 1, ...item }));

export default async function SingleEventPage() {
  const filters = initFilters();
  const filterOptions = await getFilterOptions().catch((error) => {
    console.error("Error fetching filter options:", error);
    return {} as FilterOptions;
  });

  const query: IssueQueryParams = {
    certified: true,
    open: true,
    labels: [],
  };
  const projectQuery: ProjectQueryParams = {
    certified: true,
    
  }
  const issues = (await IssuesApi.getIssues({
    ...DEFAULT_QUERY,
    ...query,
  }).catch((error) => {
    console.error(`Error fetching Kudos Carnival issues:`, error);
    return DEFAULT_PAGINATED_RESPONSE;
  })) as PaginatedCustomResponse<Issue>;

  const projects = (await ProjectsApi.getProjects({
    ...DEFAULT_QUERY,
    ...projectQuery,
  }).catch((error) => {
    console.error(`Error fetching Kudos Carnival projects:`, error);
    return DEFAULT_PAGINATED_RESPONSE;
  })) as PaginatedCustomResponseSnakeCase<Project>;
  const props : BannerProps = {issues: issues.totalCount, projects: projects.total_count}

  return (
    <>
      <section className={container()}>
        <EventBanner  {...props}/>
      </section>
      <section className={container() + " my-28"}>
        <h2 id="guidelines" className="text-foreground text-5xl font-bentoga">
          Onboarding steps
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="flex flex-col gap-8 lg:basis-[416px]">
            <div className="w-full flex flex-col relative overflow-hidden h-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none data-[pressed=true]:scale-[0.97] tap-highlight-transparent border-transparent bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]">
              <div className="flex p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large gap-2 pb-0">
                <div className="flex justify-center p-2 rounded-full items-center bg-secondary-100/80 text-pink-500">
                  <svg
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-pink-500"
                  >
                    <g
                      clipPath="url(#a)"
                      clipRule="evenodd"
                      fill="currentColor"
                      fillRule="evenodd"
                    >
                      <path d="M21.865 5.166A11.945 11.945 0 0 1 24 12.001c0 2.54-.789 4.895-2.135 6.834l-3.109-3.109A7.679 7.679 0 0 0 19.714 12a7.679 7.679 0 0 0-.958-3.725l3.109-3.109Z"></path>
                      <path d="m18.834 2.135-3.108 3.109a7.714 7.714 0 1 0 0 13.513l3.108 3.108A11.946 11.946 0 0 1 12 24C5.373 24 0 18.627 0 12S5.373 0 12 0c2.54 0 4.895.789 6.834 2.135Z"></path>
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path d="M0 0h24v24H0z" fill="#fff"></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p className="text-base font-semibold">For Projects</p>
              </div>
              <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
                <p className="font-normal text-base text-default-500">
                  1. Submit your project by filling out{" "}
                  <Link
                    isExternal
                    showAnchorIcon
                    href={SITE_CONFIG.links.includeProject}
                    target="_blank"
                    aria-label="Include your project"
                    title="Include your project"
                  >
                    this form
                  </Link>
                </p>
                <p className="font-normal text-base text-default-500">
                  2. Label your issues with{" "}
                  <strong className="text-foreground">&quot;kudos&quot;</strong>
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col relative overflow-hidden h-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none data-[pressed=true]:scale-[0.97] tap-highlight-transparent border-transparent bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]">
              <div className="flex p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large gap-2 pb-0">
                <div className="flex justify-center p-2 rounded-full items-center bg-secondary-100/80 text-pink-500">
                  <svg
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-pink-500 rotate-180"
                  >
                    <g
                      clipPath="url(#a)"
                      clipRule="evenodd"
                      fill="currentColor"
                      fillRule="evenodd"
                    >
                      <path d="M21.865 5.166A11.945 11.945 0 0 1 24 12.001c0 2.54-.789 4.895-2.135 6.834l-3.109-3.109A7.679 7.679 0 0 0 19.714 12a7.679 7.679 0 0 0-.958-3.725l3.109-3.109Z"></path>
                      <path d="m18.834 2.135-3.108 3.109a7.714 7.714 0 1 0 0 13.513l3.108 3.108A11.946 11.946 0 0 1 12 24C5.373 24 0 18.627 0 12S5.373 0 12 0c2.54 0 4.895.789 6.834 2.135Z"></path>
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path d="M0 0h24v24H0z" fill="#fff"></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p className="text-base font-semibold">For PBA Alumni</p>
              </div>
              <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
                <p className="font-normal text-base text-default-500">
                  1. Select an issue from the backlog and get assigned
                </p>
                <p className="font-normal text-base text-default-500">
                  2. Complete it and climb the leaderboard!
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1">
            <div className="flex-center gap-2 spread border-b-small pb-2">
              <div className="text-tinted fs-sm">About the Event</div>
            </div>
            <p>
              Kudos Carnival is a 6-week event (November 1st - December 15th)
              exclusively for PBA Alumni, designed to enhance contributions to
              the Polkadot ecosystem. Participants will solve curated open
              issues from the Kudos platform, provided by ecosystem partners,
              earning points for each issue they complete.
            </p>
            <p>
              Throughout the event, weekly winners will be announced during
              community calls, and top contributors will receive special prizes.
              Points are earned by closing issues listed in the backlog, with
              progress tracked on a{" "}
              <Link
                href="#leaderboard"
                aria-label="Kudos Week Leaderboard"
                title="Kudos Week Leaderboard"
              >
                <strong className="text-primary">leaderboard</strong>
              </Link>
              .
            </p>
            <p className="uppercase tracking-wide font-semibold">
              Join in, contribute to real projects, and showcase your impact on
              the Polkadot ecosystem!
            </p>
            {/* <div className="flex flex-wrap gap-3">
              <Button
                size="sm"
                aria-label="telegram group"
                color="default"
                variant="faded"
                className="capitalize"
                startContent={<IconSocial size={16} />}
              >
                <p className="text-sm">Telegram group</p>
              </Button>
              <Button
                size="sm"
                aria-label="telegram group"
                color="default"
                variant="faded"
                className="capitalize"
                startContent={<IconWeb size={16} />}
              >
                <p className="text-sm">Blog post</p>
              </Button>
            </div> */}
          </div>
        </div>
      </section>

      <FiltersProvider
        initialFilters={filters}
        initialFilterOptions={filterOptions}
      >
        <div className="flex flex-col">
          {/* TODO: Add advance filters but make sure to only have the correct filters options from the query above (add props to DefaultFiltersProvider to support query) */}
          <Toolbar
            label="Kudos Carnival Issues Backlog"
            selectFilters={[]}
            checkboxFilters={[]}
            shouldUpdateRouter={false}
          />
          <section className={container()}>
            <PaginatedTable
              initialItems={issues}
              query={query}
              pagination={DEFAULT_QUERY}
              emptyContent="Label your issues with 'kudos' to have them featured in the backlog"
            />
          </section>
        </div>
      </FiltersProvider>

      <section className={container() + " mt-32"}>
        <h2 id="leaderboard" className="text-foreground text-5xl font-bentoga">
          Top Contributors
        </h2>
        <h3 className="text-xl text-default-600 mt-4">
          Earn points for every assigned issue you complete during the event.
        </h3>
        <div className="flex flex-col gap-4 sm:flex-row mt-16">
          <div className="flex flex-col gap-2 basis-1/2">
            <div className="text-lg font-bold leading-normal">This week</div>
            <strong>TBA</strong>
            {/* <LeaderboardTable data={MOCKED_WEEKLY_LEADERBOARD} /> */}
          </div>

          <div className="flex flex-col gap-2 basis-1/2">
            <div className="text-lg font-bold leading-normal">All time</div>
            <strong>TBA</strong>
            {/* <LeaderboardTable data={MOCKED_TOTAL_LEADERBOARD} /> */}
          </div>
        </div>
      </section>
    </>
  );
}
