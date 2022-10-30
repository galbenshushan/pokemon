import { Button, Card, CardHeader } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import "./who.css";
import { answersActions } from "../../store/answersSlice";
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from "../../helpers/localStorage";
import { useHistory } from "react-router-dom";

const WhosThatPokemon = () => {
  const user = useSelector((state) => state.auth);

  const arrToRun = [1, 2, 3];

  const [pokemon, setPokemon] = useState({});

  const [answers, setAnswers] = useState([]);

  const answersSelector = useSelector((state) => state.answers);

  const history = useHistory();

  const [err, setErr] = useState("");

  const [userAnswer, setUserAnswer] = useState(null);

  const [questionsFlag, setQuestionsFlag] = useState(0);

  const [showPokemonFlag, setShowPokemonFlag] = useState(false);

  const [showRewardFlag, setShowRewardFlag] = useState(false);

  const themeSlice = useSelector((state) => state.theme);

  let team = getItemFromLocalStorage(`myteam${user.user._id}`);

  const dynamicText = { color: themeSlice === false ? "white" : "black" };

  const aborted = new AbortController();

  const dispatch = useDispatch();

  const answerHandler = (e) => {
    setErr("");
    setUserAnswer(e.target.value);
  };

  const answerCheck = () => {
    setShowPokemonFlag(true);
    setTimeout(
      () => setAnswers(answers.sort((a, b) => 0.5 - Math.random())),
      1000
    );
    setTimeout(() => setShowPokemonFlag(false), 1000);
    setTimeout(() => setQuestionsFlag((state) => state + 1), 1000);
    dispatch(
      answersActions.addAnswers({
        user_answer: userAnswer,
        correct_answer: pokemon.name,
      })
    );
    setUserAnswer(null);
  };

  const getDetails = async () => {
    aborted.abort();
    const rndPokemon = Math.round(Math.random() * 400);
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
    setPokemon(data);
    return setAnswers((current) => [...current, data]);
  };

  const keysEvents = (e) => e.key === "Enter" && answerCheck();

  const getRestOfAnswers = () => {
    aborted.abort();
    setAnswers([]);
    if (answers.length < 5) {
      arrToRun.forEach(async (a) => {
        const rndPokemon = Math.round(Math.random() * 400);
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${rndPokemon}`,
          aborted.signal
        );
        const data = await res.json();
        setAnswers((current) => [...current, data]);
      });
    }
  };

  const addToTeamHandler = () => {
    const exist = team.find((poke) => poke.id === pokemon.id);
    if (exist) return;
    if (team.length < 6) {
      team.push(pokemon);
      setItemToLocalStorage(`myteam${user.user._id}`, team);
      dispatch(answersActions.correctReset());
      history.replace("./team");
      return;
    }
  };

  useEffect(() => dispatch(answersActions.correctReset()), []);

  useEffect(() => {
    if (questionsFlag < 6) {
      getDetails();
      getRestOfAnswers();
    }
  }, [questionsFlag]);

  useLayoutEffect(() => {
    const shuffled = answers.sort((a, b) => 0.5 - Math.random());
    setAnswers(shuffled);
  }, []);

  return (
    <div
      className={
        showPokemonFlag === false ? "animate__animated animate__backInLeft" : ""
      }
    >
      <div className="layout">
        {questionsFlag < 5 && (
          <Card
            style={{
              backgroundColor:
                themeSlice === false ? "rgb(12, 12, 12)" : "rgb(227, 236, 243)",
            }}
            className=" who"
          >
            <CardHeader
              title={
                <img
                  className="imgWho"
                  src="https://fontmeme.com/permalink/220124/53c2fe7c21b06c4c732f3a738e29bace.png"
                  alt="pokemon-font"
                />
              }
            />
            <section>
              <div tabIndex="0" onKeyDown={keysEvents} className="containe">
                <h5
                  style={{
                    width: "20rem",
                    display: showPokemonFlag === false ? "none" : "inline",
                  }}
                >
                  It's {pokemon.name}!
                </h5>
                <img
                  alt="pokemon"
                  src={pokemon.image}
                  className="whosThatPokemon"
                  style={{
                    width: "20rem",
                    transition: "0.5s",
                    filter:
                      showPokemonFlag === false
                        ? "brightness(0)"
                        : "brightness(1)",
                  }}
                />
                <p style={{ fontWeight: "600", color: "red" }}>{err}</p>
                <RadioGroup
                  style={{ textAlign: "left", paddingLeft: "15rem" }}
                  aria-label="answer"
                  defaultValue="banana"
                  name="radio-buttons-group"
                >
                  {answers.map((answer, idx) => (
                    <div key={idx}>
                      <FormControlLabel
                        onClick={answerHandler}
                        value={answer.name}
                        control={<Radio style={{ color: dynamicText }} />}
                        label={`${idx + 1}. ${answer.name} `}
                      />
                      <br />
                    </div>
                  ))}
                </RadioGroup>
                {userAnswer !== null && (
                  <>
                    <>
                      {user.user.first_name === "" ? "" : user.user.first_name},
                      please click when you sure. <br />
                    </>
                  </>
                )}
                {userAnswer && (
                  <button
                    style={{ zIndex: "999" }}
                    onClick={answerCheck}
                    className="btn btn-danger"
                  >
                    Check
                  </button>
                )}
              </div>
            </section>
          </Card>
        )}
        {questionsFlag === 5 && (
          <Card
            style={{
              backgroundColor:
                themeSlice === false ? "rgb(12, 12, 12)" : "rgb(227, 236, 243)",
            }}
            className=" whoEnd"
          >
            <CardHeader
              title={<h1 style={dynamicText}>Dear {user.user.first_name}</h1>}
            />
            <h5 style={dynamicText}>
              You answered {answersSelector.correct} questions correctly out of{" "}
              {answersSelector.total}
            </h5>
            {answersSelector.correct === 5 && team.length < 6 && (
              <>
                <p style={dynamicText}>Now you can pick your reward!</p>
                {showRewardFlag === false && (
                  <Button
                    onClick={() => setShowRewardFlag(true)}
                    variant="contained"
                    color="error"
                    style={dynamicText}
                  >
                    Click to see what you earned
                  </Button>
                )}
                {showRewardFlag === true && (
                  <>
                    <img
                      alt="pokemon"
                      src={pokemon.image}
                      className="whosThatPokemon"
                      style={{ width: "20rem", transition: "0.5s" }}
                    />
                    <p style={dynamicText}>Your reward is {pokemon.name}!</p>
                    <Button
                      onClick={addToTeamHandler}
                      variant="contained"
                      color="error"
                      style={dynamicText}
                    >
                      Click to Add {pokemon.name} to your team
                    </Button>
                  </>
                )}
              </>
            )}
            {answersSelector.correct === 5 && team.length === 6 && (
              <>
                <p style={dynamicText}>
                  We are sorry, your team is full so you can't get any rewards
                  right now..
                </p>
              </>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default WhosThatPokemon;
