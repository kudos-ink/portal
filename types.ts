import {
  QueryDatabaseResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";

export const databaseId = "bc9fe682dbe04550b121303a2befad8a";

export const repoLinkToPageIdMap = {
  "https://github.com/automata-network/automata":
    "094fe93b-27b7-4547-b604-98a700c905e5",
  "https://github.com/subspace/subspace":
    "0d16a11f-c7e2-4aa9-ae75-d46fe715e26a",
  "https://github.com/mangata-finance/mangata-node":
    "104823c7-9380-4672-94ee-0accd5772d02",
  "https://github.com/virto-network/virto-node":
    "179afa85-2631-419a-b2d0-c0db9bfc0750",
  "https://github.com/opensquare-network/dotreasury":
    "1b8ae28f-a0f5-44d6-8046-d348f791c804",
  "https://github.com/galacticcouncil/HydraDX-node":
    "247abce9-3946-4e12-803b-255e2d03158a",
  "https://github.com/subquery/subql": "252a454a-56e0-4744-965a-fbe00692b0e5",
  "https://github.com/InvArch/InvArch-Frames":
    "256086e7-3943-4662-a560-a14d023ca565",
  "https://github.com/subsquid/squid-sdk":
    "2640eb41-4d1c-4d91-9217-10b6da10c5cf",
  "https://github.com/darwinia-network/darwinia":
    "26412c33-0827-4c50-ab34-cb5e4aa31feb",
  "https://github.com/hashed-io/hashed-substrate":
    "267341d3-765c-4520-a9a9-784776d02da6",
  "https://github.com/pendulum-chain/portal":
    "2f3ee721-14fe-4f54-9a4b-fd93e9439c58",
  "https://github.com/LibertyDSNP/frequency":
    "2f813d2a-6546-448e-b749-6cb10c8b4684",
  "https://github.com/OAK-Foundation/OAK-blockchain":
    "3913379f-49cb-48bc-ae7c-d73bf6c13f77",
  "https://github.com/centrifuge/centrifuge-chain":
    "3d8f376a-f6c3-4644-912d-4aec6adb827b",
  "https://github.com/dappforce/subsocial-parachain":
    "4be6f937-5d13-4b07-a159-521aa96599fd",
  "https://github.com/ImbueNetwork/imbue-frontend":
    "601f4e3f-33ef-42f4-843e-bd6dfdc7ad1d",
  "https://github.com/pendulum-chain/spacewalk":
    "63ee19c8-2439-422a-b4e0-4d27cd0daaad",
  "https://github.com/Brushfam/openbrush-contracts":
    "70bf41c5-f7f9-48be-b6f1-1cbd10f79b1e",
  "https://github.com/KILTprotocol/kilt-node":
    "71e6763d-5bd0-4eed-8bc9-368b4c0148f3",
  "https://github.com/Manta-Network/Manta":
    "794a40b3-7eb6-41b0-b46f-ab84d8fcc5ff",
  "https://github.com/sora-xor/sora2-parachain":
    "7d0a5a1e-15a0-469b-b11e-10cd00226b00",
  "https://github.com/moondance-labs/tanssi":
    "7d89bfac-aae2-4306-a922-5d9c0ed4707f",
  "https://github.com/OAK-Foundation/oak.js":
    "7dd9de32-1f6e-4bd0-bae5-79d77cb131ca",
  "https://github.com/sora-xor/sora2-network":
    "7f447eeb-c416-4dcc-b7fc-4f41394ed09d",
  "https://github.com/gear-tech/gear": "84528f03-b3ff-412d-8af6-97468433e5a7",
  "https://github.com/Joystream/joystream":
    "8c34d6f5-eb40-4d05-a333-075ad9d9df46",
  "https://github.com/moonbeam-foundation/moonbeam":
    "8ddff70d-b906-4660-ab48-8c3563fe1e49",
  "https://github.com/webb-tools/tangle":
    "8e76ee24-cbbb-4e89-94fb-4f6cdadb8988",
  "https://github.com/peaqnetwork/peaq-network-node":
    "8ecb0e53-74a5-44a2-ac79-251bf1c8923c",
  "https://github.com/zeitgeistpm/zeitgeist":
    "927dab5a-c64d-4225-b1b2-ff46146458f0",
  "https://github.com/docknetwork/dock-substrate":
    "943ecd57-04b6-4a41-b313-a7f50380870f",
  "https://github.com/capsule-corp-ternoa/ternoa-node":
    "98d18e95-74df-4535-a1a4-be648b72a41e",
  "https://github.com/NodleCode/chain": "992c9a36-65dd-4b5b-8d1c-8d16b1a85b51",
  "https://github.com/bifrost-finance/bifrost":
    "9a1c18ea-be2e-49f0-886d-912a2f983170",
  "https://github.com/ImbueNetwork/imbue":
    "9a329a5b-f0df-43bc-aefd-d2491313aab9",
  "https://github.com/TalismanSociety/talisman":
    "9e63c326-3e9d-4d41-a7d1-5b36a986f746",
  "https://github.com/encointer/encointer-parachain":
    "a0706249-3918-44d4-838e-68b742cedb89",
  "https://github.com/parallel-finance/parallel":
    "a2f2fdbf-9903-4676-9d4b-14beb4d79ca4",
  "https://github.com/bitgreen/bitgreen-node":
    "a85f6556-99c6-47d9-ad21-6950fa9dc57c",
  "https://github.com/opentensor/bittensor":
    "ae3161b1-6ec7-4a7e-9f4b-026be1ed0282",
  "https://github.com/deeper-chain/deeper-chain":
    "af4b75c9-6a4f-452d-979c-3b954683a17d",
  "https://github.com/t3rn/t3rn": "af89c412-b69f-4437-a6a0-cdf80070a4a9",
  "https://github.com/crustio/crust": "b7d9b901-1529-4d44-b2bc-fe9ad1481f61",
  "https://github.com/AcalaNetwork/Acala":
    "bdb953d9-c4a3-4340-b62f-d79c35dfb36a",
  "https://github.com/InvArch/InvArch-Node":
    "c1d08eca-419a-41d0-9e13-4ff77c3daa84",
  "https://github.com/Phala-Network/phala-blockchain":
    "c2121346-154a-46d5-8aab-b3ca09d0ba96",
  "https://github.com/encointer/encointer-node":
    "ca0085d5-2c38-4fda-84c2-6294e1415414",
  "https://github.com/opensquare-network/subsquare":
    "ce541040-c2a1-40e1-ab90-193e5f3d0ae0",
  "https://github.com/encointer/personhood-oracle":
    "cf75d097-40d2-4f89-a5d1-f57b5fc721f2",
  "https://github.com/airalab/robonomics":
    "d215802e-377c-467a-90db-9144cc5368c7",
  "https://github.com/pendulum-chain/pendulum":
    "d3ca21a3-cabc-4dde-a63c-be1a5ab5687b",
  "https://github.com/encointer/pallets":
    "da578f24-d13e-4294-b8b7-b752adfaac22",
  "https://github.com/integritee-network/worker":
    "dd2da285-139a-4d39-bbef-89188acae91e",
  "https://github.com/OAK-Foundation/xcm-demo":
    "e1c4d97b-a60a-4b86-8592-08e0bc72a555",
  "https://github.com/bit-country/Metaverse-Network":
    "e6d8a01c-5f41-4b3a-99ac-2e8ae274f476",
  "https://github.com/grindytech/gafi": "ecc13454-c074-4b81-9d98-c3cb15d48d8a",
  "https://github.com/paritytech/polkadot-sdk":
    "f149aef9-2669-4f93-97cc-848da31be521",
  "https://github.com/litentry/litentry-parachain":
    "f4684d74-d632-4301-b76f-2da40798d71b",
  "https://github.com/AstarNetwork/Astar":
    "f7e6066b-2424-4a46-b720-b82b62553b09",
  "https://github.com/interlay/interbtc":
    "f92c9d2d-58c0-4fcf-9ca4-fb637da54ecb",
  "https://github.com/aleph-zero-foundation/aleph-node":
    "fc87cecc-505c-40cb-bf10-9235830b4a33",
} as const;

const fieldnameToPropertyIdMap = {
  "Project Name": "yag%5C",
  "Issue Title": "title",
  "Issue Link": "CpBm",
  "Opened By": "%7DS%5BG",
  "Opened Date": "deF%3F",
  Assignee: "rXDy",
  "Repo Language": "r_s%3C",
  "Issue Labels": "%5EjCr",
  "Github Repo": "Xj~Y",
  "Last edited time": "%3DUY%5E",
  ID: "VRvO",
  //   "Issue Body": "M~GN",
  //   Etag: "vh~G",
  //   "Issue State": "zPlX",
} as const;

export const defaultFilterProperties = [
  fieldnameToPropertyIdMap["Issue Link"],
  fieldnameToPropertyIdMap["Issue Title"],
  fieldnameToPropertyIdMap["Opened By"],
  fieldnameToPropertyIdMap["Project Name"],
  fieldnameToPropertyIdMap["Repo Language"],
  fieldnameToPropertyIdMap["Assignee"],
  fieldnameToPropertyIdMap["Opened Date"],
  fieldnameToPropertyIdMap["Issue Labels"],
  fieldnameToPropertyIdMap["Github Repo"],
];

export const defaultSort = [
  {
    property: "Opened Date",
    direction: "descending",
  },
] as ValidSort;

export type ValueOf<T> = T[keyof T];
export type ValidRepositoryLink = keyof typeof repoLinkToPageIdMap;
export type ValidFilterProperty = ValueOf<typeof fieldnameToPropertyIdMap>;
export type ValidSortProperty = keyof typeof fieldnameToPropertyIdMap;
export type ValidSort = Array<
  | {
      property: ValidSortProperty;
      direction: "ascending" | "descending";
    }
  | {
      timestamp: "created_time" | "last_edited_time";
      direction: "ascending" | "descending";
    }
>;

export type KudosQueryParameters = Omit<
  QueryDatabaseParameters,
  "database_id" | "filter_properties" | "sorts"
> & {
  database_id?: string;
  filter_properties?: Array<ValidFilterProperty>;
  sorts?: ValidSort;
};
export type ValidNotionResponse = {
  object: string;
  id: string;
  created_time: Date;
  last_edited_time: Date;
  created_by: User;
  last_edited_by: User;
  cover: null;
  icon: null;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
  public_url: string;
};

export type User = {
  object: string;
  id: string;
};

export type Parent = {
  type: string;
  database_id: string;
};

export type Properties = {
  "Issue Link": Assignee;
  "Issue Title": IssueTitle;
  "Opened By": Assignee;
  "Project Name": ProjectName;
  "Repo Language": RepoLanguage;
  Assignee: Assignee;
  "Opened Date": OpenedDate;
  "Issue Labels": IssueLabels;
  "Github Repo": GithubRepo;
};

export type Assignee = {
  id: string;
  type: string;
  url: string;
};

export type GithubRepo = {
  id: string;
  type: string;
  relation: Relation[];
  has_more: boolean;
};

export type Relation = {
  id: string;
};

export type IssueLabels = {
  id: string;
  type: string;
  multi_select: MultiSelect[];
};

export type MultiSelect = {
  id: string;
  name: string;
  color: string;
};

export type IssueTitle = {
  id: string;
  type: string;
  title: RichText[];
};

export type RichText = {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: null;
};

export type Annotations = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
};

export type Text = {
  content: string;
  link: null;
};

export type OpenedDate = {
  id: string;
  type: string;
  date: DateClass;
};

export type DateClass = {
  start: Date;
  end: null;
  time_zone: null;
};

export type ProjectName = {
  id: string;
  type: string;
  rollup: ProjectNameRollup;
};

export type ProjectNameRollup = {
  type: string;
  array: ProjectNameArray[];
  function: string;
};

export type ProjectNameArray = {
  type: string;
  rich_text: RichText[];
};

export type RepoLanguage = {
  id: string;
  type: string;
  rollup: RepoLanguageRollup;
};

export type RepoLanguageRollup = {
  type: string;
  array: RepoLanguageSelectArray[];
  function: string;
};

export type RepoLanguageSelectArray = {
  type: string;
  multi_select: MultiSelect[];
};

export type ProjectLogoImages = Record<string, string>;
