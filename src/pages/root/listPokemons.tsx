import { useState } from "react";
import { Header } from "../header";
import { PokemonCard } from "../pokemonCard";
import CssBaseline from "@mui/material/CssBaseline";

export function Root() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <CssBaseline>
        <Header onSearch={setSearchTerm} />
        <PokemonCard searchTerm={searchTerm} />
      </CssBaseline>
    </>
  );
}
