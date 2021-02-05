import React from "react";
import {useTranslation} from 'react-i18next';
import TournamentParticipationsRow from "./TournamentParticipationsRow";

const TournamentParticipations = (props) => {
  const {t} = useTranslation();
  const {participations} = props;

  return (
      <>
          <h2>{t('pageTitles.tournamentParticipations')}</h2>
          <table className="table-list">
            <thead>
            <tr>
              <th>{t('forms.tournament.tournamentParticipations.player')}</th>
              <th>{t('forms.tournament.tournamentParticipations.finalPosition')}</th>
              <th>{t('forms.tournament.tournamentParticipations.pointsGained')}</th>
              <th>{t('forms.tournament.tournamentParticipations.pointsOverall')}</th>
            </tr>
            </thead>
            <tbody>
            {participations.map(p =>
                <TournamentParticipationsRow participation={p}/>
            )}
            </tbody>
          </table>
      </>
  )
}

export default TournamentParticipations;