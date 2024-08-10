import { Chip } from "@nextui-org/chip";

interface IProjectInfosProps {
  infos: { title: string; items: string[] }[];
  labels: string[];
}

const ProjectInfos = ({ infos, labels }: IProjectInfosProps) => (
  <div className="bg-gradient-to-r from-background to-background-200 to-80% py-4 px-3 border-small rounded-md flex flex-col gap-4">
    <div>
      {labels.map((label, idx) => (
        <Chip
          key={idx}
          color="default"
          className="mx-1 cursor-pointer rounded-md"
        >
          <div className="flex items-center gap-2">{label}</div>
        </Chip>
      ))}
    </div>
    <div className="border-t-small pt-4 flex justify-between gap-8">
      <div className="flex flex-wrap gap-4">
        {infos.map(({ title, items }, idx) => (
          <InfoItem key={idx} title={title} items={items} />
        ))}
      </div>
      <LayersMap isPlatform isRuntime isMessaging isOffchain />
    </div>
  </div>
);

interface IInfoItemsProps {
  title: string;
  items: string[];
}

const InfoItem = ({ title, items }: IInfoItemsProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col max-w-28">
      <span className="text-small text-default-500">{`${title}:`}</span>
      <span className="capitalize">{items.join(", ")}</span>
    </div>
  );
};

const LayersMap = ({
  isPlatform,
  isRuntime,
  isMessaging,
  isOffchain,
}: {
  isPlatform: boolean;
  isRuntime: boolean;
  isMessaging: boolean;
  isOffchain: boolean;
}) => (
  <div className="bg-default w-[92px] h-[80px] p-2 flex flex-col gap-[6px]">
    <div className="flex gap-[6px]">
      <div className="bg-danger w-full h-[18px]" />
      <div className="bg-danger w-full h-[18px]" />
    </div>
    <div className="bg-danger w-full h-[18px]" />
    <div className="bg-danger w-full h-[18px]" />
  </div>
);

export default ProjectInfos;
