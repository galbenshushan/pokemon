import { Box, IconButton, Menu, Typography } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CustomizedSwitches from "../UI/Switch";

const MobileMode = ({ user, dynamicText }) => {
  const router = useHistory();

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {user.isAuth && (
          <MenuItem
            onClick={() => {
              router.push("/Pokedex");
              handleCloseNavMenu();
            }}
          >
            <Typography textAlign="center">Pokedex</Typography>
          </MenuItem>
        )}
        {user.isAuth && (
          //   <Link className="nav-itemm" to="/team">
          <MenuItem onClick={handleCloseNavMenu}>
            <Typography textAlign="center">Team</Typography>
          </MenuItem>
        )}
        {/* <Link className="nav-itemm" to="Home"> */}
        <MenuItem onClick={handleCloseNavMenu}>
          <Typography textAlign="center">Home</Typography>
        </MenuItem>
        {/* </Link> */}
        {/* <Link className="nav-itemm" to="Home"> */}
        <MenuItem onClick={handleCloseNavMenu}>
          <Typography textAlign="center">About</Typography>
        </MenuItem>
        {/* </Link> */}
        <Box sx={{ flexGrow: 0 }} style={dynamicText}>
          <CustomizedSwitches />
        </Box>
      </Menu>
    </Box>
  );
};

export default MobileMode;
