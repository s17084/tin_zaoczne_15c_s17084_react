import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useRole} from "../../hooks/useRole";
import {deleteParticipation} from "../../api/api";

const ParticipationTableRow = (props) => {
  const {t} = useTranslation();
  const {participation} = props;
  const {isAdmin, isPlayer, loggedUserId} = useRole();

  const handleDeleteParticipation = () => {
    let response;

    deleteParticipation(participation._id)
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
      <tr key={participation._id}>
        <td>{participation.player.firstname + ' ' + participation.player.lastname}</td>
        <td>{participation.tournament.name}</td>
        <td className='centered-cell'>{participation.finalPosition}</td>
        <td>
          <ul className="list-actions">
            <li>
              <Link className="list-actions-button-details"
                    to={'participations/details/' + participation._id}>
                {t('buttons.details')}
              </Link>
            </li>
            {isAdmin ? (
                <li>
                  <Link className="list-actions-button-edit"
                        to={'participations/edit/' + participation._id}>
                    {t('buttons.edit')}
                  </Link>
                </li>) : null}
            {isAdmin ? (
                <li>
                  <button className="list-actions-button-delete"
                          onClick={handleDeleteParticipation}>
                    {t('buttons.delete')}
                  </button>
                </li>) : null}
          </ul>
        </td>
      </tr>
  )
}

export default ParticipationTableRow;