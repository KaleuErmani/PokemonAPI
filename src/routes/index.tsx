import { createBrowserRouter } from "react-router-dom";

import { Root } from "../pages/root/listPokemons";
import { RootPokedex } from "../pages/root/listPokemonsPokedex";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/pokedex",
    element: <RootPokedex />,
  },
]);
