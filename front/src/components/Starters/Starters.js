import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StarterCard from "./StarterCard";

const Starters = () => {
  const startersArr = [
    "bulbasaur",
    "charmander",
    "squirtle",
    "chikorita",
    "cyndaquil",
    "totodile",
    "treecko",
    "torchic",
    "mudkip",
    "turtwig",
    "chimchar",
    "piplup",
    "snivy",
    "tepig",
    "oshawott",
    "chespin",
    "fennekin",
    "froakie",
    "rowlet",
    "litten",
    "popplio",
  ];
  const [starterPokemons, setStarterPokemons] = useState([]);

  const themeSlice = useSelector((state) => state.theme);

  const dynamicText = themeSlice === false ? "white" : "black";

  const getDetails = () => {
    setStarterPokemons([]);
    startersArr.forEach(async (pokemon) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      const data = await res.json();
      const id = data.id;
      const moves = data.moves;
      const name = data.name;
      const level = 1;
      const types = data.types;
      const stats = data.stats;
      const icon =
        data.sprites.versions["generation-viii"]["icons"]["front_default"];
      const image = data.sprites.other.home.front_default;
      const shinyImage = data.sprites.other.home.front_shiny;
      const sprites = data.sprites;
      const isShiny = Math.ceil(Math.random() * 2000);
      setStarterPokemons((current) => [
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
          level,
        },
      ]);
    });
  };

  useEffect(() => getDetails(), []);
  return (
    <div>
      <h3 style={{ color: dynamicText, paddingTop: "1rem" }}>
        Choose your first Pokemon!
      </h3>
      <div className="layout">
        {starterPokemons.map((pokemon, idx) => (
          <StarterCard key={idx} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Starters;
