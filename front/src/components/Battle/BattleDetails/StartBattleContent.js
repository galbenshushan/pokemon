import React, { useEffect } from 'react'
import battleBackground from '../../../images/battle.jpg'

const StartBattleContent = ({ rival, firstPokemon, currentMyHp, currentRivalHp, themeSlice }) => {

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
    }

    useEffect(() => checkHP(), [currentMyHp, currentRivalHp])


    return (
        <div >
            <div>
                <div className='rvl' style={{ backgroundColor: 'black', borderRadius: '18px', width: '16rem', textAlign: 'left', paddingLeft: '0.5rem' }}>
                    <h5> {rival.name} Lv.1</h5>
                    <div style={{ width: '15rem' }}
                        className={themeSlice === false ? "myProgressdark battlebar" : "myProgress battlebar"}>
                        <div className={themeSlice === false ? "myBardark" : "myBar"}
                            style={{
                                width: `${currentRivalHp / rival.stats[0].base_stat * 100}%`,
                                backgroundColor: checkHP(currentRivalHp, rival.stats[0].base_stat)
                            }}>
                        </div>
                    </div>
                    <br />
                    <h5>HP: {currentRivalHp} /{rival.stats[0].base_stat}</h5>
                </div>
                <img alt="pokemon" className='pokemonImage moveUpDown currentRival' src={rival.sprites.front_default} />
            </div>
            <div>
                <div className='prtcp' style={{ backgroundColor: 'black', borderRadius: '18px', width: '16rem', textAlign: 'left', paddingLeft: '0.5rem' }}>
                    <h5> {firstPokemon.nickname || firstPokemon.name} Lv.1</h5>
                    <div style={{ width: '15rem' }}
                        className={themeSlice === false ? "myProgressdark battlebar" : "myProgress battlebar"}>
                        <div className={themeSlice === false ? "myBardark" : "myBar"}
                            style={{
                                width: `${Math.floor(currentMyHp / firstPokemon.stats[0].base_stat * 100)}%`,
                                backgroundColor: checkHP(currentMyHp, firstPokemon.stats[0].base_stat)
                            }}>
                        </div>
                    </div>
                    <br />

                    <h5>HP: {currentMyHp} /{firstPokemon.stats[0].base_stat}</h5>
                </div>
                <img alt="pokemon" className='pokemonImage moveUpDown currentPrtp' src={firstPokemon.sprites.back_default} />
            </div>
            <img src={battleBackground} style={{ width: '60rem' }} />
        </div>
    )
}

export default StartBattleContent
