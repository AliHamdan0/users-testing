import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { setupStore } from "./services/redux-toolkit/forTesting/store";
import type {
  AppStore,
  RootState,
} from "./services/redux-toolkit/forTesting/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CssBaseline from "@mui/material/CssBaseline";
import { CustomTheme } from "./components/general/theme";
import { Layout } from "./components/general/layout";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { MockStoredata } from "./services/redux-toolkit/forTesting/initialState";
const theme = CustomTheme();
const cacheLtr = createCache({
  key: "muiltr",
  prepend: true, //to make css file override default style
});

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = { usersSlice: { info: MockStoredata } },
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <CacheProvider value={cacheLtr}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Layout custom={false}>
                  <Routes>
                    <Route path="" element={children} />
                  </Routes>
                </Layout>
              </LocalizationProvider>
            </ThemeProvider>
          </CacheProvider>
        </Provider>
      </BrowserRouter>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
