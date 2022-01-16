import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { IoIosCloseCircle, IoIosSearch } from "react-icons/io";
import AcItem from './AcItem';
import "./auto.css"

const AutoComplete = () => {

    const history = useHistory()

    const inputRef = useRef('')

    const itemRef = useRef('')

    const [pokemonData, setPokemonData] = useState([])

    const [display, setDisplay] = useState(false)

    const [xButton, setxButton] = useState(false)

    const [cursor, setCursor] = useState(-1)

    const themeSlice = useSelector(state => state.theme)

    const getPokemon = useCallback(async (e) => {
        setPokemonData([])
        setDisplay(false)
        setCursor(-1)
        const res = await fetch('https://pokeapi.co/api/v2/pokedex/1')
        const data = await res.json()
        const pokemonArr = data.pokemon_entries
        pokemonArr.map(async pokemon => {
            const pokemonName = pokemon.pokemon_species.name
            if (e.target.value === '') {
                setxButton(false)
                return;
            }
            if (pokemonName.startsWith(e.target.value) && pokemonName.includes(e.target.value)) {
                setDisplay(true)
                const moreData = async () => {
                    setxButton(true)
                    setPokemonData([])
                    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                        .then(response => response.json())
                        .then(fullPokemonData => {
                            const id = fullPokemonData.id
                            const name = fullPokemonData.name
                            const image = fullPokemonData.sprites.other.home.front_default
                            setPokemonData(current => [...current, { id, name, image }])
                        });
                }
                moreData()
            }
        })
    }, [pokemonData])

    const refReset = () => {
        inputRef.current.value = ''
        setxButton(false)
    }

    const refMark = (e) => {
        e.target.focus();
        e.target.select();
    }

    const keysEvents = (e) => {
        if (e.key === 'ArrowDown') {
            cursor === pokemonData.length ? setCursor(0) : setCursor(cursor + 1)
            if (cursor > 1) {
                itemRef.current.scrollBy(0, 49);
            }
        }
        if (e.key === 'ArrowUp') {
            cursor === -1 ? setCursor(- 1) : setCursor(cursor - 1)
            if (cursor > 1) {
                itemRef.current.scrollBy(0, -48);
            }
        }
        if (e.key === 'Escape') {
            refReset()
        }
        if (e.key === 'Enter') {
            if (cursor > -1) {
                history.replace(`/PokemonList/${pokemonData[cursor].name}`)
            }
            if (cursor === -1) {
                pokemonData.forEach(pokemon => {
                    if (pokemon.name === inputRef.current.value) {
                        history.replace(`/PokemonList/${pokemon.name}`)
                    } else return;
                });
            }
        }
    }

    useLayoutEffect(() => { }, [])

    return (
        <div >
            <div>
                <span className="deleteicon" onKeyDown={keysEvents}
                    onBlur={() => setTimeout(() => setDisplay(false), 150)}>
                    <input
                        onKeyDown={keysEvents}
                        onClick={refMark}
                        onChange={getPokemon}
                        placeholder="Search Pokemon.."
                        className={themeSlice === false ? 'auto-input-dark' : 'auto-input'}
                        ref={inputRef} />
                    {xButton === true && <span onClick={refReset}>
                        <IoIosCloseCircle style={{ color: themeSlice === false ? 'white' : 'black' }} />
                    </span>}
                    {inputRef.current.value === '' && <span>
                        <IoIosSearch style={{ color: themeSlice === false ? 'white' : 'black', cursor: 'text' }} />
                    </span>}
                </span>
                {display && <div
                    className={themeSlice === false ? 'auto-container-dark' : 'auto-container'}>
                    <ul className={themeSlice === false ? 'autocomplete-items-dark' : 'autocomplete-items'} ref={itemRef}>
                        {inputRef.current.value !== '' && <li className={themeSlice === false ? 'autocomplete-res-dark' : 'autocomplete-res'}>
                            <p className='res-counter'>Found {pokemonData.length} Results for "{inputRef.current.value}"</p>
                        </li>}
                        {pokemonData.map((pokemon, idx) =>
                            <AcItem
                                isMarked={cursor === idx ? true : false}
                                key={idx}
                                pokemon={pokemon} />)}
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default AutoComplete
