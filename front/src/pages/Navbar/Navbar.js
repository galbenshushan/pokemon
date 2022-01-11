import React from 'react'
import "./navbar.css"
import { useSelector } from "react-redux";
import logo from '../../images/logo2.png'
import logo1 from '../../images/logo3.png'
const Navbar = () => {

    const themeSlice = useSelector(state => state.theme)

    const dynamicText = { color: themeSlice === false ? 'white' : 'black' }

    return (
        <div style={{ backgroundImage:themeSlice === false ? `url("${logo1}")` : `url("${logo}")`, height:'fit-content' }} className="site-header">

        </div>
    )
}

export default Navbar
