import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { Button, Card, IconButton } from '@mui/material';
import { AiOutlineClose } from "react-icons/ai";
import { CardGroup } from 'react-bootstrap';
import "./battle.css"
import { setItemToLocalStorage } from '../../helpers/localStorage';
import BattlePartners from './BattleDetails/BattlePartners';
import BattleIntro from './BattleDetails/BattleIntro';
import StartBattle from './BattleDetails/StartBattle';

export default function BattleModal({ team }) {

    const themeSlice = useSelector(state => state.theme);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '75rem',
        height: '52rem',
        bgcolor: themeSlice === false ? 'rgb(30,30, 32)' : 'white',
        color: themeSlice === false ? 'white' : 'black',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const dynamicText = themeSlice === false ? 'white' : 'black'

    const [open, setOpen] = useState(false);

    const [faintedCheck, setFaintedCheck] = useState()

    const [initialTeamForBattle, setInitialTeamForBattle] = useState([]);

    const [switcher, setSwitcher] = useState(false);

    const [battleArr, setBattleArr] = useState([]);

    const [rival, setRival] = useState()

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const regret = (pokemon) => setBattleArr(battleArr.filter(poke => poke.name !== pokemon.name))

    const startBattle = () => {
        if (battleArr.length > 0) {
            setItemToLocalStorage('battleteam', battleArr)
            setTimeout(() => setSwitcher(true), 200);
        } else return
    }

    const switchModals = () => {
        setSwitcher(false)
        handleClose()
    }

    const rndPokemon = Math.round(Math.random() * 898)

    const getDetails = async () => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${rndPokemon}`)
        const data = await res.json()
        data.isShiny = Math.ceil(Math.random() * 2000)
        data.icon = data.sprites.versions["generation-viii"]["icons"]["front_default"]
        data.image = data.sprites.other.home.front_default
        data.shinyImage = data.sprites.other.home.front_shiny
        setRival(data)
    }

    const setOtherPokemon = (fainted) => {
        setFaintedCheck(fainted);
        if (fainted === 0) {
            getDetails()
            return
        }
    }

    useEffect(() => setItemToLocalStorage('battleteam', battleArr), [])

    useEffect(() => setInitialTeamForBattle(team), [])

    useEffect(() => getDetails(), [])

    return (<>
        <div onClick={handleOpen} style={{ color: themeSlice === false ? 'white' : 'black' }}>
            BATTLE
        </div>
        <div style={{ backgroundColor: themeSlice === false ? 'rgb(30,30, 32)' : 'white' }}>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <>
                    {switcher === false && <Box style={{ textAlign: 'center' }} sx={style}>
                        <IconButton style={{ float: 'left' }} onClick={switchModals} aria-label="add to favorites">
                            <AiOutlineClose style={{ color: themeSlice === false ? 'white' : 'black', fontSize: '3rem' }} />
                        </IconButton>
                        <h3>Choose Pokemons for the battle</h3>
                        {battleArr.length > 0 && <div style={{ display: 'inline-block' }}>
                            {battleArr.map((pokemon, idx) =>
                                <BattlePartners key={idx}
                                    pokemon={pokemon}
                                    regret={regret}
                                    dynamicText={dynamicText} />)}
                        </div>}
                        <div style={{ paddingLeft: '4rem', paddingTop: battleArr.length === 0 ? '4.5rem' : '' }}>
                            <div>
                                <CardGroup style={{ paddingTop: '1rem' }}>
                                    {initialTeamForBattle.map((pokemon, idx) =>
                                        <BattleIntro key={idx}
                                            pokemon={pokemon}
                                            battleArr={battleArr}
                                            setBattleArr={setBattleArr} />)}
                                </CardGroup>
                            </div>
                            <br />
                            <Button className='centerBtn' color='error' onClick={startBattle} variant="contained">Go!</Button>
                        </div>
                    </Box>}
                    {switcher === true &&
                        <StartBattle
                            setSwitcher={setSwitcher}
                            setOtherPokemon={setOtherPokemon}
                            themeSlice={themeSlice}
                            switchModals={switchModals}
                            battleArr={battleArr}
                            style={style}
                            rival={rival} />}
                </>
            </Modal>
        </div>
    </>
    );
}
