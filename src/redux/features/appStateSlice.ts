import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColorConfig, starWarsColorConfig } from "../../configs/colorConfigs";

type appState = {
  appState: string;
  appTitle: string;
  appPallette: ColorConfig;
};

const initialState: appState = {
  appState: "home",
  appTitle: "Inicio",
  appPallette: starWarsColorConfig
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAppState: (state, action: PayloadAction<string>) => {
      state.appState = action.payload;
    },
    setAppTitle: (state, action: PayloadAction<string>) => {
      state.appTitle = action.payload;
    },
    setAppPallete: (state, action: PayloadAction<ColorConfig>) => {
      state.appPallette = action.payload;
    }
  }
});

export const {
  setAppState,
  setAppTitle,
  setAppPallete
} = appStateSlice.actions;

export default appStateSlice.reducer;