import { http, HttpResponse } from "msw";

type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
  };
};

const pokemon: Record<string, Pokemon> = {
  25: {
    name: "pikachu",
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    },
  },
};

export const handlers = [
  http.get(
    "https://pokeapi.co/api/v2/pokemon/:id",
    ({ params }: { params: { id: string } }) => {
      const id = params.id;

      const pokemonData = pokemon[id];
      if (pokemonData) {
        return HttpResponse.json({ ...pokemonData }, { status: 200 });
      } else {
        return HttpResponse.json({ message: "Not found" }, { status: 404 });
      }
    }
  ),
];
