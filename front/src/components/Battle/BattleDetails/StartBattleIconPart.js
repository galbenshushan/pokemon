import React from 'react'
import pokeballicon from '../../../images/pokeballicon.png'
import { AiOutlineArrowDown } from 'react-icons/ai'

const StartBattleIconPart = ({ battleArr, firstPokemon, rivalPokemons, myPokemons }) => {
    return (
        <div style={{ width: '60rem' }} className='wrapper'>
            <div className='first' style={{ display: 'flex' }}>
                {battleArr.map((pokemon, idx) => <div className='' key={idx}>
                    <div className={pokemon.name === firstPokemon.name ? 'moveUpDown pp' : 'pp'}>
                        {firstPokemon.name === pokemon.name && <AiOutlineArrowDown style={{ display: 'flex', position: 'relative', top: '1rem', left: '1.6rem' }} />}
                        <img style={{ width: '5rem', display: 'flex' ,filter: idx < myPokemons ? 'saturate(0)' : 'saturate(1)' }} alt="pokemon" className='' src={pokemon.icon} />
                    </div>
                    <br />
                </div>)}
            </div>
            <div className='second' style={{ display: 'flex', float: 'right' }} >
                {battleArr.map((pokemon, idx) => <div key={idx}>
                    <div style={{ filter: idx < rivalPokemons ? 'saturate(0)' : 'saturate(1)' }}>
                        <img style={{ width: '2rem', paddingTop: '2rem', display: 'flex' }} alt="pokemon" className='' src={pokeballicon} />
                    </div>
                    <br />
                </div>)}
            </div>
        </div>
    )
}

export default StartBattleIconPart
