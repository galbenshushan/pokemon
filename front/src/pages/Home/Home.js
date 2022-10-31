import React from "react";
import { useSelector } from "react-redux";
import "./home.css";
import oak from "../../images/oak.png";
import { Link } from "react-router-dom";
import { getItemFromLocalStorage } from "../../helpers/localStorage";

const Home = () => {
  const themeSlice = useSelector((state) => state.theme);

  const dynamicText = themeSlice === false ? "white" : "black";

  const user = useSelector((state) => state.auth);

  let team = getItemFromLocalStorage(`myteam${user.user._id}`) || [];

  return (
    <div className="containerr">
      <div className="intro wrapper">
        <div
          className="introText first"
          style={{
            color: dynamicText,
            textAlign: "center",
            paddingLeft: "30rem",
          }}
        >
          <h3>Hello there!</h3>
          Welcome to the world of pokémon! My name is Gal! People call me the
          pokémon Prof! <br />
          This world is inhabited by creatures called pokémon! For some people,
          pokémon are pets.
          <br />
          Others use them for fights. Myself...I study pokémon as a profession.
          <br />
          Here you can research Pokemon like me, set up your own team and even
          fight other Pokemon!
          <br />
          {user.isAuth === true && team.length === 0 && (
            <>
              So what are you waiting for?
              <br />{" "}
              <Link className="navigate-link" to="/team">
                Click here to start your journey!
              </Link>
              <br />
            </>
          )}
          {user.isAuth === true && team.length > 0 && (
            <>
              Go catch some Pokemon!
              <br />{" "}
              <Link className="navigate-link" to="/team">
                Click here to back to your journey!
              </Link>
              <br />
            </>
          )}
          {user.isAuth === false && (
            <>
              I see you aren't login please{" "}
              <Link className="navigate-link" to="/login">
                click here
              </Link>
              <br />
              If you are not registered{" "}
              <Link className="navigate-link" to="/register">
                click here
              </Link>
              <br />
            </>
          )}
        </div>
        <div>
          <img
            className="second"
            style={{ width: "25rem", float: "right" }}
            src={oak}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
