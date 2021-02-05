import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import {useRole} from "../../hooks/useRole";

const FormButtonsDetails = (props) => {
  const {t} = useTranslation();
  const {isAdmin, isPlayer, loggedUserId} = useRole();
  const {editPath, editLabel, elementId} = props;
  const history = useHistory();

  return (
      <>
        <p>
          {isAdmin || loggedUserId === elementId ? (
              <Link className="form-button-edit"
                    to={{
                      pathname: editPath,
                      state: {isEditable: true}
                    }}
              >
                {editLabel}
              </Link>
          ) : null}
          <button className="form-button-go-back" onClick={history.goBack}>
            {t('buttons.goBack')}
          </button>
        </p>
        <input type="hidden" name="_id" value={elementId}/>
      </>
  )
}

export default FormButtonsDetails;