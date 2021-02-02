import React from 'react';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom'
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import MainPage from "./components/MainPage";
import Footer from "./components/Footer";
import PlayerList from "./components/player/PlayerList";
import PlayerForm from "./components/player/PlayerForm";

function App() {
  return (
      <Router>
        <Header/>
        <Navigation/>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/players" component={PlayerList}/>
          <Route exact path="/players/details/:playerId"
                 component={PlayerForm}/>
        </Switch>
        <Footer/>
      </Router>
  )
}

export default App;
