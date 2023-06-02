import { AppBar, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import sizeConfigs from "../../configs/sizeConfigs";
import { RootState } from "../../redux/store";

const Topbar = () => {
  const { appTitle, appPallette } = useSelector((state: RootState) => state.appState);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: appPallette.topbar.bg,
        color: appPallette.topbar.color
      }}
    >
      <Toolbar>
        <Typography variant="h6">
          {appTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;