import React, { useEffect } from 'react'
import { BsStars } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import battleBackground from '../../../images/battle.jpg'
import pokeballicon from '../../../images/pokeballicon.png'


const StartBattleContent = ({ rival, firstPokemon, currentMyHp, currentRivalHp, throwPokeball, PokemonInBall, pausa, pausaForMe, meAttacking , isAttacking}) => {

    const themeSlice = useSelector(state => state.theme);

    const dynamicText = themeSlice === false ? 'white' : 'black'

    const dynamicBack = themeSlice === false ? 'black' : 'white'

    const checkHP = (someHp, totalHp) => {
        const hp = someHp / totalHp
        if (hp < 0.25) {
            return 'red'
        }
        if (0.25 < hp < 0.75) {
            return 'yellow'
        }
        if (hp === 1 || hp > 0.75) {
            return 'green'
        }
        if (someHp === 0) {
            return 'transparent'
        }
    }

    useEffect(() => checkHP(), [currentMyHp, currentRivalHp])

    return (
        <div >
            {pausa === false && <div>
                <div className='rvl' style={{ backgroundColor: dynamicBack, borderRadius: '18px', width: '16rem', textAlign: 'left', paddingLeft: '0.5rem' }}>
                    <h5 style={{ color: dynamicText }}>{rival.isShiny % 9 === 2 && <BsStars style={{ color: 'rgb(255, 208, 0)' }} />} {rival.name} Lv.{rival.level}</h5>
                    <div style={{ width: '15rem' }}
                        className={themeSlice === false ? "myProgressdark battlebar" : "myProgress battlebar"}>
                        <div className={themeSlice === false ? "myBardark" : "myBar"}
                            style={{
                                transition: '0.5s',
                                width: `${currentRivalHp / rival.stats[0].base_stat * 100}%`,
                                backgroundColor: checkHP(currentRivalHp, rival.stats[0].base_stat)
                            }}>
                        </div>
                    </div>
                    <br />
                    <h5>HP: {currentRivalHp} /{rival.stats[0].base_stat}</h5>
                </div>
                {PokemonInBall === false && <>
                    {rival.isShiny % 9 !== 2 && <img alt="pokemon" className={isAttacking === false ? 'pokemonImage moveUpDown currentRival' : 'pokemonImage moveUpDown currentRival rivalMoveWhenAttack'}  src={rival.sprites.front_default} />}
                    {rival.isShiny % 9 === 2 && <img alt="pokemon" className='pokemonImage moveUpDown currentRival' src={rival.sprites.front_shiny} />}
                </>}
                {PokemonInBall === true &&
                    <img style={{ width: '2rem', paddingTop: '2rem', display: 'flex' }} alt="pokemon" className='moveLeftRight pokemonImage currentRival' src={pokeballicon} />}
            </div>}
            {pausaForMe === false && <div>
                <div className='prtcp' style={{ backgroundColor: dynamicBack, borderRadius: '18px', width: '16rem', textAlign: 'left', paddingLeft: '0.5rem' }}>
                    <h5>{firstPokemon.isShiny % 9 === 2 && <BsStars style={{ color: 'rgb(255, 208, 0)' }} />}
                        {firstPokemon.nickname || firstPokemon.name} Lv.{firstPokemon.level}</h5>
                    <div style={{ width: '15rem' }}
                        className={themeSlice === false ? "myProgressdark battlebar" : "myProgress battlebar"}>
                        <div className={themeSlice === false ? "myBardark" : "myBar"}
                            style={{
                                transition: '0.5s',
                                width: `${Math.floor(currentMyHp / firstPokemon.stats[0].base_stat * 100)}%`,
                                backgroundColor: checkHP(currentMyHp, firstPokemon.stats[0].base_stat)
                            }}>
                        </div>
                    </div>
                    <br />
                    <h5>HP: {currentMyHp} /{firstPokemon.stats[0].base_stat}</h5>
                </div>
                <img style={{ width: '2rem', paddingTop: '2rem', display: 'flex' }} alt="pokemon" className={throwPokeball === false ? 'no-move' : 'move currentPrtp'} src={pokeballicon} />
                {firstPokemon.isShiny % 9 !== 2 && <img alt="pokemon" className={meAttacking === false ? 'pokemonImage moveUpDown currentPrtp' : 'pokemonImage moveUpDown currentPrtp moveWhenAttack'} src={firstPokemon.sprites.back_default} />}
                {firstPokemon.isShiny % 9 === 2 &&
                    <img alt="pokemon" className={meAttacking === false ? 'pokemonImage moveUpDown currentPrtp' : 'move currentPrtp moveWhenAttack'} src={firstPokemon.sprites.back_shiny} />}

            </div>}
            <img className='battleBackgroud' src={battleBackground} style={{ width: '58.5rem' }} />
        </div>
    )
}

export default StartBattleContent
