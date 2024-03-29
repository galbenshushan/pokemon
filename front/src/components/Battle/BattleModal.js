import React, { useEffect, useLayoutEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { Button, IconButton } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { CardGroup } from "react-bootstrap";
import "./battle.css";
import {
  setItemToLocalStorage,
  getItemFromLocalStorage,
} from "../../helpers/localStorage";
import BattlePartners from "./BattleDetails/BattlePartners";
import BattleIntro from "./BattleDetails/BattleIntro";
import StartBattle from "./BattleDetails/StartBattle";

const BattleModal = ({
  getFromBattle = () => {},
  levelUpHandler = () => {},
  open,
  setOpen = () => {},
}) => {
  const user = useSelector((state) => state.auth);

  const team = getItemFromLocalStorage(`myteam${user.user._id}`);

  const themeSlice = useSelector((state) => state.theme);

  const dynamicText = themeSlice === false ? "white" : "black";

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "73rem",
    height: "45rem",
    bgcolor: themeSlice === false ? "rgb(30,30, 32)" : "white",
    color: themeSlice === false ? "white" : "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [faintedCheck, setFaintedCheck] = useState();

  const [initialTeamForBattle, setInitialTeamForBattle] = useState([]);

  const [switcher, setSwitcher] = useState(false);

  const [battleArr, setBattleArr] = useState([]);

  const [rival, setRival] = useState();

  const handleClose = () => setOpen(false);

  const regret = (pokemon) =>
    setBattleArr(battleArr.filter((poke) => poke.name !== pokemon.name));

  const startBattle = () => {
    if (battleArr.length > 0) {
      setItemToLocalStorage("battleteam", battleArr);
      setTimeout(() => setSwitcher(true), 200);
    } else return;
  };

  const switchModals = () => {
    setSwitcher(false);
    handleClose();
  };

  const rndPokemon = Math.round(Math.random() * 898);

  const getDetails = async () => {
    const aborted = new AbortController();
    try {
      aborted.abort();
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${rndPokemon}`,
        aborted.signal
      );
      const data = await res.json();
      data.isShiny = Math.ceil(Math.random() * 2000);
      data.level = 1;
      data.icon =
        data.sprites.versions["generation-viii"]["icons"]["front_default"];
      data.image = data.sprites.other.home.front_default;
      data.shinyImage = data.sprites.other.home.front_shiny;
      setRival(data);
    } catch (err) {
      console.log({ err });
    }
  };

  const setOtherPokemon = (fainted) => {
    setFaintedCheck(fainted);
    if (fainted === 0) {
      getDetails();
      return;
    }
  };

  useEffect(
    () => setItemToLocalStorage("battleteam", battleArr),
    [battleArr.length]
  );

  useEffect(() => getFromBattle(initialTeamForBattle), [battleArr.length]);

  useEffect(() => setInitialTeamForBattle(team), []);

  useLayoutEffect(() => setInitialTeamForBattle(team), [team.length]);

  useLayoutEffect(() => setBattleArr([team[0]]), [team.length]);

  useEffect(() => getDetails(), []);

  return (
    <>
      <div
        style={{
          backgroundColor: themeSlice === false ? "rgb(30,30, 32)" : "white",
        }}
      >
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <>
            {switcher === false && (
              <Box
                style={{ textAlign: "center" }}
                className="modalMBL"
                sx={style}
              >
                <IconButton
                  style={{ float: "left" }}
                  onClick={switchModals}
                  aria-label=""
                >
                  <AiOutlineClose
                    style={{
                      color: themeSlice === false ? "white" : "black",
                      fontSize: "3rem",
                    }}
                  />
                </IconButton>
                <h3>Choose Pokemons for the battle</h3>
                {battleArr.length > 0 && (
                  <div
                    className="chooseMBL"
                    style={{ display: "inline-block" }}
                  >
                    {battleArr.map((pokemon, idx) => (
                      <BattlePartners
                        key={idx}
                        pokemon={pokemon}
                        regret={regret}
                        dynamicText={dynamicText}
                      />
                    ))}
                  </div>
                )}
                <div
                  style={{
                    paddingLeft: "4rem",
                    paddingTop: battleArr.length === 0 ? "4.5rem" : "",
                  }}
                >
                  <div>
                    <CardGroup style={{ paddingTop: "1rem" }}>
                      {initialTeamForBattle.map((pokemon, idx) => (
                        <BattleIntro
                          key={idx}
                          pokemon={pokemon}
                          battleArr={battleArr}
                          setBattleArr={setBattleArr}
                        />
                      ))}
                    </CardGroup>
                  </div>
                  <br />
                  {battleArr.length > 0 && (
                    <Button
                      style={{ position: "fixed", top: "41rem", left: "35rem" }}
                      className="centerBtn"
                      color="error"
                      onClick={startBattle}
                      variant="contained"
                    >
                      Go!
                    </Button>
                  )}
                </div>
              </Box>
            )}
            {switcher === true && (
              <StartBattle
                levelUpHandler={levelUpHandler}
                setSwitcher={setSwitcher}
                setOtherPokemon={setOtherPokemon}
                themeSlice={themeSlice}
                switchModals={switchModals}
                battleArr={battleArr}
                setBattleArr={setBattleArr}
                style={style}
                rival={rival}
              />
            )}
          </>
        </Modal>
      </div>
    </>
  );
};
export default BattleModal;
