import { IconButton, Tooltip, Zoom } from '@mui/material'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const BattlePartners = ({ pokemon, regret, dynamicText, }) => {

    const toUpper = (x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();

    return (
        <div style={{ paddingRight: '5rem', width: '12rem', float: 'left' }}>
            <Tooltip className='second' TransitionComponent={Zoom} title={<h6>Let {toUpper(pokemon.name)} rest for now</h6>}>
                <IconButton onClick={() => regret(pokemon)} aria-label="add to favorites">
                    <AiOutlineClose style={{ color: dynamicText, fontSize: '1rem' }} />
                </IconButton>
            </Tooltip>
            <img style={{ width: '5rem' }} alt="pokemon" className='pokemonImage'
                src={pokemon.icon} />
        </div>
    )
}

export default BattlePartners
