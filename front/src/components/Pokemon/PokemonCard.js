import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { MdCatchingPokemon } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { Link } from 'react-router-dom';
import { BsStars } from "react-icons/bs";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../../helpers/localStorage';
import "./card.css"
import { GiCheckMark } from 'react-icons/gi';
import NicknameContainer from '../Pokemon/CardDetails/NicknameContainer'
import ReleasePokemon from './CardDetails/ReleasePokemon';
import { CardContent, Collapse, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PokemonCard = ({ pokemon, onRelease, onNickname }) => {

  const user = useSelector(state => state.auth)

  const toUpper = (x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();

  const [isInTeam, setisInTeam] = useState(false)

  const isShiny = pokemon.isShiny % 9 === 2

  const location = useLocation()

  const themeSlice = useSelector(state => state.theme)

  const dynamicText = { color: themeSlice === false ? 'white' : 'black' }

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => setExpanded(!expanded);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const catchPokemonHandler = () => {
    const team = getItemFromLocalStorage(`myteam${user.user._id}`)
    const exist = team.find((poke) => poke.id === pokemon.id)
    if (exist) return;
    if (team.length < 6 && !exist) {
      setisInTeam(true)
      team.push(pokemon)
      setItemToLocalStorage(`myteam${user.user._id}`, team)
    }
    return;
  }

  const teamToCheck = getItemFromLocalStorage(`myteam${user.user._id}`)

  useEffect(() => {
    const exist = teamToCheck.find((poke) => poke.id === pokemon.id)
    if (exist) setisInTeam(true)
  }, [teamToCheck])

  return (
    <Card style={{ backgroundColor: themeSlice === false ? 'rgb(12, 12, 12)' : 'rgb(227, 236, 243)' }} className='card'>
      <NicknameContainer
        pokemon={pokemon}
        location={location}
        onNickname={onNickname}
        dynamicText={dynamicText} />

      <CardHeader
        avatar={<>
          {location.pathname === '/team' &&
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more">
              <ExpandMoreIcon style={dynamicText} />
            </ExpandMore>}

          {location.pathname === '/PokemonList' && isInTeam === false &&
            <Tooltip TransitionComponent={Zoom}
              title={<h6>Catch {toUpper(pokemon.name)}</h6>}>
              <IconButton onClick={catchPokemonHandler} aria-label="share">
                <MdCatchingPokemon style={dynamicText} className='icon' />
              </IconButton>
            </Tooltip>}

          {location.pathname === '/PokemonList' && isInTeam === true &&
            <Tooltip TransitionComponent={Zoom}
              title={<h6>{pokemon.name} is in your team!</h6>}>
              <IconButton style={{ cursor: 'default' }} aria-label="share">
                <GiCheckMark style={dynamicText} className='icon' />
              </IconButton>
            </Tooltip>}
          {location.pathname === '/team' &&
            <IconButton aria-label="add to favorites">
              <ReleasePokemon
                toUpper={toUpper}
                onRelease={onRelease}
                pokemon={pokemon} />
            </IconButton>
          }
        </>}

        title={<h4 style={dynamicText} className='header'>
          {location.pathname === '/PokemonList' ? `#${pokemon.id}` : ``} {pokemon.nickname || toUpper(pokemon.name)}
          {location.pathname === '/PokemonList' ? `` : ` Lv.1`}
        </h4>}
        subheader={pokemon.types.map((type, idx) =>
          <div key={idx} className={'btnType type' + (type.type.name)}>
            <div className='wrapper'>
              {type.type.name}
            </div>
          </div>)} />

      {!isShiny && location.pathname === '/team' &&
        <Link to={`/PokemonList/${pokemon.name}`}>
          <img alt="pokemon" src={pokemon.image} className='pokemonImage' />
        </Link>}
      {isShiny && location.pathname === '/team' &&
        <Link to={`/PokemonList/${pokemon.name}`}>
          <img alt="pokemon" src={pokemon.shinyImage} className='pokemonImage' />
          <Tooltip TransitionComponent={Zoom} title={<h6>Wow! your {toUpper(pokemon.name)} is Shiny!<br />It's very rare!</h6>}>
            <IconButton aria-label="add to favorites">
              <BsStars style={{ color: 'rgb(255, 208, 0)' }} />
            </IconButton>
          </Tooltip>
        </Link>}
      <div className='images wrapper'>

        {location.pathname === '/PokemonList' &&
          <>
            <Link to={`/PokemonList/${pokemon.name}`}>
              <img className='sprite first' alt="pokemon" className='pokemonImage' src={pokemon.image} />
            </Link>

            <Link to={`/PokemonList/${pokemon.name}`}>
              <img className='sprite second' alt="pokemon" className='pokemonImage' src={pokemon.shinyImage} />
            </Link>
          </>}

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography style={dynamicText} paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
              medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
              occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
              large plate and set aside, leaving chicken and chorizo in the pan. Add
              pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
              stirring often until thickened and fragrant, about 10 minutes. Add
              saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
          </CardContent>
        </Collapse>

      </div>
    </Card>
  );
}

export default PokemonCard