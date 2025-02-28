import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { IconSocial, IconWeb } from "@/assets/icons";
import Toolbar from "@/components/filters/toolbar";
import { container } from "@/components/primitives";
import PaginatedTable from "@/components/table/paginated-table";
import { FiltersProvider } from "@/contexts/filters";
import { SITE_CONFIG } from "@/data/config";
import { DEFAULT_PAGINATION } from "@/data/fetch";
import { getFilterOptions } from "@/lib/filters";
import { initFilters } from "@/utils/filters";
import { FilterOptions } from "@/types/filters";
import { TaskQueryParams } from "@/types/task";
import { Leaderboard } from "@/types/leaderboard";
import EventBanner from "./_components/EventBanner";
import { fetchTasks } from "@/lib/api/tasks";
import { fetchProjects } from "@/lib/api/projects";
import LeaderboardTable from "@/components/leaderboard/table";
import { CARNIVAL_WIP_TASKS, CARNIVAL_CLOSED_TASKS } from "@/data/carnival";

const MOCKED_WEEKLY_LEADERBOARD: Leaderboard[] = [
  {
    avatar: "https://avatars.githubusercontent.com/u/33208377?v=4",
    name: "Kazunobu Ndong",
    username: "ndkazu",
    score: 39,
    // https://github.com/paritytech/polkadot-sdk/issues/4859 - Completed - Estimation (6h): 8
    // https://github.com/paritytech/polkadot-sdk/pull/6509 - Completed - Estimation (6h): 8
    // https://github.com/paritytech/polkadot-sdk/issues/6194 - Completed - Estimation (6h): 8
    // https://github.com/galacticcouncil/hydration-node/issues/951 - In Review: 1
    // https://github.com/r0gue-io/pop-cli/issues/350 - In Review: 1
    // https://github.com/paritytech/polkadot-sdk/issues/6476 - Ask to Work: 1 - Completed - Estimation (3h): 4
    // https://github.com/r0gue-io/pop-node/pull/401 - Effort: 2
    // https://github.com/r0gue-io/pop-node/issues/337 - Ask to Work - In Review - Estimation (4h): 6
    // Kudos Support: 1
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/76661350?v=4",
    name: "Parth Mittal",
    username: "mittal-parth",
    score: 38,
    // https://github.com/OpenZeppelin/openzeppelin-pallet-abstractions/pull/47 - Ask to Work - In Review: 2
    // https://github.com/RostislavLitovkin/PlutoWallet/pull/81 - Ask to Work - In Review: 2
    // https://github.com/RostislavLitovkin/PlutoWallet/pull/80 - Ask to Work - Completed - Estimation (4h): 7
    // https://github.com/mittal-parth/polkadot-dev-cli - Idea: 15
    // https://github.com/ChainSafe/gossamer/issues/4251 - Ask to Work - Completed - Estimation (6h): 9
    // https://github.com/AcalaNetwork/chopsticks/issues/848 - Ask to Work - In Review: 2
    // https://github.com/paritytech/subxt/issues/1464 - Ask to Work - In Review: 2
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/25376882?v=4",
    name: "Ludovic Domingues",
    username: "Krayt78",
    score: 32, // Ask to Work - 11 (11 PRs for benchmarking v2) - In Review
    // https://github.com/paritytech/polkadot-sdk/issues/590 - Ask to Work - In Review (4) - Completed (3)
    // https://github.com/paritytech/polkadot-sdk/pull/6618 - benchmarking - Merged +1
    // https://github.com/paritytech/polkadot-sdk/pull/6617 - benchmarking - Merged +1
    // https://github.com/polytope-labs/solidity-merkle-trees/issues/32 - Completed - Estimation (4h): 4
    // https://github.com/paritytech/polkadot-sdk/issues/3600 - Ask to Work - In Review (2)
    // https://github.com/paritytech/polkadot-sdk/issues/6504 - In Review (3)
    //// https://github.com/paritytech/polkadot-sdk/pull/6931
    //// https://github.com/paritytech/polkadot-sdk/pull/6925
    //// https://github.com/paritytech/polkadot-sdk/pull/6930
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/6019499?v=4",
    name: "Silvereau",
    username: "sylvaincormier",
    score: 32,
    // https://github.com/AstarNetwork/Astar/pull/1382 - Closed - Bonus Effort (6h): 6
    // https://github.com/AstarNetwork/Astar/pull/1385 - Closed - Bonus Effort (8h): 12
    // https://github.com/paritytech/polkadot-sdk/issues/5224 - Ask to Work - In Review: 2
    // https://github.com/galacticcouncil/hydration-node/issues/952 - Ask to Work - In Review: 2
    // https://github.com/polytope-labs/hyperbridge/issues/350 - Completed - Estimation (4h): 6
    // https://github.com/polytope-labs/hyperbridge/pull/352 - Closed - Bonus Effort: 4
  },
  // {
  //   avatar: "https://avatars.githubusercontent.com/u/78631234?v=4",
  //   name: "Maheswaran Velmurugan",
  //   username: "soloking1412",
  //   score: 3, // Ask to Work
  // },
].map((item, idx) => ({ id: idx + 1, ...item }));

export default async function SingleEventPage() {
  const filters = initFilters();
  const filterOptions = await getFilterOptions().catch((error) => {
    console.error("Error fetching filter options:", error);
    return {} as FilterOptions;
  });

  const tasksQuery: TaskQueryParams = {
    labels: [],
  };

  const tasks = await fetchTasks(tasksQuery);
  const projects = await fetchProjects({
    certified: true,
  });

  return (
    <>
      <section className={container()}>
        <EventBanner
          tasks={tasks.totalCount - CARNIVAL_WIP_TASKS.length}
          tasksCompleted={
            CARNIVAL_CLOSED_TASKS.length + CARNIVAL_WIP_TASKS.length
          }
          projects={projects.totalCount}
        />
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
                  2. Label your tasks with{" "}
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
                  1. Select an task from the backlog and get assigned
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
              the Polkadot ecosystem. Participants will solve curated open tasks
              from the Kudos platform, provided by ecosystem partners, earning
              points for each task they complete.
            </p>
            <p>
              Throughout the event, weekly winners will be announced during
              community calls, and top contributors will receive special prizes.
              Points are earned by closing tasks listed in the backlog, with
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
            label="Kudos Carnival Tasks Backlog"
            selectFilters={[]}
            checkboxFilters={[]}
            shouldUpdateRouter={false}
          />
          <section className={container()}>
            <PaginatedTable
              query={tasksQuery}
              pagination={DEFAULT_PAGINATION}
              emptyContent="Label your tasks with 'kudos' to have them featured in the backlog"
            />
          </section>
        </div>
      </FiltersProvider>

      <section className={container() + " mt-32"}>
        <h2 id="leaderboard" className="text-foreground text-5xl font-bentoga">
          Top Contributors
        </h2>
        <h3 className="text-xl text-default-600 mt-4">
          Earn points for every assigned task you complete during the event.
        </h3>
        <div className="flex flex-col gap-4 sm:flex-row mt-16">
          <div className="flex flex-col gap-2 basis-1/3">
            <div className="text-lg font-bold leading-normal">Final</div>
            <LeaderboardTable data={MOCKED_WEEKLY_LEADERBOARD} />
          </div>
        </div>
      </section>
    </>
  );
}
