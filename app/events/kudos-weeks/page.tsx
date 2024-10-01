import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { IconSocial, IconWeb } from "@/assets/icons";
import IssuesApi from "@/api/core/issues";
import Toolbar from "@/components/filters/toolbar";
import LeaderboardTable from "@/components/leaderboard/table";
import { container } from "@/components/primitives";
import { DefaultFiltersProvider } from "@/components/providers/filters";
import PaginatedTable from "@/components/table/paginated-table";
import { DEFAULT_PAGINATED_RESPONSE, DEFAULT_QUERY } from "@/data/fetch";
import { Issue, IssueQueryParams } from "@/types/issue";
import { Leaderboard } from "@/types/leaderboard";
import { PaginatedCustomResponse } from "@/types/pagination";
import EventBanner from "./_components/EventBanner";

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
  const query: IssueQueryParams = {
    // TODO: Event filters
  };
  const issues = (await IssuesApi.getIssues({
    ...DEFAULT_QUERY,
    ...query,
  }).catch((error) => {
    console.error(`Error fetching Kudos Weeks issues:`, error);
    return DEFAULT_PAGINATED_RESPONSE;
  })) as PaginatedCustomResponse<Issue>;

  return (
    <>
      <section className={container()}>
        <EventBanner />
      </section>
      <section className={container() + " my-16"}>
        <h2 id="guidelines" className="text-foreground text-5xl font-bentoga">
          Guidelines
        </h2>
        <div className="flex flex-wrap gap-3 mt-6">
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
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <p>
            Kudos Weeks is a 6-week event exclusively for PBA Alumni, aimed at
            boosting Alumni contributions to the Polkadot ecosystem.
            Participants will choose from a curated list of open issues provided
            by the Kudos team and ecosystem partners.
          </p>
          <p>
            Each issue completed during the event window (November 1st to
            December 15th) will earn contributors one point on the event{" "}
            <Link
              href="#leaderboard"
              aria-label="Kudos Week Leaderboard"
              title="Kudos Week Leaderboard"
            >
              <strong className="text-primary">leaderboard</strong>
            </Link>
            . The list of available issues can be found in the backlog below,
            and points are awarded for issues assigned and closed within the
            event timeframe.
          </p>
          <p className="uppercase tracking-wide font-semibold">
            Get involved, contribute, and showcase your impact on the ecosystem!
          </p>
        </div>
      </section>

      <DefaultFiltersProvider>
        {/* TODO: Add advance filters but make sure to only have the correct filters options from the query above (add props to DefaultFiltersProvider to support query) */}
        <Toolbar
          label="Kudos Weeks Issues Backlog"
          shouldUpdateRouter={false}
        />
        <section className={container()}>
          <PaginatedTable
            initialItems={issues}
            query={query}
            pagination={DEFAULT_QUERY}
          />
        </section>
      </DefaultFiltersProvider>

      <section className={container() + " mt-16"}>
        <h2 id="leaderboard" className="text-foreground text-5xl font-bentoga">
          Leaderboard
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row mt-6">
          <LeaderboardTable data={MOCKED_WEEKLY_LEADERBOARD} />
          <LeaderboardTable data={MOCKED_TOTAL_LEADERBOARD} />
        </div>
      </section>
    </>
  );
}
