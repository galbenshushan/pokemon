import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { Link } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { GiCheckMark } from "react-icons/gi";
import NicknameContainer from "../Pokemon/CardDetails/NicknameContainer";
import ReleasePokemon from "./CardDetails/ReleasePokemon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./card.css";
import StatsCollapse from "./CardDetails/StatsCollapse";
import { getItemFromLocalStorage } from "../../helpers/localStorage";

const PokemonCard = ({ pokemon, onRelease, onNickname }) => {
  const toUpper = (x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();

  const themeSlice = useSelector((state) => state.theme);

  const user = useSelector((state) => state.auth);

  const [isAnimated, setIsAnimated] = useState(true);

  const isShiny = pokemon.isShiny % 9 === 2;

  const location = useLocation();

  const dynamicText = { color: themeSlice === false ? "white" : "black" };

  const [expanded, setExpanded] = useState(false);

  let team = getItemFromLocalStorage(`myteam${user.user._id}`) || [];

  const exist = team.find((poke) => poke.id === pokemon.id);

  const handleExpandClick = () => setExpanded(!expanded);

  const ExpandMore = styled(({ expand, ...other }) => {
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  useEffect(() => {
    const aborted = new AbortController();
    let timmer = setTimeout(() => setIsAnimated(false), 1000);
    return () => {
      clearTimeout(timmer);
      aborted.abort();
    };
  }, [pokemon]);

  return (
    <Card
      style={{
        backgroundColor:
          themeSlice === false ? "rgb(12, 12, 12)" : "rgb(227, 236, 243)",
      }}
      className={
        isAnimated === false
          ? "card"
          : "card animate__animated animate__zoomInLeft"
      }
    >
      <NicknameContainer
        pokemon={pokemon}
        location={location}
        onNickname={onNickname}
        dynamicText={dynamicText}
      />

      <CardHeader
        avatar={
          <>
            {location.pathname === "/team" && (
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon style={dynamicText} />
              </ExpandMore>
            )}

            {location.pathname === "/Pokedex" && exist && (
              <Tooltip
                TransitionComponent={Zoom}
                title={<h6>{pokemon.name} is in your team!</h6>}
              >
                <IconButton style={{ cursor: "default" }} aria-label="share">
                  <GiCheckMark style={dynamicText} className="icon" />
                </IconButton>
              </Tooltip>
            )}
            {location.pathname === "/team" && (
              <IconButton aria-label="add to favorites">
                <ReleasePokemon
                  toUpper={toUpper}
                  onRelease={onRelease}
                  pokemon={pokemon}
                />
              </IconButton>
            )}
          </>
        }
        title={
          <h4 style={dynamicText} className="header">
            {location.pathname === "/Pokedex" ? `#${pokemon.id}` : ``}{" "}
            {pokemon.nickname || toUpper(pokemon.name)}
            {location.pathname === "/Pokedex"
              ? ``
              : ` Lv.${pokemon.level}` ?? `Lv.1`}
          </h4>
        }
        subheader={pokemon.types.map((type, idx) => (
          <div key={idx} className={"btnType type" + type.type.name}>
            <div className="wrapper">{type.type.name}</div>
          </div>
        ))}
      />

      {!isShiny && location.pathname === "/team" && (
        <Link to={`/Pokedex/${pokemon.name}`}>
          <img alt="pokemon" src={pokemon.image} className="pokemonImage" />
        </Link>
      )}
      {isShiny && location.pathname === "/team" && (
        <Link to={`/Pokedex/${pokemon.name}`}>
          <img
            alt="pokemon"
            src={pokemon.shinyImage}
            className="pokemonImage"
          />
          <Tooltip
            TransitionComponent={Zoom}
            title={
              <h6>
                Wow! your {toUpper(pokemon.name)} is Shiny!
                <br />
                It's very rare!
              </h6>
            }
          >
            <IconButton aria-label="add to favorites">
              <BsStars style={{ color: "rgb(255, 208, 0)" }} />
            </IconButton>
          </Tooltip>
        </Link>
      )}
      <div className="images wrapper">
        {location.pathname === "/Pokedex" && (
          <>
            <Link to={`/Pokedex/${pokemon.name}`}>
              <img
                alt="pokemon"
                className="pokemonImage sprite first"
                src={pokemon.image}
              />
            </Link>

            <Link to={`/Pokedex/${pokemon.name}`}>
              <img
                alt="pokemon"
                className="pokemonImage sprite second"
                src={pokemon.shinyImage}
              />
            </Link>
          </>
        )}
        <StatsCollapse
          expanded={expanded}
          pokemon={pokemon}
          dynamicText={dynamicText}
        />
      </div>
    </Card>
  );
};

export default PokemonCard;
