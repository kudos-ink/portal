import {
  QueryDatabaseResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";
import {
  FIELDNAME_TO_PROPERTY_ID_MAP,
  REPO_LINK_TO_PAGE_ID_MAP,
} from "./constants";

export type ValueOf<T> = T[keyof T];
export type ValidRepositoryLink = keyof typeof REPO_LINK_TO_PAGE_ID_MAP;
export type ValidFilterProperty = ValueOf<typeof FIELDNAME_TO_PROPERTY_ID_MAP>;
export type ValidSortProperty = keyof typeof FIELDNAME_TO_PROPERTY_ID_MAP;
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

export type LoadMoreState = {
  data: QueryDatabaseResponse[];
  nextCursor: string | undefined;
};
