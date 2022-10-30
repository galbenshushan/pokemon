import { Tooltip, Zoom } from "@mui/material";
import React from "react";
import "./data.css";
import { ImArrowRight } from "react-icons/im";
import { Link } from "react-router-dom";
import EvolutionOperation from "./EvolutionOperation";

const Evolution = ({
  evolutionLineOne,
  evolutionLineTwo,
  evolutionLineThree,
  dynamicText,
}) => {
  const trioArr = [evolutionLineOne, evolutionLineTwo, evolutionLineThree];

  return (
    <div className="evolution-line">
      {evolutionLineOne.length > 0 && (
        <h5 className="header" style={dynamicText}>
          Evolution chart
        </h5>
      )}
      <table style={dynamicText} className="table tabb">
        <tr>
          {trioArr.map((arr, indx) => (
            <td key={indx}>
              {arr.map((pokemon, idx) => (
                <div key={idx}>
                  {pokemon.howEv &&
                    pokemon.howEv.map((ev, idxx) => (
                      <EvolutionOperation className="oper" key={idxx} ev={ev} />
                    ))}
                  {indx !== 0 && (
                    <ImArrowRight className="arrow" style={dynamicText} />
                  )}
                  <Link to={`/Pokedex/${pokemon.name}`}>
                    <Tooltip
                      TransitionComponent={Zoom}
                      title={<h6>{pokemon.name}</h6>}
                    >
                      <img
                        className="img imgRes"
                        src={pokemon.image}
                        width="100rem"
                      />
                    </Tooltip>
                  </Link>
                </div>
              ))}
            </td>
          ))}
        </tr>
      </table>
    </div>
  );
};

export default Evolution;
