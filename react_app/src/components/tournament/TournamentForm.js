import React, {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next';
import TextInputWithLabel from "../other/TextInputWithLabel";
import FormButtonsCreate from "../other/FormButtonsCreate";
import FormButtonsEdit from "../other/FormButtonsEdit";
import FormButtonsDetails from "../other/FormButtonsDetails";
import ContentContainer from "../ContentContainer";
import {useHistory, useParams} from "react-router-dom";
import TournamentParticipations from "./TournamentParticipations";
import SelectInputWithLabel from "../other/SelectInputWithLabel";
import {
  addTournament,
  updateTournament,
  getTournamentById
} from "../../api/api";
import {useRole} from "../../hooks/useRole";

const tournamentFormSchema = {
  _id: -1,
  name: '',
  date: '',
  prizePool: '',
  rank: '',
  participations: []
}

const TournamentForm = (props) => {
  const {t} = useTranslation();
  const {tournamentId} = useParams();
  const {isAdmin, loggedUserId} = useRole();

  const [formValues, setFormValues] = useState(tournamentFormSchema);
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
    addTournament(formValues)
    .then((data) => {
      response = data;
      if (response.status === 201 || response.status === 500) {
        return data.json();
      }
    })
    .then((data) => {
      if (response.status === 500) {
        setFormErrors(data);
      } else if (response.status === 201) {
        history.push("/tournaments")
      }
    })
  }

  const handleUpdate = () => {
    let response;
    updateTournament(formValues)
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
        history.push("/tournaments")
      }
    })
  }

  const customSetFormValues = (tournament) => {
    setFormValues({
      _id: tournament._id,
      name: tournament.name,
      date: tournament.date.split('T')[0],
      prizePool: tournament.prizePool,
      rank: tournament.rank,
      participations: tournament.participations
    })
  }

  useEffect(() => {
    if (!isCreate) {
      getTournamentById(setLoaded, customSetFormValues, setError, tournamentId);
    } else {
      setLoaded(true);
    }
  }, [tournamentId, isCreate]);

  return (
      <ContentContainer contentTitle={t('pageTitles.tournamentDetails')}>
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
                  id="name"
                  labelText={t('forms.tournament.nameLabel')}
                  type="text"
                  labelClass=""
                  inputClass=''
                  formValues={formValues}
                  setValue={setValue}
                  placeholder={t('forms.placeholders.5_60_chars')}
                  disabled={!isEditable}
                  errorSpan={isEditable}
                  formErrors={formErrors}
              />
              <TextInputWithLabel
                  id="date"
                  labelText={t('forms.tournament.dateLabel')}
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
              <SelectInputWithLabel
                  id="rank"
                  options={[
                    {
                      key: "A",
                      value: "A",
                      selected: formValues.rank === "A"
                    }, {
                      key: "B+",
                      value: "B+",
                      selected: formValues.rank === "B+"
                    },
                    {
                      key: "C",
                      value: "C",
                      selected: formValues.rank === "C"
                    }
                  ]}
                  labelText={t('forms.tournament.rankLabel')}
                  labelClass=""
                  inputClass=""
                  formValues={formValues}
                  setValue={setValue}
                  disabled={!isEditable}
                  errorSpan={isEditable}
                  formErrors={formErrors}
                  isCreate={isCreate}
              />
              <TextInputWithLabel
                  id="prizePool"
                  labelText={t('forms.tournament.prizePoolLabel')}
                  type="number"
                  step="0.01"
                  labelClass=""
                  inputClass=''
                  formValues={formValues}
                  setValue={setValue}
                  placeholder={t('forms.placeholders.prizePool')}
                  resetError={() => ""}
                  disabled={!isEditable}
                  errorSpan={isEditable}
                  formErrors={formErrors}
              />
              <div
                  className={isEditable ? 'form-buttons-edit' : 'form-buttons'}>
                {isCreate ? (
                    <FormButtonsCreate
                        createLabel={t('buttons.addTournament')}
                        formValid={formErrors.length === 0}
                        cancelUrl={"/tournaments"}
                    />
                ) : isEditable ? (
                    <FormButtonsEdit
                        saveLabel={t('buttons.saveChanges')}
                        formValid={formErrors.length === 0}
                    />
                ) : (
                    <FormButtonsDetails
                        editPath={"/tournaments/edit/" + tournamentId}
                        editLabel={t('buttons.editTournament')}
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
            <TournamentParticipations
                participations={formValues.participations}/>
        ) : null}
      </ContentContainer>
  )
}

export default TournamentForm;