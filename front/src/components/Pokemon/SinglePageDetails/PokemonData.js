import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import AttackTable from './AttackTable'
import './data.css'
import Description from './Description'
import OtherForms from './OtherForms'

const PokemonData = ({ pokemon, dynamicText, happiness, megaEvolutions, pokemonDesc, pokemonText }) => {

    const themeSlice = useSelector(state => state.theme)

    const meterToFeet = (x) => (x / 3.3).toFixed(2).replace('.', "'")

    const numberWithCommas = (x) => x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const toUpper = (x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();

    return (
        <div className='totalWrapper'>
            <h3 style={dynamicText}>{toUpper(pokemon.name)}</h3>
            <table style={dynamicText} className="first table tablee doss">
                <thead>
                    <tr style={dynamicText}>
                        <th style={dynamicText} scope="col">National №</th>
                        <td style={dynamicText} scope="col">{pokemon.id}</td>
                    </tr>
                    {pokemonDesc !== '' && <tr style={dynamicText}>
                        <th style={dynamicText} scope="col">Pokemon Species</th>
                        <td style={dynamicText} scope="col">{pokemonDesc}</td>
                    </tr>}
                    {pokemonText.length !== 0 && <tr style={dynamicText}>
                        <th style={dynamicText} scope="col">Pokemon Description</th>
                        <td style={dynamicText} scope="col"><Description pokemon={pokemon.name} pokemonText={pokemonText} /></td>
                    </tr>}
                    <tr style={dynamicText}>
                        <th style={dynamicText} scope="col">Type</th>
                        <td style={dynamicText} scope="col">
                            {pokemon.types.map((type, idx) =>
                                <div className={'btnType type' + (type.type.name)} key={idx}>
                                    {type.type.name}
                                </div>
                            )}</td>
                    </tr>
                    <tr style={dynamicText}>
                        <th style={dynamicText} scope="col">Height</th>
                        <td style={dynamicText} scope="col">{pokemon.height / 10} Meters / {meterToFeet(pokemon.height)} Feet</td>
                    </tr>
                    <tr style={dynamicText}>
                        <th style={dynamicText} scope="col">Weight</th>
                        <td style={dynamicText} scope="col">{numberWithCommas(pokemon.weight / 10)} Kg / {numberWithCommas(pokemon.weight / 10 * 2.2)} lbs</td>
                    </tr>
                    <tr style={dynamicText}>
                        <th style={dynamicText} scope="col">Abilities</th>
                        <td style={dynamicText} scope="col">{pokemon.abilities.map((ability, idx) =>
                            <Fragment key={idx}>
                                {idx !== pokemon.abilities.length - 1 ? toUpper(ability.ability.name) + ' / ' : toUpper(ability.ability.name)}
                            </Fragment>
                        )}</td>
                    </tr>
                </thead>
            </table>
            <div>
            </div>
            <table style={dynamicText} className="first table tablee">
                <thead>
                    <div className=''>
                        <h5 className='first' style={dynamicText}>Base Stats</h5>
                    </div>
                    {pokemon.stats.map((stat, idx) =>
                        <tr key={idx}>
                            <td>{toUpper(stat.stat.name)}</td>
                            <td style={{ width: '1rem' }}>{stat.base_stat}</td>
                            <td style={{ width: '12rem' }} >
                                <div style={{ width: '12rem' }}
                                    className={themeSlice === false ? "myProgressdark" : "myProgress"}>
                                    <div className={themeSlice === false ? "myBardark" : "myBar"}
                                        style={{ width: `${Math.ceil(stat.base_stat / 2.5)}%` }}></div>
                                </div>
                            </td>
                            <td style={{ width: '5rem' }}>{Math.ceil(stat.base_stat * 2.5)}</td>

                        </tr>
                    )}
                    {happiness > 0 && <tr>
                        <td>{toUpper('happiness')}</td>
                        <td style={{ width: '1rem' }}>{happiness}</td>
                        <td style={{ width: '12rem' }} >
                            <div style={{ width: '12rem' }}
                                className={themeSlice === false ? "myProgressdark" : "myProgress"}>
                                <div className={themeSlice === false ? "myBardark" : "myBar"}
                                    style={{ width: `${Math.ceil(happiness / 2.5)}%` }}></div>
                            </div>
                        </td>
                        <td style={{ width: '5rem' }}>{Math.ceil(happiness * 2.5)}</td>

                    </tr>}
                </thead>
            </table>
            <div className='others'>
                <OtherForms dynamicText={dynamicText} megaEvolutions={megaEvolutions} />
            </div>
            <div className='dos'>
                <AttackTable pokemon={pokemon} />
            </div>
        </div>
    )
}

export default PokemonData
