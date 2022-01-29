
import './App.css';
import Footer from './pages/Footer/Footer';
import Navbar from './pages/Navbar/Navbar';
import { useSelector } from "react-redux";
import Pokedex from './components/Pokedex/Pokedex';
import Team from './pages/Team/Team';
import Home from './pages/Home/Home';
import { Route, Switch } from 'react-router-dom';
import SinglePokemon from './components/Pokemon/SinglePokemonPage';
import PrimarySearchAppBar from './pages/Navbar/Navv';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Starters from './components/Starters/Starters';
import About from './pages/About/About';
import NotFound from './pages/404/NotFound';
import WhosThatPokemon from './components/WhosThatPokemon/WhosThatPokemon';

function App() {

  const user = useSelector(state => state.auth)

  const themeSlice = useSelector(state => state.theme)

  return (
    <div style={{ backgroundColor: themeSlice === false ? 'rgb(30,30, 32)' : 'white' }} className="App">
      <Navbar />
      <PrimarySearchAppBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/about" exact component={About} />
        {user.isAuth && <Route path="/Team" exact component={Team} />}
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        {user.isAuth && <Route path="/team/starters" exact component={Starters} />}
        {user.isAuth && <Route path="/Pokedex/:id" exact component={SinglePokemon} />}
        {user.isAuth && <Route path="/Pokedex" exact component={Pokedex} />}
        {user.isAuth && <Route path="/quiz" exact component={WhosThatPokemon} />}
        <Route path="/Pokedex/notFound" exact component={NotFound} />
        <Route path="*" exact component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
