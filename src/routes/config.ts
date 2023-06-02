import { ReactNode } from "react";
import { ColorConfig } from "../configs/colorConfigs";

export type RouteType = {
  element: ReactNode,
  state: string,
  index?: boolean,
  path?: string,
  child?: RouteType[],
  displayProps?: {
    displayText: string,
    icon?: ReactNode;
    pallete?: ColorConfig
  };
};