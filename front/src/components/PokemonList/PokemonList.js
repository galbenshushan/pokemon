import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import "./list.css"
import PokemonCard from '../Pokemon/PokemonCard';
import AutoComplete from '../AutoComplete/AutoComplete';

const PokemonList = ({ }) => {
    const [pokemons, setPokemons] = useState([]);

    const [loadMore, setLoadMore] = useState(`https://pokeapi.co/api/v2/pokemon/?limit=21`)

    const a = true

    const getAllPokemons = async () => {
        const res = await fetch(loadMore)
        const data = await res.json()
        setLoadMore(data.next)
        const pokedex = data.results
        const getDetails = () => {
            pokedex.forEach(async pokemon => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                const data = await res.json()
                const id = data.id
                const moves = data.moves
                const name = data.name
                const types = data.types
                const stats = data.stats
                const icon = data.sprites.versions["generation-viii"]["icons"]["front_default"]
                const image = data.sprites.other.home.front_default
                const shinyImage = data.sprites.other.home.front_shiny
                const sprites = data.sprites
                const isShiny = Math.ceil(Math.random() * 2000)
                setPokemons(current => [...current, { id, name, types, image, shinyImage, isShiny, icon, moves, stats, sprites }])
            });
        }
        getDetails()
    }

    useEffect(() => getAllPokemons(), [a])

    useEffect(() => setPokemons(pokemons.sort((a, b) => {
        if (a.id < b.id) return -1;
        else if (a.id > b.id) return 1;
    })
    ), [pokemons])

    return (
        <div className='pokemon-container'>
            <div className='align'>
                <AutoComplete />
            </div>
            <div className='layout'>
                {pokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
            </div>
            <div>
                <Button className='centerBtn' color='error' variant="contained" onClick={() => getAllPokemons()}>Show More Pokemons..</Button>
            </div>
        </div>
    )
}

export default PokemonList
