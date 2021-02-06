const Sequelize = require('sequelize');

const Participation = require('../../model/sequelize/Participation');
const Player = require('../../model/sequelize/Player');
const Tournament = require('../../model/sequelize/Tournament');

exports.getParticipations = () => {
  return Participation.findAll({
    include: [
      {
        model: Player,
        as: 'player'
      },
      {
        model: Tournament,
        as: 'tournament'
      }]
  });
};

exports.getParticipationById = (participationId) => {
  return Participation.findByPk(participationId, {
    include: [
      {
        model: Player,
        as: 'player'
      },
      {
        model: Tournament,
        as: 'tournament'
      }]
  });
};

exports.createParticipation = (data) => {
  const dataCopy = {
    ...data,
    playerId: data.player,
    tournamentId: data.tournament
  };

  dataCopy.finalPosition = data.finalPosition
      ? data.finalPosition
      : null;
  dataCopy.rankPointsGained = data.rankPointsGained
      ? data.rankPointsGained
      : null;
  dataCopy.rankPointsOverall = data.rankPointsOverall
      ? data.rankPointsOverall
      : null;

  return Participation.create(dataCopy);
};

exports.updateParticipation = (participationId, data) => {
  const dataCopy = {
    ...data,
    playerId: data.player,
    tournamentId: data.tournament
  };

  dataCopy.finalPosition = data.finalPosition
      ? data.finalPosition
      : null;
  dataCopy.rankPointsGained = data.rankPointsGained
      ? data.rankPointsGained
      : null;
  dataCopy.rankPointsOverall = data.rankPointsOverall
      ? data.rankPointsOverall
      : null;

  console.log({dataCopy: dataCopy})
  return Participation.update(parseParticipationData(participationId, data),
      {where: {_id: participationId}});
}

const parseParticipationData = (participationId, data) => {
  const dataCopy = {
    ...data, playerId: data.player,
    tournamentId: data.tournament
  };

  dataCopy.finalPosition = data.finalPosition
      ? data.finalPosition
      : null;
  dataCopy.rankPointsGained = data.rankPointsGained
      ? data.rankPointsGained
      : null;
  dataCopy.rankPointsOverall = data.rankPointsOverall
      ? data.rankPointsOverall
      : null;
  return dataCopy;
}

exports.deleteParticipation = (participationId) => {
  return Participation.destroy({
    where: {_id: participationId}
  });
}

exports.deleteManyParticipations = (participationIds) => {
  return Participation.find({_id: {[Sequelize.Op.in]: participationIds}})
}