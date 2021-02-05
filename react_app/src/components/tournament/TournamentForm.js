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
  // addTournament,
  // updateTournament,
  getTournamentById
} from "../../api/api";

const tournamentFormSchema = {
  _id: -1,
  name: '',
  date: '',
  prizePool: null,
  rank: null,
  participations: []
}

const TournamentForm = (props) => {
  const {t} = useTranslation();
  const {tournamentId} = useParams();

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
    } else {
      handleUpdate();
    }
  }

  const handleCreate = () => {
    let response;
    // addTournament(formValues)
    // .then((data) => {
    //   response = data;
    //   if (response.status === 201) {
    //     console.log('PLAYER_CREATED');
    //     return data.json();
    //   } else if (response.status === 500) {
    //     console.log('PLAYER_CREATE_ERROR_500');
    //     return data.json();
    //   }
    // })
    // .then((data) => {
    //   if (response.status === 500) {
    //     setFormErrors(data);
    //   } else if (response.status === 201) {
    //     history.push("/players")
    //   }
    // })
  }

  const handleUpdate = () => {
    let response;
    // updateTournament(formValues)
    // .then((data) => {
    //   response = data;
    //   if (response.status === 200) {
    //     console.log('PLAYER_CREATED');
    //     return data.json();
    //   } else if (response.status === 500) {
    //     console.log('PLAYER_CREATE_ERROR_500');
    //     return data.json();
    //   }
    // })
    // .then((data) => {
    //   if (response.status === 500) {
    //     setFormErrors(data);
    //   } else if (response.status === 200) {
    //     history.push("/players")
    //   }
    // })
  }

  const customSetFormValues = (tournament) => {
    console.log(tournament)
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
                  id={"RANK"}
                  options={["A", "B+", "C"]}
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
                  labelText={t('forms.tournament.dateLabel')}
                  type="number"
                  step="0.01"
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