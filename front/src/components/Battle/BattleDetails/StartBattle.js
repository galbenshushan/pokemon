import { Box, Button, IconButton } from '@mui/material'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { CardGroup } from 'react-bootstrap'
import { AiOutlineClose } from 'react-icons/ai'
import StartBattleContent from './StartBattleContent'
import StartBattleIconPart from './StartBattleIconPart'

const StartBattle = ({ style, switchModals, battleArr, themeSlice, rival, setOtherPokemon, setSwitcher }) => {

    const [rivalPokemons, setRivalPokemons] = useState(0)

    const [myPokemons, setMyPokemons] = useState(0)

    const [firstPokemon, setFirstPokemon] = useState(battleArr[0])

    const [notifications, setNotifications] = useState('')

    const [myMoves, setMyMoves] = useState([])

    const [rivalMoves, setRivalMoves] = useState([])

    const [currentMyHp, setCurrentMyHp] = useState(0)

    const [currentRivalHp, setCurrentRivalHp] = useState(0)

    const [myTurn, setMyTurn] = useState(true)

    const [roundLoser, setRoundLoser] = useState(null)

    let indx = battleArr.indexOf(firstPokemon)

    const hitEffected = (e) => {
        let rnd = Math.round(Math.random() * 60)
        let currentR = currentRivalHp - rnd
        setTimeout(() => setNotifications(`${firstPokemon.name} use ${e.target.innerText}!`), 0);
        if (rnd === 0) {
            setTimeout(() => setNotifications(`${firstPokemon.name} missed`), 0);
        }
        if (currentR < 0) {
            currentR = 0
            setCurrentRivalHp(currentR)
            setTimeout(() => setNotifications(`${rival.name} fainted`), 1000);
            setRoundLoser(rival)
            return;
        }
        setMyTurn(false)
        setCurrentRivalHp(currentR)
        setTimeout(() => rivalHitEffected(), 1200);
    }

    const rivalHitEffected = () => {
        let rndMove = Math.ceil(Math.random() * 4)
        let rnd = Math.round(Math.random() * 60)
        let current = currentMyHp - rnd
        setTimeout(() => setNotifications(`${rival.name} use ${rivalMoves[rndMove].name}!`), 0);
        if (rnd === 0) {
            setTimeout(() => setNotifications(`${rival.name} missed`), 0);
        }
        if (current < 0) {
            current = 0
            setCurrentMyHp(current)
            setTimeout(() => {
                setMyPokemons(state => state + 1)
                setNotifications(`${firstPokemon.name} fainted`)
            }, 500);
            if (indx + 1 === battleArr.length) {
                setTimeout(() => setNotifications(`You Lose!`), 1000);
                setTimeout(() => setSwitcher(false), 3000)
                return;
            }
            setTimeout(() => {
                setNotifications(`You sent ${battleArr[indx + 1].name}`)
                setFirstPokemon(battleArr[indx + 1])
                setCurrentMyHp(battleArr[indx + 1].stats[0].base_stat)
                setMyTurn(true)
            }, 2000);
            return;
        }
        setCurrentMyHp(current);
        setMyTurn(true);
    }

    useEffect(() => setCurrentMyHp(firstPokemon.stats[0].base_stat), [])

    useEffect(() => {
        setMyMoves([])
        firstPokemon.moves.map((move) => {
            if (move.version_group_details[0].level_learned_at > 0) {
                setMyMoves(current => [...current, move.move])
            }
        })
    }, [firstPokemon])

    useEffect(() => setCurrentRivalHp(rival.stats[0].base_stat), [])

    useEffect(() => {
        setRivalMoves([])
        rival.moves.map((move) => {
            if (move.version_group_details[0].level_learned_at > 0) {
                setRivalMoves(current => [...current, move.move])
            }
        })
    }, [setOtherPokemon])

    useEffect(() => {
        setCurrentRivalHp(rival.stats[0].base_stat)
        setTimeout(() => setNotifications(`A wild ${rival.name} appeared!`), 1000)
    }, [setOtherPokemon])

    useLayoutEffect(() => {
        if (roundLoser === null) return;
        if (rivalPokemons === battleArr.length - 1) {
            setTimeout(() => {
                setRivalPokemons(battleArr.length)
                setNotifications(`You Win!`)
            }, 1000)
            setTimeout(() => {
                setSwitcher(false)
                setOtherPokemon(currentRivalHp)
            }, 3000)
        } else {
            setRivalPokemons(state => state + 1)
            setTimeout(() => setOtherPokemon(currentRivalHp), 2000)
        }
    }, [roundLoser]);

    return (
        <Box style={{ textAlign: 'center' }} sx={style}>
            <IconButton style={{ float: 'left' }} onClick={switchModals} aria-label="add to favorites">
                <AiOutlineClose style={{ color: themeSlice === false ? 'white' : 'black', fontSize: '3rem' }} />
            </IconButton>
            <h3>Round {rivalPokemons + 1} from {battleArr.length}</h3>
            <div style={{ paddingTop: '1rem' }}>
                <div >
                    <CardGroup >
                        <StartBattleIconPart
                            battleArr={battleArr}
                            firstPokemon={firstPokemon}
                            rivalPokemons={rivalPokemons}
                            myPokemons={myPokemons}
                        />
                        <div style={{ paddingLeft: '20rem', display: 'flex' }}>
                        </div>
                        <StartBattleContent
                            rival={rival}
                            firstPokemon={firstPokemon}
                            currentMyHp={currentMyHp}
                            currentRivalHp={currentRivalHp}
                            themeSlice={themeSlice}
                        />
                    </CardGroup>
                    <div className='wrapper battleOperations'>
                        <div className='first'>
                            {notifications !== '' && <h3>{notifications}</h3>}
                        </div>
                        <div style={{ float: 'right', maxWidth: '22rem' }} className='second'>
                            {myMoves.slice(4, 8).map((move) => <>
                                {myTurn === true &&
                                    <Button style={{ width: '11rem', color: 'black' }} variant="contained" color="inherit" onClick={hitEffected}>
                                        {move.name}
                                    </Button>}
                            </>)}
                            {myMoves.slice(4, 8).map((move) => <>
                                {myTurn === false &&
                                    <div style={{ height: '1.1rem' }}>
                                    </div>}
                            </>)}
                        </div>
                    </div>
                </div>
            </div >
        </Box >
    )
}

export default StartBattle
