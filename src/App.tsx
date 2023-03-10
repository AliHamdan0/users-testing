import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Home } from "./pages/home";
import CssBaseline from "@mui/material/CssBaseline";
import { CustomTheme } from "./components/general/theme";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/general/layout";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { store } from "./services/redux-toolkit/store";
import { Provider } from "react-redux";
import useFetch from "./services/utilities/useFetch";
import { getUsers } from "./services/utilities/apiConfig";
import { useEffect } from "react";
import { usersSlice } from "./services/redux-toolkit/slices/usersSlice";
import { NewUser } from "./pages/newUser";

function App() {
  const [getFetch, postFetch, pathcFetch] = useFetch();
  const theme = CustomTheme();
  const cacheLtr = createCache({
    key: "muiltr",
    prepend: true, //to make css file override default style
  });
  const { actions } = usersSlice;
  const { saveUser } = actions;
  useEffect(() => {
    const getData = async () => {
      const hobbies = [
        { id: 1, name: "Swimming" },
        { id: 2, name: "Reading" },
        { id: 3, name: "Playing Football" },
      ];
      const res = await getFetch(getUsers);
      const newUsers = await res.data.map((user, i) => {
        return {
          ...user,
          hobby: hobbies[i % 3].name,
          date: new Date("2022-03-25").toLocaleDateString(),
          type: i % 2 == 0 ? "New" : "Old",
        };
      });
      store.dispatch(saveUser(newUsers));
    };
    getData();
  }, []);
  return (
    <Provider store={store}>
      <CacheProvider value={cacheLtr}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Layout custom={false}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new-user" element={<NewUser />} />
              </Routes>
            </Layout>
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

export default App;
