import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleGoToPokedex = () => {
    navigate("/pokedex");
  };

  const handleGoToPokemons = () => {
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#EF5350" }}>
        <Toolbar sx={{ display: "flex" }}>
          <Typography
            variant="h6"
            sx={{ color: "white", fontWeight: "bold", marginRight: 20 }}
          >
            Pokemon API
          </Typography>

          <TextField
            label="Pesquisar Pokémon"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "5px",
              maxWidth: "300px",
            }}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "white",
              color: "#EF5350",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "16px",
              marginLeft: "20px",
            }}
            onClick={handleGoToPokemons}
          >
            Pokemons
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "white",
              color: "#EF5350",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "16px",
              marginLeft: "20px",
            }}
            onClick={handleGoToPokedex}
          >
            Pokedex
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
