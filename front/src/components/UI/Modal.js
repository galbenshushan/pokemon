import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';

export default function BasicModal({ move }) {
    
    const themeSlice = useSelector(state => state.theme)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'fit-content',
        bgcolor: themeSlice === false ? 'rgb(30,30, 32)' : 'white',
        color:themeSlice === false ? 'white' : 'black',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);
    
    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    return (
        <div style={{ backgroundColor: themeSlice === false ? 'rgb(30,30, 32)' : 'white' }}>
            <Button onClick={handleOpen}>About {move.name}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h4 id="modal-modal-title" variant="h6" component="h2">
                        {move.name}
                    </h4>
                    <div id="modal-modal-description" sx={{ mt: 2 }}>
                        {move.textToMap.map((enText, idx) =>
                            enText.version_group.name === 'black-white' &&
                            enText.language.name === 'en' &&
                            <div key={idx}>{enText.flavor_text}</div>
                        )}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}