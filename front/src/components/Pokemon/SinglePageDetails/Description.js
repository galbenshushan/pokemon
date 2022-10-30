import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";

export default function Description({ pokemonText, pokemon }) {
  const themeSlice = useSelector((state) => state.theme);

  const uniqueText = [...new Set(pokemonText.slice(-7))];

  const checkTxt = (text) => {
    let reg = "\f";
    if (text.includes(reg)) {
      text = text.replace(reg, " ");
      return text;
    } else {
      return text;
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "55rem",
    maxHeight: "50rem",
    overflowX: "auto",
    lineHeight: "300%",
    bgcolor: themeSlice === false ? "rgb(30,30, 32)" : "white",
    color: themeSlice === false ? "white" : "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <div
      style={{
        backgroundColor: themeSlice === false ? "rgb(30,30, 32)" : "white",
      }}
    >
      <Button onClick={handleOpen}>Read About {pokemon}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>About {pokemon}</h3>
          <br />
          {uniqueText.map((text, idx) => (
            <div key={idx}>
              {checkTxt(text)}
              <br />
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
