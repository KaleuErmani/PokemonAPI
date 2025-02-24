import { useState } from "react";
import { Header } from "../header";

import CssBaseline from "@mui/material/CssBaseline";
import { Pokedex } from "../pokedex";

export function RootPokedex() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <CssBaseline>
        <Header onSearch={setSearchTerm} />
        <Pokedex searchTerm={searchTerm} />
      </CssBaseline>
    </>
  );
}
