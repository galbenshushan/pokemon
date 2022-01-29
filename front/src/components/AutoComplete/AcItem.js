import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const AcItem = ({ pokemon, isMarked }) => {

    const history = useHistory()

    const themeSlice = useSelector(state => state.theme)

    return (
        <li onClick={() => history.replace(`/Pokedex/${pokemon.name}`)}
            className={themeSlice === false ? `autocomplete-item-dark${isMarked ? 'active' : ''}` : `autocomplete-item${isMarked ? 'active' : ''}`}>
            <img className='autocomplete-image' src={pokemon.image} />
            <p className='pokemon-name'>#{pokemon.id} {pokemon.name}</p>
        </li>
    )
}

export default AcItem
