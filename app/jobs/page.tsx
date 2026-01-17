import { container, title, subtitle } from "@/components/primitives";
import { JobList } from "@/components/jobs/job-list";
import { getAllJobs } from "@/lib/api/jobs";

export const metadata = {
  title: "Job Board",
  description: "Find exciting opportunities in the Polkadot ecosystem",
};

export default async function JobsPage() {
  const jobs = await getAllJobs().catch((error) => {
    console.error("Failed to fetch jobs:", error);
    return [];
  });

  return (
    <section className={`flex flex-col items-center text-center pt-10 pb-24 ${container()}`}>
      <h1 className={title()}>
        Polkadot Ecosystem <span className="text-primary">Job Board</span>
      </h1>
      <h2 className={`mt-8 ${subtitle()}`}>
        Discover exciting career opportunities in the Polkadot and Substrate ecosystem.
        Join innovative teams building the future of Web3.
      </h2>

      <div className="mt-16 w-full text-left">
        <JobList initialJobs={jobs} />
      </div>
    </section>
  );
}
