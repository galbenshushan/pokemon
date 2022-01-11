import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
// import "./battle.css"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from '@mui/material';

export default function Battle({ onHandleClose }) {

    const themeSlice = useSelector(state => state.theme);

    const toUpper = (x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '75rem',
        bgcolor: themeSlice === false ? 'rgb(30,30, 32)' : 'white',
        color: themeSlice === false ? 'white' : 'black',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const dynamicText = themeSlice === false ? 'white' : 'black'

    const [open, setOpen] = useState(false);

    const [battleArr, setBattleArr] = useState([]);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const battleTeamHandler = (pokemon) => {
        const exist = battleArr.find(poke => poke.name === pokemon.name)
        if (battleArr.length >= 3 || exist) {
            return
        } else {
            console.log(pokemon.icon)
            setBattleArr(current => [...current, pokemon])
        }
    }


    return (<>
        <div onClick={handleOpen} style={{
            color: themeSlice === false ? 'white' : 'black'
        }}>
           <Button onClick={onHandleClose} className='centerBtn' color='error' variant="contained">Go!</Button>
        </div>
        <div style={{ backgroundColor: themeSlice === false ? 'rgb(30,30, 32)' : 'white' }}>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box style={{ textAlign: 'center' }} sx={style}>
dfvdfgbvxdf
                </Box>
            </Modal>
        </div>
    </>
    );
}
