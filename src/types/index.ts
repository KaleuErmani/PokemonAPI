export interface Type {
  type: {
    name: string;
  };
}

export interface Ability {
  ability: {
    name: string;
  };
}

export interface Stat {
  stat: {
    name: string;
  };
  base_stat: number;
}

export interface Sprites {
  front_default: string;
}

export interface PokemonDetails {
  id: number;
  height: number;
  weight: number;
  types: Type[];
  abilities: Ability[];
  stats: Stat[];
  sprites: Sprites;
}

export interface Pokemons {
  name: string;
  url: string;
  details: PokemonDetails;
}

export interface PokemonState {
  data: Pokemons[];
  loading: boolean;
  error: string | null;
  pokedex: Pokemons[];
  currentPage: number;
  itemsPerPage: number;
}
