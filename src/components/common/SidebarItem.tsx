import { ListItemButton, ListItemIcon } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { RouteType } from "../../routes/config";

type Props = {
  item: RouteType;
  handleClick: () => void;
};

const SidebarItem = ({ item, handleClick }: Props) => {
  const { appState, appPallette } = useSelector((state: RootState) => state.appState);

  return (
    item.displayProps && item.path ? (
      <ListItemButton
        onClick={handleClick}
        component={Link}
        to={item.path}
        sx={{
          "&: hover": {
            backgroundColor: appPallette.sidebar.hoverBg,
            color: appPallette.sidebar.hoverColor,
            "& .MuiListItemIcon-root": {
              color: appPallette.sidebar.hoverColor
            }
          },
          backgroundColor: appState === item.state ? appPallette.sidebar.activeBg : "unset",
          color: appState == item.state ? appPallette.sidebar.activeColor : appPallette.sidebar.color,
          paddingY: "12px",
          paddingX: "24px"
        }}
      >
        <ListItemIcon sx={{
          color: appState == item.state ? appPallette.sidebar.activeColor : appPallette.sidebar.color,
        }}>
          {item.displayProps.icon && item.displayProps.icon}
        </ListItemIcon>
        {item.displayProps.displayText}
      </ListItemButton>
    ) : null
  );
};

export default SidebarItem;