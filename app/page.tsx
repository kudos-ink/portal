import ContributionsTable from "@/components/contributions-table/table";
import Filter from "@/components/filter";
import { title, subtitle } from "@/components/primitives";
import Search from "@/components/search";
import {
  SEARCH_OPTIONS,
  LANGUAGES_OPTIONS,
  INTERESTS_OPTIONS,
  REPOSITORIES_BY_INTERESTS,
} from "@/data/filters";
import { queryDatabase } from "@/lib/notion";
import {
  createNotionFilter,
  transformNotionDataToContributions,
} from "@/utils/notion";
import RemoveFilters from "@/components/removeFilters";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const params = searchParams as { [key: string]: string };
  const languagesFilterIsSelected = !!params && !!params.languages;
  const interestsFilterIsSelected = !!params && !!params.interests;
  const hasSearch = !!params && !!params.search;
  const showRemoveAllFilters =
    [languagesFilterIsSelected, interestsFilterIsSelected, hasSearch].filter(
      Boolean,
    ).length >= 2;
  const filter = await createNotionFilter(
    params.languages,
    params.search,
    REPOSITORIES_BY_INTERESTS[params.interests],
  );

  const data = await queryDatabase({
    page_size: 10,
    filter,
  });
  const contributions = transformNotionDataToContributions(data);
  const items = {
    data: contributions,
    hasMore: data.has_more,
    nextCursor: data.next_cursor ?? undefined,
  };

  return (
    <div>
      <section className="flex flex-col items-center py-8 md:py-10">
        <h1 className={title()}>Find Collaborations,</h1>
        <h1 className={title()}>Collect Kudos</h1>
      </section>
      <div className="flex flex-col items-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <Search
            placeholder="Search"
            emoji="🔍"
            items={SEARCH_OPTIONS}
            selectedValue={params.search}
          />
          {/* TODO: 
          1. make it controlled
          2. set the selected value in the params
          3. use custom function
          4. reset the other values  */}
          <h2 className={subtitle({ class: "mt-4" })}>Banner</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-around items-stretch gap-4">
          <Filter
            placeholder="Languages"
            emoji={"💪"}
            items={LANGUAGES_OPTIONS}
            selectedValue={params.languages}
          />
          <Filter
            placeholder="Interests"
            emoji={"🪄"}
            items={INTERESTS_OPTIONS}
            selectedValue={params.interests}
          />
          {languagesFilterIsSelected && (
            <RemoveFilters value={params.languages} param="Languages" />
          )}
          {interestsFilterIsSelected && (
            <RemoveFilters value={params.interests} param="Interests" />
          )}
          {hasSearch && <RemoveFilters value={params.search} param="Search" />}

          {showRemoveAllFilters && <RemoveFilters value={"All filters"} />}
        </div>
        <div className="flex justify-end">
          <div>
            <h2 className={subtitle({ class: "mt-4" })}>Sort</h2>
          </div>
        </div>
        <div>
          <ContributionsTable
            items={items}
            queries={{
              page_size: 10,
              filter,
            }}
          />
        </div>
      </div>
    </div>
  );
}
