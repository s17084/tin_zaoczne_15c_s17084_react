import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getPlayersList} from "../../api/api";
import PlayerListTable from "./PlayerListTable";
import ContentContainer from "../ContentContainer";
import {useTranslation} from 'react-i18next';

const PlayerList = () => {
  const {t} = useTranslation();

  const [playerList, setPlayerList] = useState([]);
  const [error, setError] = useState('');
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    getPlayersList(setLoaded, setPlayerList, setError);
  }, [])

  return (
      <ContentContainer contentTitle={t('pageTitles.players')}>
        {error ? (
            <p>Error: {error.message}</p>
        ) : !isLoaded ? (
            <p>{t("messages.dataLoading")}</p>
        ) : playerList.length > 0 ? (
            <>
              <PlayerListTable playerList={playerList}/>
              <p>
                <Link className="button-add" to="players-form.html">
                  {t('tables.playersTable.addNewPlayer')}
                </Link>
              </p>
            </>
        ) : (
            <p>{t('messages.noData')}</p>
        )}
      </ContentContainer>
  )
}

export default PlayerList;