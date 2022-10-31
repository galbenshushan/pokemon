import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import darkLogo from "../../images/darkLogo.png";
import lightLogo from "../../images/lightLogo.png";
import { useSelector } from "react-redux";
import CustomizedSwitches from "../UI/Switch";
import "./navbar.css";
import { NavDropdown } from "react-bootstrap";
import UseLogout from "../../hooks/UseLogout";
import userLogo from "../../images/trainerLogo.png";
import logo from "../../images/logo2.png";
import logo1 from "../../images/logo3.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MobileMode from "./MobileMode";
import NavButton from "./NavButton";

const ResponsiveAppBar = () => {
  const { logout } = UseLogout();

  const user = useSelector((state) => state.auth);

  const themeSlice = useSelector((state) => state.theme);

  const router = useHistory();

  const dynamicText = {
    color: themeSlice === false ? "white" : "black",
    fontWeight: "600",
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor:
          themeSlice === false ? "rgb(12, 12, 12)" : "rgb(227, 236, 243)",
      }}
    >
      <div
        style={{
          backgroundImage:
            themeSlice === false ? `url("${logo1}")` : `url("${logo}")`,
          height: "fit-content",
        }}
        className="site-header"
      />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <div className="logo-type">
              <img
                src={themeSlice === false ? darkLogo : lightLogo}
                width="200rem"
                alt="darkimg"
              />
            </div>
          </Typography>
          <MobileMode user={user} dynamicText={dynamicText} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <img
              src={themeSlice === false ? darkLogo : lightLogo}
              width="100rem"
              alt="darkimg"
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavButton name={"Home"} route={"home"} dynamicText={dynamicText} />
            {user.isAuth && (
              <NavButton
                name={"Pokedex"}
                route={"Pokedex"}
                dynamicText={dynamicText}
              />
            )}

            <NavButton
              name={"About"}
              route={"About"}
              dynamicText={dynamicText}
            />
            {user.isAuth && (
              <NavButton
                name={"My Team"}
                route={"team"}
                dynamicText={dynamicText}
              />
            )}
            <Button style={dynamicText}>
              <CustomizedSwitches />
            </Button>
          </Box>

          <Box className="nav-itemm" sx={{ flexGrow: 0 }} style={dynamicText}>
            {!user.isAuth && (
              <Button
                style={dynamicText}
                className="nav-itemm"
                onClick={() => router.push("/login")}
                sx={{ my: 2, mx: 5, display: "block" }}
              >
                Log in
              </Button>
            )}
          </Box>
          <Box className="nav-itemm" sx={{ flexGrow: 0 }} style={dynamicText}>
            {user.isAuth && (
              <NavDropdown
                title={
                  <Button
                    style={dynamicText}
                    className="nav-item-text nav-itemm"
                    // onClick={handleCloseNavMenu}
                    sx={{ my: 2, mx: 5, display: "block" }}
                  >
                    {user.user.first_name}
                    <img
                      src={userLogo}
                      alt="pokemonTrainer"
                      style={{ width: "2.5rem" }}
                    />
                  </Button>
                }
                id="basic-nav-dropdown"
              >
                {/* {user.user.email === "galbenshushan5@gmail.com" &&
                  user.isAuth && (
                    <NavDropdown.Item href="#action/3.1">
                      Admin Dashboard
                    </NavDropdown.Item>
                  )}
                <NavDropdown.Divider /> */}
                {/* <NavDropdown.Item href="#action/3.2">Account</NavDropdown.Item> */}
                {/* <NavDropdown.Item href="#action/3.3">
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to="/team"
                  >
                    Team
                  </Link>
                </NavDropdown.Item> */}
                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item onClick={logout} className="nav-itemm">
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {!user.isAuth && (
              <Button
                className="nav-itemm"
                style={dynamicText}
                onClick={() => router.push("/register")}
                sx={{ my: 2, mx: 5, display: "block" }}
              >
                Register
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
