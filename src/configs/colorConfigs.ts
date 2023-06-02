import { colors } from "@mui/material";
import assets from "../assets";

type SidebarConfig = {
  bg: string,
  color: string,
  hoverBg: string,
  hoverColor: string,
  activeBg: string,
  activeColor: string,
  logo: string
}

type TopbarConfig = {
  bg: string,
  color: string
}

export type ColorConfig = {
  sidebar: SidebarConfig,
  topbar: TopbarConfig,
  mainBg: string
}

export const starWarsColorConfig: ColorConfig = {
  sidebar: {
    bg: "#000000",
    color: "#eeeeee",
    hoverBg: "#FEC601",
    hoverColor: "#000000",
    activeBg: "#FEC601",
    activeColor: "#000000",
    logo: assets.logos.starwars
  },
  topbar: {
    bg: "#FEC601",
    color: "#000000"
  },
  mainBg: colors.grey["100"]
};

export const pokemonColorConfig: ColorConfig = {
  sidebar: {
    bg: "#FEC601",
    color: "#0057B8",
    hoverBg: "#0057B8",
    hoverColor: "#FEC601",
    activeBg: "#0057B8",
    activeColor: "#FEC601",
    logo: assets.logos.pokemon
  },
  topbar: {
    bg: "#0057B8",
    color: "#FEC601"
  },
  mainBg: colors.grey["100"]
};