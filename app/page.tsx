import { title, subtitle } from "@/components/primitives";
import Search from "../components/search";
import { search, languages } from "../data/items";
import Bounties from "../components/bounties";
import Filter from "../components/filter";

export default function Home() {
  return (
    <div>
      <section className="flex flex-col items-center py-8 md:py-10">
        <h1 className={title()}>Find Collaborations,</h1>
        <h1 className={title()}>Collect Kudos</h1>
      </section>
      <div className="flex flex-col items-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <Search placeholder="Search" emoji="🔍" items={search} />
          <h2 className={subtitle({ class: "mt-4" })}>Banner</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-around items-stretch gap-4">
          <Filter placeholder="Languages" emoji={"💪"} items={languages} />
          <Filter placeholder="Interests" emoji={"🪄"} items={languages} />
          <div>
            <Bounties
              currency="USD"
              defaultValue={100}
              maxValue={10000}
              emoji="💰"
            />
          </div>
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
