import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { AiOutlineClose, AiOutlineCheck, AiFillCloseCircle } from "react-icons/ai";

export default function ReleasePokemon({ pokemon, onRelease, toUpper }) {

    const themeSlice = useSelector(state => state.theme)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'fit-content',
        bgcolor: themeSlice === false ? 'rgb(30,30, 32)' : 'white',
        color: themeSlice === false ? 'white' : 'black',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const releasePokemon = () => {
        onRelease(pokemon.id)
        handleClose()
    }

    return (<>
        <AiFillCloseCircle onClick={handleOpen} style={{
            color: themeSlice === false ? 'white' : 'black', fontSize: '3rem'
        }} className='icon' />
        <div style={{ backgroundColor: themeSlice === false ? 'rgb(30,30, 32)' : 'white' }}>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box style={{ textAlign: 'center' }} sx={style}>
                    <h3>  Are you sure you want to release {`${pokemon.nickname || toUpper(pokemon.name)}`}?</h3>
                    <div style={{ paddingTop: '1rem' }}>
                        <IconButton style={{ float: 'left' }} onClick={handleClose} aria-label="add to favorites">
                            <AiOutlineClose style={{ color: themeSlice === false ? 'white' : 'black', fontSize: '3rem' }} />
                        </IconButton>
                        <IconButton style={{ float: 'right' }} onClick={releasePokemon} aria-label="add to favorites">
                            <AiOutlineCheck style={{ color: themeSlice === false ? 'white' : 'black', fontSize: '3rem' }} />
                        </IconButton>
                    </div>
                </Box>
            </Modal>
        </div>
    </>
    );
}
