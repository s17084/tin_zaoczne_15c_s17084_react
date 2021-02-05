import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getPlayersList} from "../../api/api";
import PlayerListTable from "./PlayerListTable";
import ContentContainer from "../ContentContainer";
import {useTranslation} from 'react-i18next';
import {useRole} from "../../hooks/useRole";

const PlayerList = (isLogged) => {
  const {t} = useTranslation();
  const {isAdmin} = useRole();

  const [playerList, setPlayerList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    getPlayersList(setLoaded, setPlayerList, setError);
  }, [isLogged])

  return (
      <ContentContainer contentTitle={t('pageTitles.players')}>
        {error ? (
            <p>{t('error.' + (error?.status ? error.status : 'unknown'))}</p>
        ) : !isLoaded ? (
            <p>{t("messages.dataLoading")}</p>
        ) : playerList.length > 0 ? (
            <>
              <PlayerListTable playerList={playerList}/>
              {isAdmin ? (
              <p>
                <Link className="button-add"
                      to={{
                        pathname: "/players/new",
                        state: {isCreate: true, isEditable: true}
                      }}>
                  {t('tables.playersTable.addNewPlayer')}
                </Link>
              </p> ) : null}
            </>
        ) : (
            <p>{t('messages.noData')}</p>
        )}
      </ContentContainer>
  )
}

export default PlayerList;