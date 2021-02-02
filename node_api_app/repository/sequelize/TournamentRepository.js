const Tournament = require("../../model/sequelize/Tournament");
const Participation = require("../../model/sequelize/Participation");
const Player = require("../../model/sequelize/Player");

exports.getTournaments = () => {
  return Tournament.findAll();
};

exports.getTournamentById = (tournamentId) => {
  return Tournament.findByPk(tournamentId,
      {
        include: [{
          model: Participation,
          as: 'participations',
          include: [{
            model: Player,
            as: 'player'
          }]
        }]
      });
};

exports.createTournament = (data) => {
  return Tournament.create(data);
};

exports.updateTournament = (tournamentId, data) => {
  return Tournament.update(data, {where: {_id: tournamentId}});
};

exports.deleteTournament = (tournamentId) => {
  return Tournament.destroy({
    where: {_id: tournamentId}
  });

};