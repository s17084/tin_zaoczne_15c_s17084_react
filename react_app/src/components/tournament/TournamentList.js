import React, {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next';
import ContentContainer from "../ContentContainer";
import TournamentListTable from "./TournamentListTable";
import {Link} from "react-router-dom";
import {useRole} from "../../hooks/useRole";
import {getTournamentList} from "../../api/api";

const TournamentList = () => {
  const {t} = useTranslation();
  const {isAdmin, isPlayer, loggedUserId} = useRole();

  const [tournamentList, setTournamentList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    getTournamentList(setLoaded, setTournamentList, setError);
  }, [])

  console.log(tournamentList)

  return (
      <ContentContainer contentTitle={t('pageTitles.tournaments')}>
        {error ? (
            <p>{t('error.' + (error?.status ? error.status : 'unknown'))}</p>
        ) : !isLoaded ? (
            <p>{t("messages.dataLoading")}</p>
        ) : tournamentList.length > 0 ? (
            <>
              <TournamentListTable tournamentList={tournamentList}/>
              {isAdmin ? (
                  <p>
                    <Link className="button-add"
                          to={{
                            pathname: "/tournaments/new",
                            state: {isCreate: true, isEditable: true}
                          }}>
                      {t('tables.tournamentTable.addNewTournament')}
                    </Link>
                  </p>) : null}
            </>
        ) : (
            <p>{t('messages.noData')}</p>
        )}
      </ContentContainer>
  )
}

export default TournamentList;