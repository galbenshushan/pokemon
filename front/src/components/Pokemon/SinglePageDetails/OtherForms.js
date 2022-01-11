import React from 'react'
import { Tooltip, Zoom } from '@mui/material'

const OtherForms = ({ megaEvolutions, dynamicText }) => {

    return (<>
        {megaEvolutions.length > 0 && <div>
            <h5 style={dynamicText}>Other Forms</h5>
            {megaEvolutions.map((pokemon, idx) =>
                <div style={{ display: 'inline-block' }} key={idx}>
                    <Tooltip TransitionComponent={Zoom}
                        title={<h6>{pokemon.name}</h6>}>
                        <img className='img' src={pokemon.image} width='100rem' />
                    </Tooltip>
                </div>)}
        </div>}
    </>
    )
}

export default React.memo(OtherForms)
