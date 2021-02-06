import React, {useState, useEffect} from "react";
import {useTranslation} from 'react-i18next';
import TextInputWithLabel from "../other/TextInputWithLabel";
import SelectInputWithLabel from "../other/SelectInputWithLabel";
import FormButtonsCreate from "../other/FormButtonsCreate";
import FormButtonsEdit from "../other/FormButtonsEdit";
import FormButtonsDetails from "../other/FormButtonsDetails";
import ContentContainer from "../ContentContainer";
import {useHistory, useParams} from "react-router-dom";
import {useRole} from "../../hooks/useRole";
import {
  addParticipation,
  getParticipationById,
  updateParticipation,
  getPlayersList,
  getTournamentList
} from "../../api/api";

const participationFormSchema = {
  _id: -1,
  player: {},
  tournament: {},
  finalPosition: '',
  rankPointsGained: '',
  rankPointsOverall: ''
}

const ParticipationForm = (props) => {
  const {t} = useTranslation();
  const {participationId} = useParams();
  const {isAdmin, loggedUserId} = useRole();

  const [formValues, setFormValues] = useState(participationFormSchema);
  const [formErrors, setFormErrors] = useState([]);
  const [error, setError] = useState({});
  const [isLoaded, setLoaded] = useState(false);
  const [players, setPlayers] = useState([]);
  const [tournaments, setTournaments] = useState([])
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
    addParticipation(formValues)
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
        history.push("/participations")
      }
    })
  }

  const handleUpdate = () => {
    let response;
    updateParticipation(formValues)
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
        history.push("/participations")
      }
    })
  }

  const customSetFormValues = (participation) => {
    setFormValues({
      _id: participation._id,
      player: participation.player._id,
      tournament: participation.tournament._id,
      finalPosition: participation.finalPosition,
      rankPointsGained: participation.rankPointsGained,
      rankPointsOverall: participation.rankPointsOverall
    })
  }

  useEffect(() => {
    if (!isCreate) {
      getParticipationById(setLoaded, customSetFormValues, setError,
          participationId);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    getPlayersList(setLoaded, setPlayersList, setError);
    getTournamentList(setLoaded, setTournamentsList, setError);
  }, [formValues])

  const setPlayersList = (data) => {
    const playersList = [];
    data.forEach(player => {
      playersList.push({
        key: player._id,
        value: player.firstname + ' ' + player.lastname,
        selected: player._id === formValues.player
      })
    })
    setPlayers(playersList);
  }

  const setTournamentsList = (data) => {
    const tournamentsList = [];
    data.forEach(tournament => {
      tournamentsList.push({
        key: tournament._id,
        value: tournament.name,
        selected: tournament._id === formValues.tournament
      })
    })
    setTournaments(tournamentsList);
  }

  return (
      <ContentContainer contentTitle={t('pageTitles.participationDetails')}>
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
              <SelectInputWithLabel
                  id="player"
                  options={players}
                  labelText={t('forms.participation.playerLabel')}
                  labelClass=""
                  inputClass=""
                  formValues={formValues}
                  setValue={setValue}
                  disabled={!isEditable}
                  errorSpan={isEditable}
                  formErrors={formErrors}
                  isCreate={isCreate}
              />
              <SelectInputWithLabel
                  id="tournament"
                  options={tournaments}
                  labelText={t('forms.participation.tournamentLabel')}
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
                  id="finalPosition"
                  labelText={t('forms.participation.finalPositionLabel')}
                  type="number"
                  step={"1"}
                  labelClass=""
                  inputClass=''
                  formValues={formValues}
                  setValue={setValue}
                  placeholder={t('forms.placeholders.finalPosition')}
                  disabled={!isEditable}
                  errorSpan={isEditable}
                  formErrors={formErrors}
              />
              <TextInputWithLabel
                  id="rankPointsGained"
                  labelText={t('forms.participation.pointsGainedLabel')}
                  type="number"
                  step={"1"}
                  labelClass=""
                  inputClass=''
                  formValues={formValues}
                  setValue={setValue}
                  placeholder={t('forms.placeholders.numberOfPoints')}
                  disabled={!isEditable}
                  errorSpan={isEditable}
                  formErrors={formErrors}
              />
              <TextInputWithLabel
                  id="rankPointsOverall"
                  labelText={t('forms.participation.pointsOverallLabel')}
                  type="number"
                  step={"1"}
                  labelClass=""
                  inputClass=''
                  formValues={formValues}
                  setValue={setValue}
                  placeholder={t('forms.placeholders.numberOfPoints')}
                  disabled={!isEditable}
                  errorSpan={isEditable}
                  formErrors={formErrors}
              />
              <div
                  className={isEditable ? 'form-buttons-edit' : 'form-buttons'}>
                {isCreate ? (
                    <FormButtonsCreate
                        createLabel={t('buttons.addParticipation')}
                        formValid={formErrors.length === 0}
                        cancelUrl={"/participations"}
                    />
                ) : isEditable ? (
                    <FormButtonsEdit
                        saveLabel={t('buttons.saveChanges')}
                        formValid={formErrors.length === 0}
                    />
                ) : (
                    <FormButtonsDetails
                        editPath={"/participations/edit/" + participationId}
                        editLabel={t('buttons.editParticipation')}
                        elementId={formValues._id}
                        canEdit={isAdmin || loggedUserId === formValues._id}
                    />
                )}
              < /div>
            </form>
        ) : (
            <p>{t("messages.dataLoading")}</p>
        )}
      </ContentContainer>
  )
}

export default ParticipationForm;