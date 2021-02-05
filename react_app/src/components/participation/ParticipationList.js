import React, {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next';
import ContentContainer from "../ContentContainer";
import ParticipationListTable from "./ParticipationListTable";
import {Link} from "react-router-dom";
import {useRole} from "../../hooks/useRole";
import {getParticipationList} from "../../api/api";

const ParticipationList = () => {
  const {t} = useTranslation();
  const {isAdmin, isPlayer, loggedUserId} = useRole();

  const [participationList, setParticipationList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    getParticipationList(setLoaded, setParticipationList, setError);
  }, [])

  console.log(participationList)

  return (
      <ContentContainer contentTitle={t('pageTitles.participations')}>
        {error ? (
            <p>{t('error.' + (error?.status ? error.status : 'unknown'))}</p>
        ) : !isLoaded ? (
            <p>{t("messages.dataLoading")}</p>
        ) : participationList.length > 0 ? (
            <>
              <ParticipationListTable participationList={participationList}/>
              {isAdmin ? (
                  <p>
                    <Link className="button-add"
                          to={{
                            pathname: "/participation/new",
                            state: {isCreate: true, isEditable: true}
                          }}>
                      {t('tables.participationTable.addNewParticipation')}
                    </Link>
                  </p>) : null}
            </>
        ) : (
            <p>{t('messages.noData')}</p>
        )}
      </ContentContainer>
  )
}

export default ParticipationList;