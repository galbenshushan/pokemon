
import './App.css';
import Footer from './pages/Footer/Footer';
import Navbar from './pages/Navbar/Navbar';
import { useSelector } from "react-redux";
import PokemonList from './components/PokemonList/PokemonList';
import Team from './pages/Team/Team';
import Home from './pages/Home/Home';
import { Redirect, Route, Switch } from 'react-router-dom';
import SinglePokemon from './components/Pokemon/SinglePokemonPage';
import PrimarySearchAppBar from './pages/Navbar/Navv';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Starters from './components/Starters/Starters';
import About from './pages/About/About';
import NotFound from './pages/404/NotFound';

function App() {

  const user = useSelector(state => state.auth)

  const themeSlice = useSelector(state => state.theme)

  const createRedirect = to => () => <Redirect to={to} />

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
        {user.isAuth && <Route path="/PokemonList/:id" exact component={SinglePokemon} />}
        {user.isAuth && <Route path="/PokemonList" exact component={PokemonList} />}
        <Route path="/PokemonList/notFound" exact component={NotFound} />
        <Route path="*" exact component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
