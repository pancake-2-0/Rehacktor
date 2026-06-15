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
]);

export default router;
