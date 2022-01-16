import { Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import snorlax from '../../images/143.gif'
import "./notFound.css"

const NotFound = () => {
    const themeSlice = useSelector(state => state.theme)

    const dynamicText = themeSlice === false ? 'white' : 'black'

    const history = useHistory()

    return (<div>

        <div style={{ color: dynamicText }} className='notFound'>
            4<img style={{ width: '15rem' }} src={snorlax} />4
        </div>
        <div style={{ color: dynamicText }}>
           <h4>Oops! A wild Snorlax has blocked your path!</h4>
           <Button onClick={()=> {history.replace('/home')}} className='btnStyle' variant="contained">GO BACK</Button>
        </div>
    </div>
    )
}

export default NotFound
