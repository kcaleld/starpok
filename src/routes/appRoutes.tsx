import StarWarsPageLayout from "../pages/starwars/StarWarsPageLayout";
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import FilmsPage from "../pages/starwars/FilmsPage";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import HomeIcon from '@mui/icons-material/Home';
import { starWarsColorConfig, pokemonColorConfig } from "../configs/colorConfigs";
import PlanetsPage from "../pages/starwars/PlanetsPage";
import PokemonPageLayout from "../pages/pokemon/PokemonPageLayout";
import PokemonsPage from "../pages/pokemon/PokemonPage";
import TestPage from "../pages/pokemon/TestPage";

const appRoutes: RouteType[] = [
  {
    path: "/",
    index: true,
    element: <HomePage />,
    state: "home",
    displayProps: {
      displayText: "Inicio",
      icon: <HomeIcon />,
      pallete: pokemonColorConfig
    }
  },
  {
    path: "/starwars",
    element: <StarWarsPageLayout />,
    state: "starwars",
    displayProps: {
      displayText: "StarWars",
      icon: <DashboardOutlinedIcon />,
      pallete: starWarsColorConfig
    },
    child: [
      {
        index: true,
        path: "/starwars/films",
        element: <FilmsPage />,
        state: "starwars.films",
        displayProps: {
          displayText: "Películas",
          pallete: starWarsColorConfig
        },
      },
      {
        index: true,
        path: "/starwars/planets",
        element: <PlanetsPage />,
        state: "starwars.planets",
        displayProps: {
          displayText: "Planetas",
          pallete: starWarsColorConfig
        },
      }
    ]
  },
  {
    path: "/pokemon",
    element: <PokemonPageLayout />,
    state: "pokemon",
    displayProps: {
      displayText: "Pokemon",
      icon: <DashboardOutlinedIcon />,
      pallete: pokemonColorConfig
    },
    child: [
      {
        index: true,
        path: "/pokemon/pokemons",
        element: <PokemonsPage />,
        state: "pokemon.pokemons",
        displayProps: {
          displayText: "Pokemónes",
          pallete: pokemonColorConfig
        },
      },
      {
        path: "/pokemon/test",
        element: <TestPage />,
        state: "pokemon.test",
        displayProps: {
          displayText: "Test",
          pallete: pokemonColorConfig
        },
      },
    ]
  }
];

export default appRoutes;