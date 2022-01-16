import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import darkLogo from '../../images/darkLogo.png'
import lightLogo from '../../images/lightLogo.png'
import { useSelector } from 'react-redux';
import CustomizedSwitches from '../../components/UI/Switch';
import "./navbar.css"
import { NavDropdown } from 'react-bootstrap';
import UseLogout from '../../hooks/UseLogout';
import userLogo from '../../images/trainerLogo.png'

const ResponsiveAppBar = () => {

    const { logout } = UseLogout()

    const user = useSelector(state => state.auth)

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);

    const handleCloseNavMenu = () => setAnchorElNav(null);

    const themeSlice = useSelector(state => state.theme)

    const dynamicText = { color: themeSlice === false ? 'white' : 'black', fontWeight: '600' }

    return (
        <AppBar position="static"
            style={{ backgroundColor: themeSlice === false ? 'rgb(12, 12, 12)' : 'rgb(227, 236, 243)' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                        <div className="logo-type">
                            <img src={themeSlice === false ? darkLogo : lightLogo} width='200rem' alt='darkimg' />
                        </div>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}>
                            <Link className='nav-itemm' to='/PokemonList'>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">Pokedex</Typography>
                                </MenuItem>
                            </Link>
                            <Link className='nav-itemm' to='Home'>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">Home</Typography>
                                </MenuItem>
                            </Link>
                            <Link className='nav-itemm' to='Home'>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">About</Typography>
                                </MenuItem>
                            </Link>
                            <Box sx={{ flexGrow: 0 }} style={dynamicText}>
                                <CustomizedSwitches />
                            </Box>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <img src={themeSlice === false ? darkLogo : lightLogo} width='100rem' alt='darkimg' />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link className='nav-itemm' to='/home'>
                            <Button style={dynamicText}
                                className='nav-itemm'
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, mx: 5, display: 'block' }}>
                                Home
                            </Button>
                        </Link>
                        <Link className='nav-itemm' to='/PokemonList'>
                            <Button style={dynamicText}
                                className='nav-itemm'
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, mx: 5, display: 'block' }}
                            >
                                Pokedex
                            </Button>
                        </Link>
                        <Link className='nav-itemm' to='/About'>
                            <Button style={dynamicText}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, mx: 5, display: 'block' }}>
                                About
                            </Button>
                        </Link>
                        {user.isAuth && <Link className='nav-itemm' to='/team'>
                            <Button style={dynamicText}
                                className='nav-item-text'
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, mx: 5, display: 'block' }}>
                                My Team
                            </Button>
                        </Link>}
                        <Button style={dynamicText}>
                            SWITCH THEME<CustomizedSwitches />
                        </Button>
                    </Box>

                    <Box className='nav-itemm' sx={{ flexGrow: 0 }} style={dynamicText}>
                        {!user.isAuth && <Link className='nav-itemm' to='/login'>
                            <Button style={dynamicText}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, mx: 5, display: 'block' }}>
                                Log in
                            </Button>
                        </Link>}
                    </Box>
                    <Box className='nav-itemm' sx={{ flexGrow: 0 }} style={dynamicText}>
                        {user.isAuth && <NavDropdown title={<Button style={dynamicText}
                            className='nav-item-text'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, mx: 5, display: 'block' }}>
                           {user.user.first_name}
                          <img src={userLogo} alt='pokemonTrainer' style={{width:'2.5rem'}}/>
                        </Button>} id="basic-nav-dropdown">
                            {user.user.email === 'galbenshushan5@gmail.com' && user.isAuth &&
                                <NavDropdown.Item href="#action/3.1">
                                    Admin Dashboard
                                </NavDropdown.Item>}
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">Account</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">
                                <Link style={{ color: 'black', textDecoration: 'none' }} to='/team'>
                                    Team
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Avatar</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
                        </NavDropdown>}
                        {!user.isAuth &&
                            <Link className='nav-itemm' to='/register'>
                                <Button style={dynamicText}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, mx: 5, display: 'block' }}>
                                    Register
                                </Button>
                            </Link>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;