import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import {getPlayerById} from "../../api/api";
import ContentContainer from "../ContentContainer";

const PlayerForm = (props) => {
  const {playerId} = useParams()

  const [player, setPlayer] = useState({});
  const [error, setError] = useState('');
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    getPlayerById(setLoaded, setPlayer, setError, playerId)
  }, [])

  return (
      <ContentContainer contentTitle="Player details">
        <p>{player.firstname}</p>
      </ContentContainer>
  )
}

export default PlayerForm;