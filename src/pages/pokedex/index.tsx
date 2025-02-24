import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useState } from "react";

interface PokemonCardProps {
  searchTerm: string;
}

export function Pokedex({ searchTerm }: PokemonCardProps) {
  const { pokedex } = useSelector((state: RootState) => state.pokemon);

  const filteredPokedex = pokedex.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(filteredPokedex.length / itemsPerPage);

  const currentPokemons = filteredPokedex.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        sx={{ marginTop: 2, marginBottom: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <Typography sx={{ margin: "0 10px", alignSelf: "center" }}>
          Página {currentPage} de {totalPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Próximo
        </Button>
      </Grid>

      <Grid container spacing={2} justifyContent="center">
        {filteredPokedex.length > 0 ? (
          currentPokemons.map((pokemon) => (
            <Grid item xs={12} sm={6} md={3} key={pokemon.name}>
              <Card
                sx={{ display: "flex", flexDirection: "column", padding: 2 }}
              >
                <img
                  alt={pokemon.name}
                  src={pokemon.details.sprites.front_default}
                  height="200"
                  style={{ objectFit: "contain" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" align="center" gutterBottom>
                    {pokemon.name}
                  </Typography>
                  <Button variant="outlined" fullWidth>
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", marginTop: 2 }}>
            Nenhum Pokémon encontrado!
          </Typography>
        )}
      </Grid>
    </div>
  );
}
