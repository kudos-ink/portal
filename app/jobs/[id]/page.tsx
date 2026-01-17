import { container } from "@/components/primitives";
import { getJobById } from "@/lib/api/jobs";
import { JobDetailView } from "@/components/jobs/job-detail-view";
import { notFound } from "next/navigation";

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const jobId = parseInt(id, 10);

  if (isNaN(jobId)) {
    notFound();
  }

  const job = await getJobById(jobId);

  if (!job) {
    notFound();
  }

  return (
    <section className={`pt-10 pb-24 ${container()}`}>
      <JobDetailView job={job} />
    </section>
  );
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const { id } = await params;
  const jobId = parseInt(id, 10);

  if (isNaN(jobId)) {
    return {
      title: "Job Not Found",
    };
  }

  const job = await getJobById(jobId);

  if (!job) {
    return {
      title: "Job Not Found",
    };
  }

  return {
    title: `${job.title} at ${job.company}`,
    description: job.description,
  };
}
