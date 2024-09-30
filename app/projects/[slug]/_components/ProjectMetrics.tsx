import { ReactNode } from "react";

interface IProjectMetricsProps {
  metrics: { label: string; value: number }[];
  stats: { icon: ReactNode; value: number }[];
}

const ProjectMetrics = ({ metrics, stats }: IProjectMetricsProps) => (
  <div className="bg-gradient-to-r from-background to-background-200 to-80% p-4 border-small rounded-md flex flex-col gap-6 h-full">
    <div className="font-semibold">Metrics</div>
    <div className="text-small flex flex-col gap-2">
      {metrics.map(({ label, value }, index) => (
        <div
          key={index}
          className="flex justify-between items-center text-default-500"
        >
          <span>{label}</span>
          <span className="flex-grow mx-2 border-dotted border-b-2 border-default-500 mt-[6px]" />
          <span className="text-white font-semibold">{value}</span>
        </div>
      ))}
    </div>
    <div className="flex gap-4 mx-auto">
      {stats.map(({ icon, value }, index) => (
        <Stat key={index} icon={icon} value={value} />
      ))}
    </div>
  </div>
);

const Stat = ({ icon, value }: { icon: ReactNode; value: number }) => (
  <div className="flex gap-2 items-center">
    {icon}
    <div className="font-semibold">{value}</div>
  </div>
);

export default ProjectMetrics;
