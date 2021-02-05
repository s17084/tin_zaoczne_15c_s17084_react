import React from "react";
import PlayerParticipationsRow from "./PlayerParticipationsRow";
import {useTranslation} from 'react-i18next';

const PlayerParticipations = (props) => {
  const {t} = useTranslation();
  const {participations} = props;

  return (
      <>
        <h2>{t('pageTitles.playerParticipations')}</h2>
        <table className="table-list">
          <thead>
          <tr>
            <th>{t('forms.player.playerParticipations.tournaments')}</th>
            <th>{t('forms.player.playerParticipations.finalPosition')}</th>
            <th>{t('forms.player.playerParticipations.pointsGained')}</th>
            <th>{t('forms.player.playerParticipations.pointsOverall')}</th>
          </tr>
          </thead>
          <tbody>
          {participations.map(p =>
              <PlayerParticipationsRow participation={p}/>
          )}
          </tbody>
        </table>
      </>
  )
}

export default PlayerParticipations;