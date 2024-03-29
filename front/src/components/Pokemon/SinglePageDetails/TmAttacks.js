import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import BasicModal from "../../UI/Modal";

export default function TmAttacks({ move }) {
  const themeSlice = useSelector((state) => state.theme);

  const dynamicText = { color: themeSlice === false ? "white" : "black" };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    maxHeight: "50rem",
    overflowX: "auto",
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
      <Button onClick={handleOpen}>Moves learnt by TM</Button>
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
          <h5>
            {move.length !== 0
              ? "Moves learnt by TM"
              : "This Pokemon can not learn any move by TM"}{" "}
          </h5>
          {move.length !== 0 && (
            <table style={{ width: "50rem" }} className="first table">
              <thead style={dynamicText}>
                <th style={dynamicText} scope="col"></th>
                <th style={dynamicText} scope="col">
                  Move
                </th>
                <th style={dynamicText} scope="col">
                  Type
                </th>
                <th style={dynamicText} scope="col">
                  PP
                </th>
                <th style={dynamicText} scope="col">
                  Power
                </th>
                <th style={dynamicText} scope="col">
                  Accuracy
                </th>
                <th style={dynamicText} scope="col">
                  Description
                </th>
              </thead>
              <tbody>
                {move.map((move, idx) => (
                  <tr key={idx}>
                    <th style={dynamicText} scope="row"></th>
                    <td style={dynamicText}>
                      <p>{move.name}</p>
                    </td>
                    <td scope="col">
                      <p
                        style={{
                          color: "white",
                          borderRadius: "12px",
                          textAlign: "center",
                        }}
                        className={"type" + move.type.name}
                      >
                        {move.type.name}
                      </p>
                    </td>
                    <td style={dynamicText} scope="col">
                      {move.pp}
                    </td>
                    <td style={dynamicText} scope="col">
                      {move.power ? move.power : "-"}
                    </td>
                    <td style={dynamicText} scope="col">
                      {move.accuracy ? move.accuracy : "-"}
                    </td>
                    <td style={dynamicText} scope="col">
                      <BasicModal move={move} />{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Box>
      </Modal>
    </div>
  );
}
