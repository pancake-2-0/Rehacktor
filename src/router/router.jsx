import { createBrowserRouter } from "react-router";
import Layout from "../components/layouts/Layout";
import Homepage from "../views/Homepage";
import routes from "./routes";
import GenrePage from "../views/GenrePage";
import SearchPage from "../views/SearchPage";
import {
  getAllGamesLoader,
  getAllGenres,
  getFilteredByGenreGames,
  getSearchedGames,
} from "./loaders";
import AuthenticationLayout from "../components/layouts/AuthenticationLayout";
import RegisterPage from "../views/auth/RegisterPage";
import LoginPage from "../views/auth/LoginPage";
import ProfilePage from "../views/auth/ProfilePage";
import ProfileSettingPage from "../views/auth/ProfileSettingPage";

const router = createBrowserRouter([
  {
    path: routes.home,
    Component: Layout,
    loader: getAllGenres,
    children: [
      {
        path: routes.home,
        Component: Homepage,
        loader: getAllGamesLoader,
      },
      {
        path: routes.search,
        Component: SearchPage,
        loader: getSearchedGames,
      },
      {
        path: routes.genre,
        Component: GenrePage,
        loader: getFilteredByGenreGames,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthenticationLayout,
    children: [
      {
        path: routes.register,
        Component: RegisterPage,
      },
      {
        path: routes.login,
        Component: LoginPage,
      },
      {
        path: routes.profile,
        Component: ProfilePage,
      },
      {
        path: routes.profile_settings,
        Component: ProfileSettingPage,
      },
    ],
  },
]);

export default router;
