import { IconButton, Tooltip, Zoom } from '@mui/material'
import React from 'react'
import { AiOutlineMinus } from 'react-icons/ai'
import { useSelector } from 'react-redux';

const BattlePartners = ({ pokemon, regret }) => {

    const themeSlice = useSelector(state => state.theme);

    const dynamicText = themeSlice === false ? 'white' : 'black'

    const dynamicBack = themeSlice === false ? 'rgb(12, 12, 12)' : 'rgb(227, 236, 243)'

    const dynamicBorder = themeSlice === false ? '3px solid rgb(12, 12, 12)' : '3px solid rgb(227, 236, 243)'

    const toUpper = (x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();

    return (
        <div style={{ marginRight: '1rem', width: 'fit-content', float: 'left', border: dynamicBorder, borderRadius: '1rem', backgroundColor: dynamicBack }}>
            <Tooltip className='second' TransitionComponent={Zoom} title={<h6>Let {toUpper(pokemon.name)} rest for now</h6>}>
                <IconButton onClick={() => regret(pokemon)} aria-label="add to favorites">
                    <AiOutlineMinus style={{ color: dynamicText, fontSize: '1rem' }} />
                </IconButton>
            </Tooltip>
            <img style={{ width: '5rem' }} alt="pokemon" className='pokemonImage' 
                src={pokemon.icon} />
        </div>
    )
}

export default BattlePartners
