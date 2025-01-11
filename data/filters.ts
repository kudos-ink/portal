export const PURPOSE_KEY = "purposes";
export const PROJECT_TYPE_KEY = "types";
export const TECHNOLOGY_KEY = "technologies";
export const STACK_LEVEL_KEY = "stack-level";
export const PROJECTS_KEY = "projects";
export const KUDOS_TASK_KEY = "certified";
export const REWARDS_KEY = "rewards";

export const TRACKED_LABELS = [
  "good first issue",
  "C-good-first-issue",
  "good first issue :baby:",
  "C1-mentor",
  "D0-easy",
  "Q1 - Easy",
  "C-simple",
  "kudos",
];

export const FPurposes = [
  "ai",
  "bridge",
  "dao",
  "data",
  "defi",
  "evm",
  "gaming",
  "governance",
  "nft",
  "oracles",
  "rwa",
  "socialfi",
  "staking",
  "testing",
  "universal",
] as const;

export const FProjectTypes = [
  "platform",
  "tool",
  "library",
  "client",
  "framework",
  "template",
  "mobile",
  "service",
  "dApp",
] as const;

export const FStackLevels = [
  "protocol",
  "runtime",
  "smart-contract",
  "messaging",
  "offchain",
] as const;

export const FTechnologies = ["substrate", "ink"] as const;

export const emojiMapForPurposes: Record<string, string> = {
  ai: "🤖",
  bridge: "🌉",
  dao: "🏛️",
  data: "📊",
  defi: "💸",
  evm: "🔗",
  gaming: "🎮",
  governance: "⚖️",
  nft: "🖼️",
  oracles: "🔮",
  rwa: "🏢",
  socialfi: "🗣️",
  staking: "🔒",
  testing: "🧪",
  universal: "🌐",
};

export const emojiMapForTechnologies: Record<string, string> = {
  c: "🔷",
  "c++": "➕",
  "c#": "#️⃣",
  css: "🎨",
  evm: "💻",
  go: "🐹",
  haskell: "🔗",
  kotlin: "🚀",
  ink: "🐙",
  javascript: "☕️",
  markdown: "📝",
  python: "🐍",
  rust: "🦀",
  substrate: "🟣",
  solidity: "💸",
  swift: "🦅",
  tex: "📚",
  typescript: "📜",
  vue: "💚",
};

export const emojiMapForStackLevels: Record<string, string> = {
  protocol: "📡",
  runtime: "💾",
  "smart-contract": "📜",
  messaging: "💬",
  offchain: "🌐",
};

export const emojiMapForProjectTypes: Record<string, string> = {
  platform: "🏗️",
  tool: "🛠️",
  library: "📚",
  client: "🖥️",
  framework: "🌉",
  template: "📄",
  mobile: "📱",
  service: "🔧",
  dApp: "📲",
};
