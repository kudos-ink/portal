import Filter from "@/components/filter";
import { title, subtitle } from "@/components/primitives";
import Search from "@/components/search";
import { SEARCH_OPTIONS, LANGUAGES_OPTIONS } from "@/data/filters";

export default function Home() {
  return (
    <div>
      <section className="flex flex-col items-center py-8 md:py-10">
        <h1 className={title()}>Find Collaborations,</h1>
        <h1 className={title()}>Collect Kudos</h1>
      </section>
      <div className="flex flex-col items-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <Search placeholder="Search" emoji="🔍" items={SEARCH_OPTIONS} />
          <h2 className={subtitle({ class: "mt-4" })}>Banner</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-around items-stretch gap-4">
          <Filter
            placeholder="Languages"
            emoji={"💪"}
            items={LANGUAGES_OPTIONS}
          />
          <Filter
            placeholder="Interests"
            emoji={"🪄"}
            items={LANGUAGES_OPTIONS}
          />
          {/* <div>
            <Bounties
              currency="USD"
              defaultValue={100}
              maxValue={10000}
              emoji="💰"
            />
          </div> */}
        </div>
        <div className="flex justify-end">
          <div>
            <h2 className={subtitle({ class: "mt-4" })}>Sort</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
