import { Box, Button, IconButton } from '@mui/material'
import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import { CardGroup } from 'react-bootstrap'
import { AiOutlineMedicineBox } from 'react-icons/ai'
import { MdCatchingPokemon } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { getItemFromLocalStorage, setItemToLocalStorage } from '../../../helpers/localStorage'
import StartBattleContent from './StartBattleContent'
import StartBattleIconPart from './StartBattleIconPart'
import { SiPokemon } from "react-icons/si";


const StartBattle = ({ style, battleArr, themeSlice, rival, setOtherPokemon, setSwitcher, levelUpHandler }) => {

    const [rivalPokemons, setRivalPokemons] = useState(0)

    const [myPokemons, setMyPokemons] = useState(0)

    const [numberOfPokeballs, setNumberOfPokeballs] = useState(10)

    const [numberOfMedicines, setNumberOfMedicines] = useState(10)

    const [firstPokemon, setFirstPokemon] = useState(battleArr[0])

    const [notifications, setNotifications] = useState('')

    const [myMoves, setMyMoves] = useState([])

    const [rivalMoves, setRivalMoves] = useState([])

    const [currentMyHp, setCurrentMyHp] = useState(0)

    const [pausa, setPausa] = useState(false)

    const [pausaForMe, setPausaForMe] = useState(false)

    const [currentRivalHp, setCurrentRivalHp] = useState(0)

    const [myTurn, setMyTurn] = useState(true)

    const [roundLoser, setRoundLoser] = useState(null)

    const [showAttacks, setShowAttacks] = useState(false)

    const [throwPokeball, setThrowPokeball] = useState(false)

    const [PokemonInBall, setPokemonInBall] = useState(false)

    const [isAttacking, setIsAttacking] = useState(false)

    const [meAttacking, setMeAttacking] = useState(false)

    const user = useSelector(state => state.auth)

    let team = getItemFromLocalStorage(`myteam${user.user._id}`)

    let indx = battleArr.indexOf(firstPokemon)


    const hitEffected = (e) => {
        setShowAttacks(false)
        setMeAttacking(true)
        setTimeout(() => setMeAttacking(false), 500);
        let attack = firstPokemon.stats[1].base_stat / 1.3
        let rnd = Math.round(Math.random() * attack)
        console.log(rnd);
        console.log(attack);

        if (firstPokemon.isShiny % 9 === 2) {
            attack = Math.round(attack * 1.5)
        }
        if (rnd > attack - (attack / 10)) {

            setTimeout(() => setNotifications(`A critical hit!`), 500);
        }
        if (myMoves.length === 0) {
            setMyMoves([{ name: 'tackle' }, { name: 'growl' }, { name: 'leer' }])
        }
        let currentR = currentRivalHp - rnd
        setNotifications(`${firstPokemon.nickname || firstPokemon.name} use ${e.target.innerText.toUpperCase()}!`)
        if (rnd === 0) {
            setNotifications(`${firstPokemon.nickname || firstPokemon.name} missed`)
        }
        if (currentR < 0) {
            currentR = 0
            setCurrentRivalHp(currentR)
            setTimeout(() => setNotifications(`${rival.name} fainted`), 1000);
            setTimeout(() => {
                firstPokemon.stats[0].base_stat += 1
                firstPokemon.stats[1].base_stat += 1
                firstPokemon.stats[2].base_stat += 1
                if (currentMyHp < firstPokemon.stats[0].base_stat) {
                    setCurrentMyHp(currentMyHp + 1)
                }
                firstPokemon.level++
                team = team.filter(poke => poke.id !== firstPokemon.id)
                team.push(firstPokemon)
                setItemToLocalStorage(`myteam${user.user._id}`, team)
                levelUpHandler(state => state + 1)
                setNotifications(`${firstPokemon.name} gained 100 EXP`)
            }, 2500);
                setRoundLoser(rival)
            setMyTurn(false)

            return;
        }
        setMyTurn(false)
        setCurrentRivalHp(currentR)
        if (currentRivalHp !== 0) {
            setTimeout(() => {
                rivalHitEffected()
            }, 1500);
        }
    }

    const rivalHitEffected = () => {
        setTimeout(() => setIsAttacking(true), 700);
        setTimeout(() => setIsAttacking(false), 1200);
        let rndMove = Math.ceil(Math.random() * 4)
        let attack = rival.stats[1].base_stat / 1.7
        let rnd = Math.round(Math.random() * attack)
        if (rival.isShiny % 9 === 2) {
            rnd = Math.round(rnd * 1.5)
        }
        let current = currentMyHp - rnd
        if (rnd !== 0) {
            if (rivalMoves.length === 1) {
                setTimeout(() => {
                    setNotifications(`${rival.name} use ${(rivalMoves[0].name).toUpperCase()}!`)
                }, 1000);
            }
            setTimeout(() => {
                setNotifications(`${rival.name} use ${(rivalMoves[rndMove].name).toUpperCase()}!`)
            }, 1000);
        }
        if (rivalMoves.length === 0) {
            setTimeout(() => setNotifications(`${rival.name} use TACKLE!`), 1000);
        }
        setTimeout(() => setNotifications(`What will ${firstPokemon.nickname || firstPokemon.name} do?`), 3000);
        if (rnd === 0) setNotifications(`${rival.name} missed`)
        if (current < 0 || current === 0) {
            current = 0
            setTimeout(() => setCurrentMyHp(current), 2000)
            setTimeout(() => {
                setMyPokemons(state => state + 1)
                setNotifications(`${firstPokemon.nickname || firstPokemon.name} fainted`)
                setPausaForMe(true)
            }, 2500);
            setTimeout(() => setPausaForMe(false), 4000);
            if (indx + 1 === battleArr.length) {
                setTimeout(() => setNotifications(`You Lose!`), 3000);
                setTimeout(() => {
                    setSwitcher(false)
                    setOtherPokemon(0)
                }, 4000)
                return;
            }
            setTimeout(() => {
                setNotifications(`You sent ${battleArr[indx + 1].name}`)
                setFirstPokemon(battleArr[indx + 1])
                setCurrentMyHp(battleArr[indx + 1].stats[0].base_stat)
            }, 3000);
            setTimeout(() => setMyTurn(true), 6000);
            return;
        }
        setTimeout(() => setCurrentMyHp(current), 1000);
        setTimeout(() => setMyTurn(true), 4000);

    }

    const catchPokemon = () => {
        if (numberOfPokeballs > 0) {
            const exist = team.find((poke) => poke.id === rival.id)
            if (exist) {
                setNotifications(`You already have ${rival.name}`)
                setMyTurn(true)
                setTimeout(() => setNotifications(`What will ${firstPokemon.nickname || firstPokemon.name} do?`), 1500);
                return
            };
            setMyTurn(false)
            setNumberOfPokeballs(state => state - 1)
            setThrowPokeball(state => !state)
            setNotifications(`Trying to catch ${rival.name}`)
            setTimeout(() => {
                setThrowPokeball(state => !state)
                setPokemonInBall(true)
                if (team.length < 6 && !exist) {
                    const chances = currentRivalHp / rival.stats[0].base_stat
                    if (chances <= 0.25) {
                        catchChance(1)
                    }
                    if (0.25 < chances && chances <= 0.75) {
                        catchChance(3)
                    }
                    if (chances === 1 || chances > 0.75) {
                        catchChance(5)
                    }
                }
                return;
            }, 1200);
        }
    }


    const catchChance = (chanceRate) => {
        let rndChances = Math.round(Math.random() * 10)
        if (rndChances % chanceRate === 0) {
            setPokemonInBall(true)
            setTimeout(() => { setNotifications(`You Catched a ${rival.name}`) }, 2700);
            team.push(rival)
            setItemToLocalStorage(`myteam${user.user._id}`, team)
            setTimeout(() => {
                setSwitcher(false)
                setOtherPokemon(0)
            }, 4500);
            setTimeout(() => setPokemonInBall(false), 5000);
        } else {
            setTimeout(() => setNotifications(`${rival.name} broke free!`), 2700);
            setTimeout(() => setPokemonInBall(false), 3000);
            setTimeout(() => {
                rivalHitEffected()
                return setMyTurn(false)
            }, 3000);
        }
    }

    const useMedicine = () => {
        let medicinePoints = 40
        if (currentMyHp < firstPokemon.stats[0].base_stat && numberOfMedicines > 0) {
            setNotifications(`${firstPokemon.nickname || firstPokemon.name} use medicine`)
            if (currentMyHp + medicinePoints > firstPokemon.stats[0].base_stat) {
                setCurrentMyHp(firstPokemon.stats[0].base_stat)
            } else {
                setCurrentMyHp(currentMyHp + medicinePoints)
            }
            setMyTurn(false)
            rivalHitEffected()
            setNumberOfMedicines(state => state - 1)
        } else {
            setNotifications(`${firstPokemon.nickname || firstPokemon.name} have full HP`)
            setTimeout(() => setNotifications(`What will ${firstPokemon.nickname || firstPokemon.name} do?`), 1500);
            return
        }
    }

    const exitBattleHandler = () => {
        setNotifications(`Run away safely!`)
        setMyTurn(false)
        setTimeout(() => {
            setSwitcher(state => !state)
            setOtherPokemon(0)
        }, 1000);
    }

    useEffect(() => {
        setCurrentRivalHp(rival.stats[0].base_stat)
        setCurrentMyHp(firstPokemon.stats[0].base_stat)
    }, [])

    useEffect(() => {
        setMyMoves([])
        if (firstPokemon.moves.length > 0) {
            firstPokemon.moves.map((move) => {
                if (move.version_group_details[0].level_learned_at > 0) {
                    setMyMoves(current => [...current, move.move])
                }
            })
        } else {
            setMyMoves([{ name: 'tackle' }])
        }
    }, [firstPokemon])

    useEffect(() => {
        setRivalMoves([])
        rival.moves.map((move) => {
            if (move.version_group_details[0].level_learned_at > 0) {
                setRivalMoves(current => [...current, move.move])
            }
        })
    }, [setOtherPokemon])

    useEffect(() => {
        setFirstPokemon(firstPokemon)
    }, [firstPokemon.stats])

    useEffect(() => {
        setCurrentRivalHp(rival.stats[0].base_stat)
        setMyTurn(false)
        setTimeout(() => { setNotifications(`A wild ${rival.name} appeared!`) }, 2400)
        setTimeout(() => {
            setNotifications(`What will ${firstPokemon.nickname || firstPokemon.name} do?`)
            setMyTurn(true)
        }, 3500)
    }, [setOtherPokemon])

    useLayoutEffect(() => {
        if (roundLoser === null) return;
        if (rivalPokemons === battleArr.length - 1) {
            setTimeout(() => setPausa(true), 2500)
            setTimeout(() => {
                setRivalPokemons(battleArr.length)
                setNotifications(`You Win!`)
            }, 3700)

            setTimeout(() => {
                setSwitcher(false)
                setOtherPokemon(currentRivalHp)
            }, 4500)

        } else {
            setTimeout(() => setPausa(true), 2000)
            setRivalPokemons(state => state + 1)
            setTimeout(() => setOtherPokemon(currentRivalHp), 2000)
            setTimeout(() => setPausa(false), 3500)
        }
    }, [roundLoser]);

    return (
        <Box style={{ textAlign: 'center' }} sx={style}>
            <IconButton style={{ float: 'left', cursor: 'default' }} >
                <SiPokemon style={{ color: themeSlice === false ? 'white' : 'black', fontSize: '3rem' }} />
            </IconButton>
            {rivalPokemons + 1 <= battleArr.length && <h3 > Round {rivalPokemons + 1} from {battleArr.length}</h3>}
            {rivalPokemons + 1 > battleArr.length && <h3 > You Win!</h3>}
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
                            isAttacking={isAttacking}
                            meAttacking={meAttacking}
                            throwPokeball={throwPokeball}
                            PokemonInBall={PokemonInBall}
                            catchPokemon={catchPokemon}
                            myTurn={myTurn}
                            pausa={pausa}
                            setPausa={setPausa}
                            pausaForMe={pausaForMe}
                            rival={rival}
                            firstPokemon={firstPokemon}
                            currentMyHp={currentMyHp}
                            currentRivalHp={currentRivalHp}
                        />
                    </CardGroup>
                    <div className='wrapper battleOperations'>
                        <div className='first'>
                            {notifications !== '' && <h3>{notifications}</h3>}
                        </div>
                        <div style={{ float: 'right', maxWidth: '22rem', height: '4.4rem' }} className='second'>
                            <Fragment>
                                {myTurn === true && showAttacks === false && <>
                                    <Button style={{ width: '11rem', color: 'black' }} variant="contained" color="inherit" onClick={() => setShowAttacks(true)}>
                                        Attack
                                    </Button>
                                    {team.length !== 6 && <Button style={{ width: '11rem', color: 'black' }} variant="contained" color="inherit" onClick={catchPokemon}>
                                        <MdCatchingPokemon style={{ fontSize: '1.4rem' }} /> X {numberOfPokeballs}
                                    </Button>}
                                    {team.length === 6 && <Button disabled style={{ width: '11rem', color: 'black', backgroundColor: '#e0e0e0' }} variant="contained" color="inherit" onClick={catchPokemon}>
                                        team is full
                                    </Button>}
                                    {numberOfMedicines !== 0 && <Button style={{ width: '11rem', color: 'black' }} variant="contained" color="inherit" onClick={useMedicine}>
                                        <AiOutlineMedicineBox style={{ fontSize: '1.4rem' }} /> X {numberOfMedicines}
                                    </Button>}
                                    {numberOfMedicines === 0 && <Button disabled style={{ width: '11rem', color: 'black', backgroundColor: '#e0e0e0' }} variant="contained" color="inherit" onClick={useMedicine}>
                                        <AiOutlineMedicineBox style={{ fontSize: '1.4rem' }} /> X {numberOfMedicines}
                                    </Button>}
                                    <Button style={{ width: '11rem', color: 'black' }} variant="contained" color="inherit" onClick={exitBattleHandler}>
                                        Run
                                    </Button>
                                </>
                                }
                            </Fragment>
                            {myMoves.slice(0, 4).map((move, idx) => <Fragment key={idx}>
                                {myTurn === true &&
                                    <Button style={{ width: '11rem', color: 'black' }} variant="contained" color="inherit" onClick={hitEffected}>
                                        {move.name}
                                    </Button>}
                            </Fragment>)}
                            {myTurn === false &&
                                <div style={{ height: '4.4rem' }}>
                                    <br />
                                </div>}
                        </div>
                    </div>
                </div>
            </div >
        </Box >
    )
}

export default StartBattle
