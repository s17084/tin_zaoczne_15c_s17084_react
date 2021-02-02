const baseUrl = 'http://localhost:3000/api'

export const getPlayersList = (setLoaded, setPlayerList, setError) => {
  const url = baseUrl + '/players'
  getData(url, setLoaded, setPlayerList, setError);
}

export const getPlayerById = (setLoaded, setPlayerList, setError, playerId) => {
  const url = baseUrl + '/players/' + playerId;
  getData(url, setLoaded, setPlayerList, setError);
}

const getData = (url, setLoaded, setData, setError) => {
  fetch(url)
  .then(res => res.json())
  .then((data) => {
        setLoaded(true);
        setData(data)
      },
      (error) => {
        setLoaded(true);
        setError(error)
      }
  );
}