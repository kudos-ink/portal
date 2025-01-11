import { ProjectMetrics as Metrics } from "@/types/project";
import { ReactNode } from "react";

interface IProjectMetricsProps {
  metrics: Metrics;
  // stats: { icon: ReactNode; value: number }[];
}

const ProjectMetrics = ({ metrics }: IProjectMetricsProps) => {
  const { repositoriesTotal, suggestedTotal, certifiedTotal } = metrics;

  return (
    <div className="bg-gradient-to-r from-background to-background-200 to-80% py-4 px-6 border-[1px] rounded-md flex flex-col gap-6 h-full">
      <div className="font-semibold">Metrics</div>
      <div className="text-small flex flex-col gap-2">
        <MetricItem label="Unified Repositories" value={repositoriesTotal} />
        <MetricItem label="Suggested Tasks" value={suggestedTotal} />
        <MetricItem label="Kudos Tasks" value={certifiedTotal} />
        {/* <MetricItem label="Rewards Tasks" value={rewardsTotal} /> */}
      </div>
      {/* <div className="flex gap-4 mx-auto">
        {stats.map(({ icon, value }, index) => (
          <Stat key={index} icon={icon} value={value} />
        ))}
      </div> */}
    </div>
  );
};

const MetricItem = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between items-center text-default-500">
    <span>{label}</span>
    <span className="flex-grow mx-2 border-dotted border-b-2 border-default-500 mt-[6px]" />
    <span className="text-white font-semibold whitespace-nowrap text-base leading-none">
      {value}
    </span>
  </div>
);

const Stat = ({ icon, value }: { icon: ReactNode; value: number }) => (
  <div className="flex gap-2 items-center">
    {icon}
    <div className="font-semibold">{value}</div>
  </div>
);

export default ProjectMetrics;
