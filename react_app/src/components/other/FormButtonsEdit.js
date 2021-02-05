import React from 'react';
import {useHistory} from "react-router-dom";
import {useTranslation} from 'react-i18next';

const FormButtonsEdit = (props) => {
  const {t} = useTranslation();
  const {saveLabel, formValid} = props;
  const history = useHistory();
  return (
      <>
        <p id="errorsSummary" className="errors-text">
          {!formValid ? t('validationErrors.invalidForm') : ''}
        </p>
        <p>
          <input className="form-button-submit" type="submit"
                 value={saveLabel}/>
          <button className="form-button-cancel"
                  onClick={() => history.goBack()}>
            {t('buttons.cancel')}
          </button>
        </p>
      </>
  )
}

export default FormButtonsEdit;