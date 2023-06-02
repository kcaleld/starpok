import { Avatar, CircularProgress, Drawer, List, Stack, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import sizeConfigs from "../../configs/sizeConfigs";
import { RootState } from "../../redux/store";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";

const Sidebar = () => {
  const { appPallette, appState } = useSelector((state: RootState) => state.appState);
  const logo = useSelector((state: RootState) => state.appState.appPallette.sidebar.logo);
  const [logoLoading, setLogoLoading] = useState(false);

  useEffect(() => {
    setLogoLoading(false);
  }, [appPallette, appState]);

  const handleClick = () => {
    setLogoLoading(true);
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sizeConfigs.sidebar.width,
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: appPallette.sidebar.bg,
          color: appPallette.sidebar.color,
          overflow: 'hidden'
        }
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ marginBottom: "20px" }}>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="center"
          >
            {logoLoading ? (
              <CircularProgress />
            ) : (
              <img src={logo} alt="Logo" height={200} style={{ padding: "10px" }} />
            )}
          </Stack>
        </Toolbar>
        {appRoutes.map((route, index) => (
          route.displayProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} handleClick={handleClick} />
            ) : (
              <SidebarItem item={route} key={index} handleClick={handleClick} />
            )
          ) : null
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;