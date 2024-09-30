import { KudosCertifiedIcon } from "@/assets/icons";
import Emoji from "@/components/emoji";
import { KUDOS_ISSUE_KEY } from "@/data/filters";
import { ProjectInfosLabel } from "@/types/project";
import { Chip } from "@nextui-org/chip";

interface IProjectInfosProps {
  infos: { title: string; items: string[] }[];
  labels: ProjectInfosLabel[];
}

const ProjectInfos = ({ infos, labels }: IProjectInfosProps) => (
  <div className="bg-gradient-to-r md:bg-gradient-to-l from-background to-background-200 to-80% p-4 border-small rounded-md flex flex-col gap-4 h-full">
    {labels.length > 0 && (
      <div className="flex gap-3 border-b-small pb-4">
        {labels.map(({ color, emoji, label, type }, idx) => (
          <Chip key={idx} color={color} className="cursor-pointer rounded-md">
            <div className="flex items-center font-semibold gap-2">
              {emoji && (
                <>
                  <Emoji emoji={emoji} className="text-xl" />
                  &nbsp;
                </>
              )}
              {type === KUDOS_ISSUE_KEY ? (
                <KudosCertifiedIcon className="w-5 h-5" size={16} />
              ) : null}
              {label}
            </div>
          </Chip>
        ))}
      </div>
    )}
    <div className="flex justify-between gap-8">
      <div className="flex flex-wrap gap-6">
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
    <div className="flex flex-col max-w-28 gap-2">
      <span className="text-small text-default-500">{`${title}:`}</span>
      <span className="capitalize font-semibold">{items.join(", ")}</span>
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
  <div className="bg-default w-[120px] h-[100px] p-2 flex flex-col gap-[6px] shrink-0">
    <div className="flex gap-[8px]">
      <div className="bg-[#b1ff8b] border-2 border-[#78d54a] w-full h-[24px]" />
      <div className="bg-[#fc975e] border-2 border-[#ff6815] w-full h-[24px]" />
    </div>
    <div className="bg-[#06e1ff] border-2 border-[#038df7] w-full h-[24px]" />
    <div className="bg-[#bda6e1] border-2 border-[#5f31b5] w-full h-[24px]" />
  </div>
);

export default ProjectInfos;
