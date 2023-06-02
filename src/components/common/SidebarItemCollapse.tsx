import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { RouteType } from "../../routes/config";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type Props = {
  item: RouteType;
  handleClick: () => void;
};

const SidebarItemCollapse = ({ item, handleClick }: Props) => {
  const { appState, appPallette } = useSelector((state: RootState) => state.appState);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (appState.includes(item.state)) {
      setOpen(true);
    }
  }, [appState, item]);

  return (
    item.displayProps ? (
      <>
        <ListItemButton
          onClick={() => setOpen(!open)}
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
            color: appPallette.sidebar.color
          }}>
            {item.displayProps.icon && item.displayProps.icon}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography>
                {item.displayProps.displayText}
              </Typography>
            }
          />
          {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
        </ListItemButton>
        <Collapse in={open} timeout="auto">
          <List>
            {item.child?.map((route, index) => (
              route.displayProps ? (
                route.child ? (
                  <SidebarItemCollapse item={route} key={index} handleClick={handleClick} />
                ) : (
                  <SidebarItem item={route} key={index} handleClick={handleClick} />
                )
              ) : null
            ))}
          </List>
        </Collapse>
      </>
    ) : null
  );
};

export default SidebarItemCollapse;