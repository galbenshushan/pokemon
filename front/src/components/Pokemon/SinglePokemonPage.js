import { IconButton, Tooltip, Zoom } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MdCatchingPokemon } from 'react-icons/md'
import { GiCheckMark } from 'react-icons/gi'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getItemFromLocalStorage, setItemToLocalStorage } from '../../helpers/localStorage'
import './card.css'
import AttackTable from './SinglePageDetails/AttackTable'
import PokemonData from './SinglePageDetails/PokemonData'
import { BsStars } from 'react-icons/bs'
import Evolution from './SinglePageDetails/Evolution'

const SinglePokemon = () => {

    const [isInTeam, setisInTeam] = useState(false)

    const [pokemon, setPokemon] = useState({})

    const [pokemonDesc, setPokemonDesc] = useState('')

    const [happiness, setHappiness] = useState(0)

    const [pokemonText, setPokemonText] = useState([])

    const [evolutionLineOne, setEvolutionLineOne] = useState([])

    const [evolutionLineTwo, setEvolutionLineTwo] = useState([])

    const [evolutionLineThree, setEvolutionLineThree] = useState([])

    const [megaEvolutions, setMegaEvolutions] = useState([])

    let params = useParams()

    const themeSlice = useSelector(state => state.theme)
    
    const user = useSelector(state => state.auth)

    const dynamicText = { color: themeSlice === false ? 'white' : 'black', textAlign: 'left' }

    const pokeArr = getItemFromLocalStorage(`myteam${user.user._id}`)

    const exist = pokeArr.find((poke) => poke.id === pokemon.id)

    const getDetails = async () => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
        const data = await res.json()
        data.isShiny = Math.ceil(Math.random() * 2000)
        data.icon = data.sprites.versions["generation-viii"]["icons"]["front_default"]
        data.image = data.sprites.other.home.front_default
        data.shinyImage = data.sprites.other.home.front_shiny
        setPokemon(data)
    }

    const getMoreDetails = async () => {
        setEvolutionLineOne([])
        setEvolutionLineTwo([])
        setEvolutionLineThree([])
        setMegaEvolutions([])
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.id}`)
        const data = await res.json()
        const evos = []
        const evolutionRes = await fetch(data.evolution_chain.url)
        const evolutionChain = await evolutionRes.json()
        if (evolutionChain.chain.species.name) {
            const name = evolutionChain.chain.species.name
            const order = 1
            evos.push({ name, order })
            if (evolutionChain.chain.evolves_to[0] !== undefined) {
                evolutionChain.chain.evolves_to.forEach((ev) => {
                    const name = ev.species.name
                    const howEv = ev.evolution_details[0]
                    const order = 2
                    evos.push({ name, howEv, order })
                })
                if (evolutionChain.chain.evolves_to[0].evolves_to[0] !== undefined) {
                    evolutionChain.chain.evolves_to[0].evolves_to.forEach((evv) => {
                        const name = evv.species.name
                        const howEv = evv.evolution_details[0]
                        const order = 3
                        evos.push({ name, howEv, order })
                    })
                }
            }
        }
        setMegaEvolution(data)
        setEvolutions(evos)
        getDescription(data)
    }

    const getDescription = (data) => {
        data.genera.map((ge) => {
            if (ge.language.name === 'en') {
                setPokemonDesc(ge.genus);
            }
        })
        setPokemonText([])
        data.flavor_text_entries.map((text) => {
            if (text.language.name === 'en') {
                if (pokemonText.includes(text.flavor_text)) {
                    return;
                } else {
                    setPokemonText(current => [...current, text.flavor_text])
                }
            }
        })
        setHappiness(data.base_happiness)
    }

    const setEvolutions = (evos) => {
        evos.forEach(async (pokemon) => {
            if (pokemon !== undefined) {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                const data = await res.json()
                const name = data.name
                const order = pokemon.order
                const image = data.image = data.sprites.other.home.front_default
                if (order === 1) {
                    setEvolutionLineOne(current => [...current, { name, image, order }])
                }
                const howEv = []
                const howEvTemp = Object.keys(pokemon.howEv).map((key) => {
                    return { key, vval: pokemon.howEv[key] || '' };
                });
                howEvTemp.map(async (ev) => {
                    if (ev.vval !== '') {
                        if (ev.key === 'min_happiness') {
                            ev.vval = '❤️'
                        }
                        howEv.push(ev)
                    }
                })
                if (order === 2) {
                    setEvolutionLineTwo(current => [...current, { name, image, order, howEv }])
                }
                if (order === 3) {
                    setEvolutionLineThree(current => [...current, { name, image, order, howEv }])
                }
            }
        })
    }

    const setMegaEvolution = (data) => {
        data.varieties.map(async (mega) => {
            if (mega.is_default !== true) {
                const res = await fetch(mega.pokemon.url)
                const data = await res.json()
                let howEv = ''
                if (data.name.includes('gmax')) {
                    howEv = 'gmax'
                }
                if (data.name.includes('mega')) {
                    howEv = 'mega'
                }
                const image = data.sprites.front_default
                const name = data.name
                setMegaEvolutions(current => [...current, { name, image, howEv }]);
            }
        })

    }



    const catchPokemonHandler = () => {
        if (exist) return;
        if (pokeArr.length < 6) {
            setisInTeam(true)
            pokeArr.push(pokemon)
            setItemToLocalStorage(`myteam${user.user._id}`, pokeArr)
        }
        return;
    }

    useEffect(() => getDetails(), [params])

    useEffect(() => getMoreDetails(), [params])

    return (<>
        {pokemon.id > 0 && <div>
            <div className='wrapper pageRole'>
                <div style={{ width: '40rem', marginLeft: '2rem' }} className='first'>
                    <div className='uno'>
                        <PokemonData
                            pokemon={pokemon}
                            dynamicText={dynamicText}
                            happiness={happiness}
                            pokemonDesc={pokemonDesc}
                            pokemonText={pokemonText}
                            megaEvolutions={megaEvolutions} />
                        <div style={{ float: 'left' }}>
                            {exist && <Tooltip TransitionComponent={Zoom}
                                title={<h6>{pokemon.name} is in your team!</h6>}>
                                <IconButton style={{ cursor: 'default' }} aria-label="share">
                                    <GiCheckMark style={dynamicText} className='iconBigg' />
                                </IconButton>
                            </Tooltip>}
                            {!exist && pokemon.id < 1000 && <Tooltip TransitionComponent={Zoom}
                                title={<h6>Catch {pokemon.name}!</h6>}>
                                <IconButton onClick={catchPokemonHandler} aria-label="share">
                                    <MdCatchingPokemon style={dynamicText} className='iconBigg' />
                                </IconButton>
                            </Tooltip>}
                        </div>
                    </div>

                   
                </div>
                <div style={{ float: 'right' }} className='second wrapper'>
                    <div className='imagesContainer'>
                        <img className='first pokemonImagePage' src={pokemon.sprites.other.home.front_default} />
                        <div className='second pusher' >
                            <BsStars className='stars' />
                            <img className='pokemonImagePage' src={pokemon.sprites.other.home.front_shiny} />
                        </div>
                    </div>
                    <Evolution
                        evolutionLineOne={evolutionLineOne}
                        evolutionLineTwo={evolutionLineTwo}
                        evolutionLineThree={evolutionLineThree}
                        megaEvolutions={megaEvolutions}
                        dynamicText={dynamicText}
                        params={params} />
                </div>

            </div>
        </div>}
    </>
    )
}

export default SinglePokemon
