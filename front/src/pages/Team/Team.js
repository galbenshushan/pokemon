import { Box, Button, Container, Toolbar, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { NavDropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BattleModal from '../../components/Battle/BattleModal'
import PokemonCard from '../../components/Pokemon/PokemonCard'
import { getItemFromLocalStorage, setItemToLocalStorage } from '../../helpers/localStorage'

const Team = () => {

    const user = useSelector(state => state.auth)

    const [pokemonTeam, setPokemonTeam] = useState([])

    let team = getItemFromLocalStorage(`myteam${user.user._id}`) || []

    const themeSlice = useSelector(state => state.theme)

    const dynamicText = { color: themeSlice === false ? 'white' : 'black' }

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleCloseNavMenu = () => setAnchorElNav(null);

    const releaseFromTeam = useCallback((id) => {
        const exist = team.find(pokemon => pokemon.id === id)
        if (exist) {
            team = team.filter(pokemon => pokemon.id !== id)
            setItemToLocalStorage(`myteam${user.user._id}`, team)
            setPokemonTeam(team)
        }
    }, [team])

    const nicknameHandler = (nickname, name) => {
        let thisPokemon = team.find(pok => pok.name === name)
        thisPokemon.nickname = nickname
        setItemToLocalStorage(`myteam${user.user._id}`, team)
        setPokemonTeam(team)
    }

    useEffect(() => setPokemonTeam(team), [])

    useEffect(() => setItemToLocalStorage(pokemonTeam), [pokemonTeam])

    return (
        <div>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button style={dynamicText}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, mx: 5, display: 'block' }}>
                            <BattleModal team={team} />
                        </Button>
                        <NavDropdown title={<Button style={dynamicText}
                            className='nav-item-text'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 1, mx: 2, display: 'block' }}>
                            more
                        </Button>} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                2525
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item >11</NavDropdown.Item>
                        </NavDropdown>
                    </Box>
                </Toolbar>
            </Container>
            <div className='pokemon-container'>
                <h3 style={dynamicText}>
                    My Team
                </h3>
                <div className='layout'>
                    {pokemonTeam.length > 0 && pokemonTeam.map((pokemon, idx) =>
                        <PokemonCard onNickname={nicknameHandler} onRelease={releaseFromTeam} key={idx}
                            pokemon={pokemon} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Team


