import React from "react";
import {useTranslation} from 'react-i18next';
import {Link} from "react-router-dom";
import {useRole} from "../../hooks/useRole";
import {deleteTournament} from "../../api/api";

const TournamentListRow = (props) => {
  const {t} = useTranslation();
  const {tournament} = props;
  const {isAdmin, isPlayer, loggedUserId} = useRole();

  const handleDeleteTournament = () => {
    let response;

    deleteTournament(tournament._id)
    .then((data) => {
      response = data;
      if (response.status === 200) {
        return data.json()
      }
    })
    .then((data) => {
      console.log(data);
      window.location.reload(false);
    })
  }

  return (
      <tr key={tournament._id}>
        <td>{tournament.name}</td>
        <td>{tournament.date.split('T')[0]}</td>
        <td>{tournament.rank}</td>
        <td>
          <ul className="list-actions">
            <li>
              <Link className="list-actions-button-details"
                    to={'tournaments/details/' + tournament._id}>
                {t('buttons.details')}
              </Link>
            </li>
            {isAdmin || (isPlayer && tournament._id === loggedUserId) ? (
                <li>
                  <Link className="list-actions-button-edit"
                        to={'tournaments/edit/' + tournament._id}>
                    {t('buttons.edit')}
                  </Link>
                </li>) : null}
            {isAdmin ? (
                <li>
                  <button className="list-actions-button-delete"
                          onClick={handleDeleteTournament}>
                    {t('buttons.delete')}
                  </button>
                </li>) : null}
          </ul>
        </td>
      </tr>
  )
}

export default TournamentListRow;