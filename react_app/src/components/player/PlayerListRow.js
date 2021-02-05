import React from "react";
import {Link, useHistory} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import {deletePlayer} from '../../api/api'
import {useRole} from "../../hooks/useRole";

const PlayerListRow = (props) => {
  const {t} = useTranslation();
  const {player} = props;
  const {isAdmin, isPlayer, loggedUserId} = useRole();

  const handleDeletePlayer = () => {
    let response;

    deletePlayer(player._id)
    .then((data) => {
      response = data;
      if (response.status === 200) {
        return data.json()
      }
    })
    .then((data) => {
      window.location.reload(false);
    })
  }

  return (
      <tr key={player._id}>
        <td>{player.firstname}</td>
        <td>{player.lastname}</td>
        <td>{player.licenseNumber}</td>
        <td>
          <ul className="list-actions">
            <li>
              <Link className="list-actions-button-details"
                    to={'players/details/' + player._id}>
                {t('buttons.details')}
              </Link>
            </li>
            {isAdmin || (isPlayer && player._id === loggedUserId) ? (
                <li>
                  <Link className="list-actions-button-edit"
                        to={'players/edit/' + player._id}>
                    {t('buttons.edit')}
                  </Link>
                </li>) : null}
            {isAdmin ? (
                <li>
                  <button className="list-actions-button-delete"
                          onClick={handleDeletePlayer}>
                    {t('buttons.delete')}
                  </button>
                </li>) : null}
          </ul>
        </td>
      </tr>
  )
}

export default PlayerListRow;