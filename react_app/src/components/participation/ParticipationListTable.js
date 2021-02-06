import React from "react";
import {useTranslation} from 'react-i18next';
import ParticipationListTableRow from "./ParticipationListTableRow";

const ParticipationListTable = (props) => {
  const {t} = useTranslation();
  const {participationList} = props;

  return (
      <table className="table-list">
        <thead>
        <tr>
          <th>{t('tables.participationTable.player')}</th>
          <th>{t('tables.participationTable.tournament')}</th>
          <th>{t('tables.participationTable.finalPosition')}</th>
          <th>{t('tables.participationTable.actions')}</th>
        </tr>
        </thead>
        <tbody>
        {participationList.map(participation =>
            <ParticipationListTableRow participation={participation} key={participation._id}/>
        )}
        </tbody>
      </table>
  )
}

export default ParticipationListTable;