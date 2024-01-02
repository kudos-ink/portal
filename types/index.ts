import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type PaginatedCustomDataResponse<TData> = {
  data: TData[];
  hasMore: boolean;
  nextCursor: string | undefined;
};
