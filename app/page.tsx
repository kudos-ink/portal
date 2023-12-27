import { title, subtitle } from "@/components/primitives";
import Search from "../components/search";

export default function Home() {
  return (
    <div>
      <section className="flex flex-col items-center py-8 md:py-10">
        <h1 className={title()}>Find Collaborations,</h1>
        <h1 className={title()}>Collect Kudos</h1>
      </section>
      <div className="flex flex-col items-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <Search />
          <h2 className={subtitle({ class: "mt-4" })}>Banner</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-start gap-4">
          <div>
            <h2 className={subtitle({ class: "mt-4" })}>Filter 1</h2>
          </div>
          <div>
            <h2 className={subtitle({ class: "mt-4" })}>Filter 2</h2>
          </div>
          <div>
            <h2 className={subtitle({ class: "mt-4" })}>Filter 3</h2>
          </div>
          <div>
            <h2 className={subtitle({ class: "mt-4" })}>Clear</h2>
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
