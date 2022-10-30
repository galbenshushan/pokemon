import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../card.css";
import LvAttacks from "./LvAttacks";
import TmAttacks from "./TmAttacks";

const AttackTable = ({ pokemon }) => {
  const [pokemonAttacksByLv, setPokemonAttacksByLv] = useState([]);

  const [pokemonAttacksByTm, setPokemonAttacksByTm] = useState([]);

  const a = true;

  const getDetails = async () => {
    setPokemonAttacksByLv([]);
    setPokemonAttacksByTm([]);
    const moves = pokemon.moves;
    moves.map(async (move, idx) => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/move/${move.move.name}`
      );
      const data = await res.json();
      const power = data.power;
      const accuracy = data.accuracy;
      const name = data.name;
      const type = data.type;
      const pp = data.pp;
      const textToMap = data.flavor_text_entries;
      const atLv = move.version_group_details[0].level_learned_at;
      if (move.version_group_details[0].level_learned_at === 0) {
        setPokemonAttacksByTm((current) => [
          ...current,
          { name, power, accuracy, type, textToMap, pp },
        ]);
      }
      if (move.version_group_details[0].level_learned_at > 0) {
        setPokemonAttacksByLv((current) => [
          ...current,
          { name, power, accuracy, type, atLv, textToMap, pp },
        ]);
      }
    });
  };

  const themeSlice = useSelector((state) => state.theme);

  const dynamicText = { color: themeSlice === false ? "white" : "black" };

  useEffect(() => getDetails(), [a]);

  return (
    <>
      {pokemon.moves.length > 0 && (
        <>
          <h3 style={dynamicText}>Moves Guide</h3>
          <TmAttacks move={pokemonAttacksByTm} />
          <LvAttacks move={pokemonAttacksByLv} />
        </>
      )}
      {pokemon.moves.length === 0 && (
        <>
          <h3 style={dynamicText}>Moves Guide</h3>
          <h5 style={dynamicText}>{pokemon.name}'s attacks are unknown</h5>
        </>
      )}
    </>
  );
};

export default AttackTable;
