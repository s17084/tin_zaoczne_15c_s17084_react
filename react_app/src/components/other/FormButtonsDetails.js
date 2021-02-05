import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {useTranslation} from 'react-i18next';

const FormButtonsDetails = (props) => {
  const {t} = useTranslation();
  const {editPath, editLabel, elementId, canEdit} = props;
  const history = useHistory();

  return (
      <>
        <p>
          {canEdit ? (
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