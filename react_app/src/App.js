import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom'
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import MainPage from "./components/MainPage";
import Footer from "./components/Footer";
import PlayerList from "./components/player/PlayerList";
import PlayerForm from "./components/player/PlayerForm";
import TournamentList from "./components/tournament/TournamentList";
import TournamentForm from "./components/tournament/TournamentForm";
import ParticipationList from "./components/participation/ParticipationList";
import ParticipationForm from "./components/participation/ParticipationForm";
import {useRole} from "./hooks/useRole";

function App() {
  const {tokenExpired} = useRole();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: ""
  });
  const [isLogged, setLogged] = useState(false);
  const [loginError, setLoginError] = useState("")

  const handleLogin = (data) => {
    const user = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      role: data.role
    }
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", data.token);
    setUser(user);
    setLogged(true)
    setLoginError("");
  }

  const handleTokenExpired = () => {
    if (tokenExpired) {
      setLogged(false);
      localStorage.removeItem("token");
      setUser({
        firstname: "",
        lastname: "",
        email: "",
        role: ""
      })
    }
  }

  const handleLoginError = (error) => {
    setLoginError(error);
  }

  const resetLoginError = () => {
    setLoginError("");
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser({
      firstname: "",
      lastname: "",
      email: ""
    });
    setLogged(false);
    setLoginError("");
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [])

  useEffect(() => {
    setLogged(localStorage.getItem("token"))
  }, [user])

  useEffect(() => {
    handleTokenExpired()
  }, [])

  return (
      <Router>
        <Header loginProps={{
          handleLogin: handleLogin,
          handleLogout: handleLogout,
          handleLoginError: handleLoginError,
          resetLoginError: resetLoginError,
          user: user,
          isLogged: isLogged,
          loginError: loginError
        }}/>
        <Navigation/>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/players" component={PlayerList}
                 isLogged={isLogged}/>
          <Route exact path="/players/details/:playerId"
                 render={(props) => <PlayerForm
                     {...props}
                     isEditable={false}
                     isCreate={false}/>}/>
          <Route exact path="/players/edit/:playerId"
                 render={(props) => <PlayerForm
                     {...props}
                     isEditable={true}
                     isCreate={false}/>}/>
          <Route exact path="/players/new"
                 render={(props) => <PlayerForm
                     {...props}
                     isEditable={true}
                     isCreate={true}/>}/>
          <Route exact path="/tournaments" component={TournamentList}
                 isLogged={isLogged}/>
          <Route exact path="/tournaments/details/:tournamentId"
                 render={(props) => <TournamentForm
                     {...props}
                     isEditable={false}
                     isCreate={false}/>}/>
          <Route exact path="/tournaments/edit/:tournamentId"
                 render={(props) => <TournamentForm
                     {...props}
                     isEditable={true}
                     isCreate={false}/>}/>
          <Route exact path="/tournaments/new"
                 render={(props) => <TournamentForm
                     {...props}
                     isEditable={true}
                     isCreate={true}/>}/>
          <Route exact path="/participations" component={ParticipationList}
                 isLogged={isLogged}/>
          <Route exact path="/participations/details/:participationId"
                 render={(props) => <ParticipationForm
                     {...props}
                     isEditable={false}
                     isCreate={false}/>}/>
          <Route exact path="/participations/edit/:participationId"
                 render={(props) => <ParticipationForm
                     {...props}
                     isEditable={true}
                     isCreate={false}/>}/>
          <Route exact path="/participations/new"
                 render={(props) => <ParticipationForm
                     {...props}
                     isEditable={true}
                     isCreate={true}/>}/>
        </Switch>
        <Footer/>
      </Router>
  )
}

export default App;
