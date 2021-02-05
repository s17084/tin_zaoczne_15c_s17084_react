import React from "react";
import {useTranslation} from 'react-i18next';
import TournamentListRow from "./TournamentListRow";

const TournamentListTable = (props) => {
  const {t} = useTranslation();
  const {tournamentList} = props;

  return (
      <table className="table-list">
        <thead>
        <tr>
          <th>{t('tables.tournamentTable.name')}</th>
          <th>{t('tables.tournamentTable.date')}</th>
          <th>{t('tables.tournamentTable.rank')}</th>
          <th>{t('tables.tournamentTable.actions')}</th>
        </tr>
        </thead>
        <tbody>
        {tournamentList.map(tournament =>
            <TournamentListRow tournament={tournament} key={tournament._id}/>
        )}
        </tbody>
      </table>
  )
}

export default TournamentListTable;