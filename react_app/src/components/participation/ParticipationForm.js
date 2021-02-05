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
  finalPosition: null,
  rankPointsGained: null,
  rankPointsOverall: null
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
    } else {
      handleUpdate();
    }
  }

  const handleCreate = () => {
    let response;
    addParticipation(formValues)
    .then((data) => {
      response = data;
      console.log(data)
      if (response.status === 201 || response.status === 500) {
        return data.json();
      }
    })
    .then((data) => {
      console.log(data)
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
    console.log(participation)
    setFormValues({
      _id: participation._id,
      player: participation.player,
      participation: participation.tournament,
      finalPosition: participation.finalPosition,
      rankPointsGained: participation.rankPointsGained,
      rankPointsOverall: participation.rankPointsOverall
    })
  }

  useEffect(() => {
    if (!isCreate) {
      getParticipationById(setLoaded, customSetFormValues, setError,
          participationId);
    } else {
      setLoaded(true);
    }
  }, [participationId, isCreate]);

  useEffect(() => {
    getPlayersList(setLoaded, playersList, setError);
    getTournamentList(setLoaded, setTournaments, setError);
    console.log("USE EFFECT")
  }, [])

  const playersList = (data) => {
    console.log()
    console.log('SET PLAYER LIST')
    const playersList = [];
    console.log(formValues)
    data.forEach(player => {
      console.log(player._id, formValues.player._id)
      console.log(player.lastname, player._id === formValues.player._id)
      playersList.push({
        key: player._id,
        value: player.firstname + ' ' + player.lastname,
        selected: player._id === formValues.player._id
      })
    })
    console.log(playersList)
    setPlayers(playersList);
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
                  options={() => playersList(players)}
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
                  options={[]}
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