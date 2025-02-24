import { useAppDispatch } from "../../store/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { addToPokedex, listPokemons } from "../../store/pokemonSlice";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardMedia,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid2 as Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Pokemons } from "../../types";

interface PokemonCardProps {
  searchTerm: string;
}

export function PokemonCard({ searchTerm }: PokemonCardProps) {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.pokemon
  );

  const [open, setOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemons | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  useEffect(() => {
    dispatch(listPokemons(currentPage));
  }, [dispatch, currentPage]);

  const handleOpen = (pokemon: Pokemons) => {
    setSelectedPokemon(pokemon);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPokemon(null);
  };

  const handleAddToPokedex = (pokemon: Pokemons) => {
    dispatch(addToPokedex(pokemon));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      dispatch(listPokemons(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      dispatch(listPokemons(currentPage + 1));
    }
  };

  if (loading) return <CircularProgress />;

  if (error) return <Typography color="error">{error}</Typography>;

  const filteredPokemons = data.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(1304 / itemsPerPage);

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

      <Grid container spacing={2} justifyContent="center" mt={2}>
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={pokemon.name}>
              <Card
                sx={{ display: "flex", flexDirection: "column", padding: 2 }}
              >
                <CardMedia
                  component="img"
                  alt={pokemon.name}
                  height="200"
                  image={pokemon.details?.sprites.front_default}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" align="center" gutterBottom>
                    {pokemon.name}
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleOpen(pokemon)}
                  >
                    Ver Detalhes
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 1 }}
                    onClick={() => handleAddToPokedex(pokemon)}
                  >
                    Adicionar à Pokédex
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Detalhes do Pokémon
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            maxHeight: "80vh",
            minWidth: "35vh",
          }}
        >
          {selectedPokemon && selectedPokemon.details && (
            <div>
              <CardMedia
                component="img"
                alt={selectedPokemon.name}
                height="200"
                image={selectedPokemon.details.sprites.front_default}
              />
              <Typography variant="h5" gutterBottom>
                Nome: {selectedPokemon.name}
              </Typography>
              <Typography variant="body1">
                ID: {selectedPokemon.details.id}
              </Typography>
              <Typography variant="body1">
                Tamanho: {selectedPokemon.details.height} m
              </Typography>

              <Typography variant="h6" gutterBottom>
                Habilidades:
              </Typography>
              <ul>
                {selectedPokemon.details.abilities.map((ability) => (
                  <li key={ability.ability.name}>
                    <Typography variant="body2">
                      {ability.ability.name}
                    </Typography>
                  </li>
                ))}
              </ul>

              <Typography variant="h6" gutterBottom>
                Stats:
              </Typography>
              <ul>
                {selectedPokemon.details.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    <Typography variant="body2">
                      {stat.stat.name}: {stat.base_stat}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
