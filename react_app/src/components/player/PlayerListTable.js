import React from "react";
import PlayerListRow from "./PlayerListRow";
import {useTranslation} from 'react-i18next';

const PlayerListTable = (props) => {
  const {t} = useTranslation();
  const {playerList, error, isLoaded} = props;
  return (
      <table className="table-list">
        <thead>
        <tr>
          <th>{t('tables.playersTable.firstname')}</th>
          <th>{t('tables.playersTable.lastname')}</th>
          <th>{t('tables.playersTable.licenseNumber')}</th>
          <th>{t('tables.playersTable.actions')}</th>
        </tr>
        </thead>
        <tbody>
        {playerList.map(player =>
            <PlayerListRow player={player} key={player._id}/>
        )}
        </tbody>
      </table>
  )
}

export default PlayerListTable;