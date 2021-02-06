import React, {useEffect, useState} from "react";
import {useParams, useHistory} from 'react-router-dom'
import {useTranslation} from 'react-i18next';

import ContentContainer from "../ContentContainer";
import TextInputWithLabel from "../other/TextInputWithLabel";
import FormButtonsCreate from "../other/FormButtonsCreate";
import FormButtonsEdit from "../other/FormButtonsEdit";
import FormButtonsDetails from "../other/FormButtonsDetails";

import {getPlayerById, addPlayer, updatePlayer} from "../../api/api";
import PlayerParticipations from "./PlayerParticipations";
import {useRole} from "../../hooks/useRole";

const playerFormSchema = {
  _id: -1,
  firstname: "",
  lastname: "",
  email: "",
  licenseNumber: "",
  birthDate: "",
  participations: []
}

const PlayerForm = (props) => {
  const {t} = useTranslation();
  const {playerId} = useParams();
  const {isAdmin, loggedUserId} = useRole();

  const [formValues, setFormValues] = useState(playerFormSchema);
  const [formErrors, setFormErrors] = useState([]);
  const [error, setError] = useState({});
  const [isLoaded, setLoaded] = useState(false);
  const history = useHistory();
  const {isEditable, isCreate} = props;

  const setValue = (valueObject) => {
    setFormValues({...formValues, ...valueObject})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isCreate) {
      handleCreate();
    } else if(isEditable) {
      handleUpdate();
    }
  }

  const handleCreate = () => {
    let response;
    addPlayer(formValues)
    .then((data) => {
      response = data;
      if (response.status === 201) {
        return data.json();
      } else if (response.status === 500) {
        return data.json();
      }
    })
    .then((data) => {
      if (response.status === 500) {
        setFormErrors(data);
      } else if (response.status === 201) {
        history.push("/players")
      }
    })
  }

  const handleUpdate = () => {
    let response;
    updatePlayer(formValues)
    .then((data) => {
      response = data;
      if (response.status === 200) {
        return data.json();
      } else if (response.status === 500) {
        return data.json();
      }
    })
    .then((data) => {
      if (response.status === 500) {
        setFormErrors(data);
      } else if (response.status === 200) {
        history.push("/players")
      }
    })
  }

  const customSetFormValues = (player) => {
    setFormValues({
      _id: player._id,
      firstname: player.firstname,
      lastname: player.lastname,
      email: player.email,
      licenseNumber: player.licenseNumber,
      birthDate: player.birthDate ? player.birthDate.split("T")[0] : "",
      participations: player.participations
    })
  }

  useEffect(() => {
    if (!isCreate) {
      getPlayerById(setLoaded, customSetFormValues, setError, playerId);
    }else{
      setLoaded(true);
    }
  }, [playerId, isCreate]);

  return (
      <ContentContainer contentTitle={t('pageTitles.playerDetails')}>
        <script type="application/javascript" src="/js/validationCommon.js"/>
        <script type="application/javascript"
                src="/js/validationPlayerForm.js"/>
        {isLoaded ? (
            <form
                className={'form ' + (isEditable ? 'form-edit'
                    : 'form-display')}
                noValidate
                method="post"
                onSubmit={handleSubmit}
            >
              <TextInputWithLabel
                  id="firstname"
                  labelText={t('forms.player.firstnameLabel')}
                  type="text"
                  labelClass=""
                  inputClass=''
                  formValues={formValues}
                  setValue={setValue}
                  placeholder={t('forms.placeholders.2_60_chars')}
                  disabled={!isEditable}
                  errorSpan={isEditable}
                  formErrors={formErrors}
              />
              <TextInputWithLabel
                  id="lastname"
                  labelText={t('forms.player.lastnameLabel')}
                  type="text"
                  labelClass=""
                  inputClass=''
                  formValues={formValues}
                  setValue={setValue}
                  resetError={() => ""}
                  placeholder={t('forms.placeholders.2_60_chars')}
                  disabled={!isEditable}
                  errorSpan={isEditable}
                  formErrors={formErrors}
              />
              <TextInputWithLabel
                  id="email"
                  labelText={t('forms.player.emailLabel')}
                  type="email"
                  labelClass=""
                  inputClass=''
                  formValues={formValues}
                  setValue={setValue}
                  resetError={() => ""}
                  placeholder={t('forms.placeholders.email')}
                  disabled={!isEditable}
                  errorSpan={isEditable}
                  formErrors={formErrors}
              />
              <TextInputWithLabel
                  id="licenseNumber"
                  labelText={t('forms.player.licenseNumberLabel')}
                  type="text"
                  labelClass=""
                  inputClass=''
                  formValues={formValues}
                  setValue={setValue}
                  resetError={() => ""}
                  placeholder={t('forms.placeholders.licenseNumber')}
                  disabled={!isEditable}
                  errorSpan={isEditable}
                  formErrors={formErrors}
              />
              <TextInputWithLabel
                  id="birthDate"
                  labelText={t('forms.player.birthDateLabel')}
                  type="date"
                  labelClass=""
                  inputClass=''
                  formValues={formValues}
                  setValue={setValue}
                  resetError={() => ""}
                  disabled={!isEditable}
                  errorSpan={isEditable}
                  formErrors={formErrors}
              />
              <div
                  className={isEditable ? 'form-buttons-edit' : 'form-buttons'}>
                {isCreate ? (
                    <FormButtonsCreate
                        createLabel={t('buttons.addPlayer')}
                        formValid={formErrors.length === 0}
                        cancelUrl={"/players"}
                    />
                ) : isEditable ? (
                    <FormButtonsEdit
                        saveLabel={t('buttons.saveChanges')}
                        formValid={formErrors.length === 0}
                    />
                ) : (
                    <FormButtonsDetails
                        editPath={"/players/edit/" + playerId}
                        editLabel={t('buttons.editPlayer')}
                        elementId={formValues._id}
                        canEdit={isAdmin || loggedUserId === formValues._id}
                    />
                )}
              < /div>
            </form>
        ) : (
            <p>{t("messages.dataLoading")}</p>
        )}
        {!isEditable ? (
            <PlayerParticipations participations={formValues.participations}/>
        ) : null}
      </ContentContainer>
  )
}

export default PlayerForm;