import React from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from 'react-i18next';

const FormButtonsCreate = (props) => {
  const {t} = useTranslation();
  const {createLabel, formValid, cancelUrl} = props;
  return (
      <>
        <p id="errorsSummary" className="errors-text">
          {!formValid ? t('validationErrors.invalidForm') : ''}
        </p>
        <p>
          <input className="form-button-submit" type="submit"
                 value={createLabel}/>
          <Link className="form-button-cancel"
                to={cancelUrl}>
            {t('buttons.cancel')}
          </Link>
        </p>
      </>
  )
}

export default FormButtonsCreate;