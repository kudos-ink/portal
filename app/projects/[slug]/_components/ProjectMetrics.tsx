import { IconEye, IconFork, IconStar } from "@/assets/icons";
import { ReactNode } from "react";

interface IPProjectMetricsProps {}

const ProjectMetrics = ({}: IPProjectMetricsProps) => (
  <div className="bg-gradient-to-r from-background to-background-200 to-80% p-4 border-small rounded-md flex flex-col gap-4 h-full">
    <div className="font-semibold">Metrics</div>
    <div className="text-small flex flex-col gap-2">
      {[
        { label: "Repositories", value: 2 },
        { label: "Active Issues", value: 3 },
        { label: "Curators", value: 3 },
        { label: "Contributors", value: 3 },
      ].map(({ label, value }, index) => (
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
      <Stat icon={<IconStar size={16} />} value={101} />
      <Stat icon={<IconFork size={16} />} value={101} />
      <Stat icon={<IconEye size={16} />} value={101} />
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
