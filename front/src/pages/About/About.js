import React from 'react'
import { useSelector } from 'react-redux'

const About = () => {
    const themeSlice = useSelector(state => state.theme)

    const dynamicText = themeSlice === false ? 'white' : 'black'
    return (
        <div className='containerr'>
            <div className='wrapper'>
                <h1 style={{ color: dynamicText }}>About</h1>
                <div className='textt first inst' style={{ color: dynamicText, textAlign: 'left' }}>
                    <h2 style={{ color: dynamicText, textAlign: 'left' }}>Instruction</h2>
                    If you aren't login or register to the app, do it.<br />
                    After that will be able to choose your first pokemon starter and give him a nickname if you want.<br />
                    You can search from the Pokedex for Pokemon that you like, Read about it and see all the information about it,<br />
                    stats, attacks, evolutions and more details about the pokemon, maybe one day it will be yours<br />
                    You have something like 10% chance to get a shiny pokemon, Try your best!<br />
                    You able to battle with your Pokemon agaist another random Pokemons and raise your pokemon level! <br />
                    each Level your Pokemon reached, the stronger it got!<br />
                    Of course you can also catch them if you will succeed.<br />
                    Advice: It is recommended to fight them a little before but not to defeat them, it increases the chances of capture.<br />
                    I'm sure you will be great!
                </div>
                <br />
            </div>
        </div>
    )
}

export default About
