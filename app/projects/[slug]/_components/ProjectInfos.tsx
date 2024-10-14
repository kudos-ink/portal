import { Tooltip } from "@nextui-org/tooltip";
import { Chip } from "@nextui-org/chip";
import { KudosCertifiedIcon } from "@/assets/icons";
import Emoji from "@/components/emoji";
import { KUDOS_ISSUE_KEY } from "@/data/filters";
import { ProjectInfosLabel } from "@/types/project";

interface IProjectInfosProps {
  infos: { title: string; items: string[] }[];
  labels: ProjectInfosLabel[];
}

const ProjectInfos = ({ infos, labels }: IProjectInfosProps) => (
  <div className="bg-gradient-to-r md:bg-gradient-to-l from-background to-background-200 to-80% py-5 px-6 border-[1px] rounded-md flex flex-col gap-4 h-full">
    {labels.length > 0 && (
      <div className="flex flex-col sm:flex-row gap-3 border-b-small pb-4">
        {labels.map(({ color, emoji, label, tooltip, type }, idx) => (
          <Tooltip key={idx} content={tooltip}>
            <Chip color={color} className="rounded-md">
              <div className="flex items-center font-semibold gap-2 !leading-none py-0.5 text-base">
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
          </Tooltip>
        ))}
      </div>
    )}
    <div className="flex justify-between gap-8">
      <div className="w-full grid grid-cols-1 gap-3 md:grid-cols-3 md:col-span-2">
        {infos.map(({ title, items }, idx) => (
          <InfoItem key={idx} title={title} items={items} />
        ))}
      </div>
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
    <li className="flex flex-col max-w-40 gap-2">
      <span className="text-small text-default-500">{`${title}`}</span>
      <span className="capitalize text-lg font-semibold !leading-none md:text-xl md:font-bold">
        {items.join(", ")}
      </span>
    </li>
  );
};

export const LayersMap = ({
  isPlatform = false,
  isRuntime = false,
  isMessaging = false,
  isOffchain = false,
  isSmartContract = false,
}: {
  isPlatform?: boolean;
  isRuntime?: boolean;
  isMessaging?: boolean;
  isOffchain?: boolean;
  isSmartContract?: boolean;
}) => (
  <div className="w-full h-full p-4 flex flex-col items-center justify-center rounded-md text-background text-center font-semibold gap-4">
    <div className="text-foreground font-semibold self-center">
      Vertical Stack Layers
    </div>
    <div className="flex items-center justify-center gap-4 w-full">
      <div className="relative w-10/12 h-[224px] basis-2/3">
        {/* Parallelogram 1 (Primary Color) - Offchain */}
        <div
          className={`absolute w-full z-40 flex items-center justify-center text-foreground h-16 border-2 border-[#3BA4E1] transform -skew-x-[40deg] top-0 ${!isOffchain ? "!border-default-500 opacity-20" : ""}`}
          style={{
            background: `linear-gradient(to bottom left, ${!isOffchain ? "#a1a1aa" : "#3BA4E1"}, transparent)`,
          }}
        >
          Offchain
        </div>

        {/* Parallelogram 2 (Secondary Color) - Smart Contract */}
        <div
          className={`absolute w-full z-30 flex items-center justify-center text-foreground h-16 border-2 border-[#E50045] transform -skew-x-[40deg] top-10 ${!isSmartContract ? "!border-default-500 opacity-20" : ""}`}
          style={{
            background: `linear-gradient(to bottom left, ${!isSmartContract ? "#a1a1aa" : "#E50045"}, transparent)`,
          }}
        >
          Smart Contract
        </div>

        {/* Parallelogram 3 (Green Color) - Runtime */}
        <div
          className={`absolute w-full z-20 flex items-center justify-center text-foreground h-16 border-2 border-green-500 transform -skew-x-[40deg] top-20 ${!isRuntime ? "!border-default-500 opacity-20" : ""}`}
          style={{
            background: `linear-gradient(to bottom left, ${!isRuntime ? "#a1a1aa" : "#10b981"}, transparent)`,
          }}
        >
          Runtime
        </div>

        {/* Parallelogram 4 (Success Color) - Messaging */}
        <div
          className={`absolute w-full z-10 flex items-center justify-center text-foreground h-16 border-2 border-[#ffcd2a] transform -skew-x-[40deg] top-[120px] ${!isMessaging ? "!border-default-500 opacity-20" : ""}`}
          style={{
            background: `linear-gradient(to bottom left, ${!isMessaging ? "#a1a1aa" : "#ffcd2a"}, transparent)`,
          }}
        >
          Messaging
        </div>

        {/* Parallelogram 5 (Purple Color) - Platform */}
        <div
          className={`absolute w-full flex items-center justify-center text-foreground h-16 border-2 border-purple-500 transform -skew-x-[40deg] top-[160px] ${!isPlatform ? "!border-default-500 opacity-20" : ""}`}
          style={{
            background: `linear-gradient(to bottom left, ${!isPlatform ? "#a1a1aa" : "#8b5cf6"}, transparent)`,
          }}
        >
          Platform
        </div>
      </div>
    </div>
  </div>
);

export default ProjectInfos;
