
const baseUrl = 'http://localhost:3000/api'

export const getPlayersList = (setLoaded, setPlayerList, setError) => {
  const url = baseUrl + '/players'
  getData(url, setLoaded, setPlayerList, setError);
}

export const getTournamentList = (setLoaded, setTournamentList, setError) => {
  const url = baseUrl + '/tournaments'
  getData(url, setLoaded, setTournamentList, setError);
}

export const getParticipationList = (setLoaded, setParticipationList, setError) => {
  const url = baseUrl + '/participations'
  getData(url, setLoaded, setParticipationList, setError);
}

export const getPlayerById = (setLoaded, setPlayer, setError, playerId) => {
  const url = baseUrl + '/players/' + playerId;
  getData(url, setLoaded, setPlayer, setError);
}

export const getTournamentById = (setLoaded, setTournament, setError, tournamentId) => {
  const url = baseUrl + '/tournaments/' + tournamentId;
  getData(url, setLoaded, setTournament, setError);
}

export const getParticipationById = (setLoaded, setParticipation, setError, participationId) => {
  const url = baseUrl + '/participations/' + participationId;
  getData(url, setLoaded, setParticipation, setError);
}

export const addPlayer = (playerData) => {
  const birthDate = isNaN(Date.parse(playerData.birthDate)) ? null : new Date(playerData.birthDate).toISOString()
  const reqBody = JSON.stringify({
    firstname: playerData.firstname,
    lastname: playerData.lastname,
    email: playerData.email,
    licenseNumber: playerData.licenseNumber,
    birthDate: birthDate
  })
  const url = baseUrl + '/players/';
  return addItem(url, reqBody);
}

export const addTournament = (tournamentData) => {
  const date = isNaN(Date.parse(tournamentData.date)) ? null : new Date(tournamentData.date).toISOString()
  const reqBody = JSON.stringify({
    name: tournamentData.name,
    date: date,
    rank: tournamentData.rank,
    prizePool: tournamentData.prizePool,
  })
  const url = baseUrl + '/tournaments/';
  return addItem(url, reqBody);
}

export const addParticipation = (participationData) => {
  const reqBody = JSON.stringify({
    player: participationData.player,
    tournament: participationData.tournament,
    finalPosition: participationData.finalPosition,
    rankPointsGained: participationData.rankPointsGained,
    rankPointsOverall: participationData.rankPointsOverall
  })
  const url = baseUrl + '/participations/';
  return addItem(url, reqBody);
}

export const updatePlayer = (playerData) => {
  const birthDate = isNaN(Date.parse(playerData.birthDate)) ? null : new Date(playerData.birthDate).toISOString()
  const reqBody = JSON.stringify({
    firstname: playerData.firstname,
    lastname: playerData.lastname,
    email: playerData.email,
    licenseNumber: playerData.licenseNumber,
    birthDate: birthDate
  })
  const url = baseUrl + '/players/' + playerData._id;
  return updateItem(url, reqBody);
}

export const updateTournament = (tournamentData) => {
  const date = isNaN(Date.parse(tournamentData.date)) ? null : new Date(tournamentData.date).toISOString()
  const reqBody = JSON.stringify({
    name: tournamentData.name,
    date: date,
    rank: tournamentData.rank,
    prizePool: tournamentData.prizePool,
  })
  const url = baseUrl + '/tournaments/' + tournamentData._id;
  return updateItem(url, reqBody);
}

export const updateParticipation = (participationData) => {
  const reqBody = JSON.stringify({
    player: participationData.player,
    tournament: participationData.tournament,
    finalPosition: participationData.finalPosition,
    rankPointsGained: participationData.rankPointsGained,
    rankPointsOverall: participationData.rankPointsOverall
  })
  const url = baseUrl + '/participations/' + participationData._id;
  return updateItem(url, reqBody);
}

export const deletePlayer = (playerId) => {
  const url = baseUrl + '/players/' + playerId
  return deleteItem(url);
}

export const deleteTournament = (tournamentId) => {
  const url = baseUrl + '/tournaments/' + tournamentId
  return deleteItem(url);
}

export const deleteParticipation = (participationId) => {
  const url = baseUrl + '/participations/' + participationId
  return deleteItem(url);
}

const addItem = (url, reqBody) => {
  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
      'Content-Type': 'application/json'
    },
    body: reqBody
  }
  return fetch(url, options);
}

const updateItem = (url, reqBody) => {
  const options = {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
      'Content-Type': 'application/json'
    },
    body: reqBody
  }
  return fetch(url, options);
}

const deleteItem = (url) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
  };
  return fetch(url, options);
}

const getData = (url, setLoaded, setData, setError) => {
  const options = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
  };

  fetch(url, options)
  .then(res => {
    if (res.status === 200) {
      return res.json();
    } else{
      return {
        error: {
          status: res.status,
          message: res.statusText,
        }
      }
    }
  })
  .then((data) => {
        setLoaded(true);
        if (data?.error) {
          setError(data.error)
        } else {
          setData(data)
          setError(null)
        }
      },
      (error) => {
        setLoaded(true);
        setError(error)
      }
  );
}

export const login = (user) => {
  const url = `${baseUrl}/auth/login`
  const userString = JSON.stringify(user)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: userString
  }
  return fetch(url, options);
}