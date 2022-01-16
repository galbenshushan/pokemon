import React, { Fragment, useLayoutEffect, useState } from 'react'

const EvolutionOperation = ({ ev }) => {

    const [evolutionItem, setEvolutionItem] = useState('')

    const [location, setLocation] = useState('')

    useLayoutEffect(() => {
        if (ev.key === 'item') {
            fetch(ev.vval.url)
                .then(response => response.json())
                .then(data => setEvolutionItem(data.sprites.default));

        }
        if (ev.key === 'location') {
            console.log(ev.vval);
            fetch(ev.vval.url)
                .then(response => response.json())
                .then(data => console.log(data));

        }
    }, [])

    return (
        <Fragment>
            {ev.vval.name === 'shed' && `extra place in your team`}
            {ev.vval !== '' && ev.key !== 'trigger' && ev.vval &&
                <>
                    {ev.key === 'min_level' && `Lv. ${ev.vval}`}
                    {ev.key === 'time_of_day' && `at ${ev.vval}`}
                    {ev.key === 'min_happiness' && <>{ev.vval}</>}
                    {ev.key === 'location' && <>{ev.vval.name}</>}
                    {ev.key === 'item' && <img src={evolutionItem} />}
                    {ev.key === 'known_move_type' && <>
                        <div style={{ width: '4rem', textAlign: 'center', position: 'relative', display: 'inline-flex' }}>
                            <div
                                style={{ borderRadius: '12px', marginRight: '1rem', padding: "0 0.6rem 0 0.6rem" }}
                                className={'type' + (ev.vval.name)}>{ev.vval.name}
                            </div>
                            move
                        </div>
                    </>}
                </>}
        </Fragment>
    )
}

export default EvolutionOperation
