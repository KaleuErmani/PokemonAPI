import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Pokemons, PokemonState } from "../types";

const initialState: PokemonState = {
  data: [],
  loading: false,
  error: null,
  pokedex: [],
  currentPage: 1,
  itemsPerPage: 12,
};

// Função de listagem de Pokémons com paginação
export const listPokemons = createAsyncThunk(
  "pokemons/listPokemons",
  async (page: number) => {
    const limit = 12;
    const offset = (page - 1) * limit;

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar os Pokémons");
    }

    const data = await response.json();

    const detailedPokemons = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        const pokemonDetails = await fetch(pokemon.url);
        const details = await pokemonDetails.json();
        return { ...pokemon, details };
      })
    );

    return detailedPokemons;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    listPokemonsSuccess(state, action: PayloadAction<Pokemons[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    listPokemonsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addToPokedex(state, action: PayloadAction<Pokemons>) {
      if (
        !state.pokedex.find((pokemon) => pokemon.name === action.payload.name)
      ) {
        state.pokedex.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(listPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(listPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro desconhecido";
      });
  },
});

export const { setCurrentPage, addToPokedex } = pokemonSlice.actions;
export default pokemonSlice.reducer;
