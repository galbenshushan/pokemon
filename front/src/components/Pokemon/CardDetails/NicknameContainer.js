import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MdOutlineEdit, MdClose } from "react-icons/md";
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { Tooltip, Zoom } from '@mui/material';
import { getItemFromLocalStorage } from '../../../helpers/localStorage';


const NicknameContainer = ({ pokemon, location, onNickname, dynamicText, }) => {

    const [nickname, setNickname] = useState(pokemon.nickname)

    const toUpper = (x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();

    const [nicknameToggler, setNicknameToggler] = useState(null)

    const nameRef = useRef('')

    const teamToCheck = getItemFromLocalStorage('myteam')

    const cancelChanges = () => setNicknameToggler(null)

    const nicknameHandler = () => {
        if (nameRef.current.value !== '') {
            setNickname(toUpper(nameRef.current.value));
            onNickname(toUpper(nameRef.current.value), pokemon.name)
            setNicknameToggler(false)
        }
    }

    useEffect(() => {
        if (nicknameToggler !== null) {
            setNicknameToggler(null)
        }
    }, [teamToCheck.length])

    const keysEvents = (e) => {
        if (e.key === 'Enter') {
            nicknameHandler()
        }
        if (e.key === 'Escape') {
            cancelChanges()
        }
    }

    return (
        <>
            {!pokemon.nickname &&
                nicknameToggler === null &&
                location.pathname === '/team' &&
                <Tooltip placement="top" TransitionComponent={Zoom}
                    title={<h6>You can do it only Once!</h6>}>
                    <Button onClick={() => setNicknameToggler(state => !state)} style={dynamicText}
                        variant="outline-secondary" id="button-addon2">
                        Give {toUpper(pokemon.name)} a Nickname?
                    </Button>
                </Tooltip>
            }
            {nicknameToggler && location.pathname === '/team' && <>
                <InputGroup className="mb-3">
                    <FormControl
                        onKeyDown={keysEvents}
                        ref={nameRef}
                        placeholder="Your Partner's New Name.."
                        aria-label="Your Partner's New Name.."
                        aria-describedby="basic-addon2"
                    />
                    <Button
                        onClick={nicknameHandler}
                        variant="outline-secondary" id="button-addon2">
                        <MdOutlineEdit />
                    </Button>
                    <Button
                        onClick={cancelChanges}
                        variant="outline-secondary" id="button-addon2">
                        <MdClose />
                    </Button>
                </InputGroup>
            </>}
        </>
    )
}

export default NicknameContainer
