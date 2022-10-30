import { Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import "./list.css";
import PokemonCard from "../Pokemon/PokemonCard";
import AutoComplete from "../AutoComplete/AutoComplete";
import { NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Pokedex = ({}) => {
  const [pokemons, setPokemons] = useState([]);

  const [loadMore, setLoadMore] = useState(
    `https://pokeapi.co/api/v2/pokemon/?limit=21`
  );

  const a = true;

  const themeSlice = useSelector((state) => state.theme);

  const dynamicText = { color: themeSlice === false ? "white" : "black" };

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleCloseNavMenu = () => setAnchorElNav(null);

  const aborted = new AbortController();

  const getAllPokemons = async () => {
    aborted.abort();
    const res = await fetch(loadMore);
    const data = await res.json();
    setLoadMore(data.next);
    const pokedex = data.results;
    const getDetails = () => {
      pokedex.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
          aborted.signal
        );
        const data = await res.json();
        const id = data.id;
        const moves = data.moves;
        const name = data.name;
        const types = data.types;
        const stats = data.stats;
        const icon =
          data.sprites.versions["generation-viii"]["icons"]["front_default"];
        const image = data.sprites.other.home.front_default;
        const shinyImage = data.sprites.other.home.front_shiny;
        const sprites = data.sprites;
        const isShiny = Math.ceil(Math.random() * 2000);
        setPokemons((current) => [
          ...current,
          {
            id,
            name,
            types,
            image,
            shinyImage,
            isShiny,
            icon,
            moves,
            stats,
            sprites,
          },
        ]);
      });
    };
    getDetails();
  };

  useEffect(() => {
    aborted.abort();
    getAllPokemons();
  }, [a]);

  useLayoutEffect(
    () =>
      setPokemons(
        pokemons.sort((a, b) => {
          if (a.id < b.id) return -1;
          else if (a.id > b.id) return 1;
        })
      ),
    [pokemons]
  );

  return (
    <div className="pokemon-container">
      <div className="align">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              style={dynamicText}
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <Link className="nav-itemm" to="/Pokedex">
                <Typography textAlign="center">Who's that pokemon?</Typography>
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link className="nav-itemm" to="/quiz">
                <Button
                  style={dynamicText}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, mx: 5, display: "block" }}
                >
                  <Typography textAlign="center">
                    Who's that pokemon?
                  </Typography>
                </Button>
              </Link>
              <NavDropdown
                title={
                  <Button
                    style={dynamicText}
                    className="nav-item-text"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 1, mx: 2, display: "block" }}
                  >
                    more
                  </Button>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>Poke-Tetris (Comming soon)</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Box>
            <AutoComplete />
          </Toolbar>
        </Container>
      </div>
      <div className="layout">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div>
        <Button
          className="centerBtn"
          color="error"
          variant="contained"
          onClick={() => getAllPokemons()}
        >
          Show More Pokemons..
        </Button>
      </div>
    </div>
  );
};

export default Pokedex;
