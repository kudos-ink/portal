import { ValidSort } from "./types";

export const DATABASE_ID = "bc9fe682dbe04550b121303a2befad8a";

export const FIELDNAME_TO_PROPERTY_ID_MAP = {
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

export const DEFAULT_FILTER_PROPERTIES = [
  FIELDNAME_TO_PROPERTY_ID_MAP["Issue Link"],
  FIELDNAME_TO_PROPERTY_ID_MAP["Issue Title"],
  FIELDNAME_TO_PROPERTY_ID_MAP["Opened By"],
  FIELDNAME_TO_PROPERTY_ID_MAP["Project Name"],
  FIELDNAME_TO_PROPERTY_ID_MAP["Repo Language"],
  FIELDNAME_TO_PROPERTY_ID_MAP["Assignee"],
  FIELDNAME_TO_PROPERTY_ID_MAP["Opened Date"],
  FIELDNAME_TO_PROPERTY_ID_MAP["Issue Labels"],
  FIELDNAME_TO_PROPERTY_ID_MAP["Github Repo"],
];

export const DEFAULT_SORT = [
  {
    property: "Opened Date",
    direction: "descending",
  },
] as ValidSort;
