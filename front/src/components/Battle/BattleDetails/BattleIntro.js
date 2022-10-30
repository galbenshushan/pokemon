import { Card } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const BattleIntro = ({ pokemon, battleArr, setBattleArr }) => {
  const themeSlice = useSelector((state) => state.theme);

  const dynamicText = themeSlice === false ? "white" : "black";

  const toUpper = (x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();

  const battleTeamHandler = (pokemon) => {
    const exist = battleArr.find((poke) => poke.name === pokemon.name);
    if (exist) {
      return;
    } else {
      setBattleArr((current) => [...current, pokemon]);
    }
  };

  return (
    <Card
      onClick={() => battleTeamHandler(pokemon)}
      className={battleArr.includes(pokemon) ? "unchosen-card" : "battle-card"}
      style={{
        cursor: !battleArr.includes(pokemon) ? "pointer" : "default",
        marginTop: "2rem",
        marginLeft: "2rem",
        backgroundColor:
          themeSlice === false ? "rgb(12, 12, 12)" : "rgb(227, 236, 243)",
      }}
    >
      {pokemon.isShiny % 9 !== 2 && (
        <img alt="pokemon" className="pokemonImageBattle" src={pokemon.image} />
      )}
      {pokemon.isShiny % 9 === 2 && (
        <img
          alt="pokemon"
          className="pokemonImageBattle"
          src={pokemon.shinyImage}
        />
      )}
      <p style={{ fontWeight: "600", color: dynamicText }}>
        {pokemon.nickname || toUpper(pokemon.name)}
      </p>
    </Card>
  );
};

export default BattleIntro;
