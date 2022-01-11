import React, { Fragment } from 'react'

const EvolutionOperation = ({ev}) => {
    return (
        <Fragment>
            {ev.vval.name === 'shed' && `extra place in your team`}
            {ev.vval !== '' && ev.key !== 'trigger' && ev.vval &&
                <>
                    {ev.key === 'min_level' && `Lv. ${ev.vval}`}
                    {ev.key === 'time_of_day' && `at ${ev.vval}`}
                    {ev.key === 'min_happiness' && <>{ev.vval}</>}
                    {ev.key === 'location' && <>{ev.vval.name}</>}
                    {ev.key === 'known_move_type' && <>
                        <div style={{ width: '4rem', textAlign: 'center', position: 'relative', display: 'inline-flex' }}>
                            <div
                                style={{ borderRadius: '12px', marginRight: '1rem', padding: "0 0.6rem 0 0.6rem" }}
                                className={'type' + (ev.vval.name)}>{ev.vval.name}
                            </div>
                            move
                        </div>
                    </>}
                    {ev.key === 'item' && `${ev.vval.name}`}
                </>}
        </Fragment>
    )
}

export default EvolutionOperation
