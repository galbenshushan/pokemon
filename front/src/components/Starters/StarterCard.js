import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { MdCatchingPokemon } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../../helpers/localStorage';
import "../Pokemon/card.css"
import { CardContent, Collapse, Typography } from '@mui/material';

const StarterCard = ({ pokemon }) => {

    const user = useSelector(state => state.auth)

    const toUpper = (x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();

    const [isInTeam, setisInTeam] = useState(false)

    const location = useLocation()

    const history = useHistory()

    const themeSlice = useSelector(state => state.theme)

    const dynamicText = { color: themeSlice === false ? 'white' : 'black' }

    const [expanded, setExpanded] = useState(false);

    const team = getItemFromLocalStorage(`myteam${user.user._id}`)

    const catchPokemonHandler = () => {
        const exist = team.find((poke) => poke.id === pokemon.id)
        if (exist) return;
        if (team.length < 6 && !exist) {
            setisInTeam(true)
            team.push(pokemon)
            setItemToLocalStorage(`myteam${user.user._id}`, team)
            history.replace('/team')
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
            <CardHeader
                avatar={<>
                    {team.length === 0 &&
                        <Tooltip TransitionComponent={Zoom}
                            title={<h6>Catch {toUpper(pokemon.name)}</h6>}>
                            <IconButton onClick={catchPokemonHandler} aria-label="share">
                                <MdCatchingPokemon style={dynamicText} className='icon' />
                            </IconButton>
                        </Tooltip>}
                </>}

                title={<h4 style={dynamicText} className='header'>
                    #{pokemon.id} {toUpper(pokemon.name)}
                </h4>}
                subheader={pokemon.types.map((type, idx) =>
                    <div key={idx} className={'btnType type' + (type.type.name)}>
                        <div className='wrapper'>
                            {type.type.name}
                        </div>
                    </div>)} />

            <div className='images wrapper'>

                {location.pathname === '/team/starters' &&
                    <>
                        <Link to={`/Pokedex/${pokemon.name}`}>
                            <img className='sprite first' alt="pokemon" className='pokemonImage' src={pokemon.image} />
                        </Link>

                        <Link to={`/Pokedex/${pokemon.name}`}>
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

export default StarterCard






