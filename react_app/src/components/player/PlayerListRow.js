import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from 'react-i18next';

const PlayerListRow = (props) => {
  const {t} = useTranslation();
  const {player} = props;
  return (
      <tr key={player._id}>
        <td>{player.firstname}</td>
        <td>{player.lastname}</td>
        <td>{player.licenseNumber}</td>
        <td>
          <ul className="list-actions">
            <li>
              <Link className="list-actions-button-details"
                    to={`players/details/${player._id}`}>
                {t('buttons.details')}
              </Link>
            </li>
            <li>
              <Link className="list-actions-button-edit"
                    to={`players/edit/${player._id}`}>
                {t('buttons.edit')}
              </Link>
            </li>
            <li>
              <Link className="list-actions-button-delete"
                    to={`players/delete/${player._id}`}>
                {t('buttons.delete')}
              </Link>
            </li>
          </ul>
        </td>
      </tr>
  )
}

export default PlayerListRow;