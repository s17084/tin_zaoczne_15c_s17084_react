const Player = require("../../model/sequelize/Player");
const Participation = require("../../model/sequelize/Participation");
const Tournament = require("../../model/sequelize/Tournament");
const authUtil = require('../../util/authUtils')
const {Roles} = require('../../model/sequelize/Roles')

exports.getPlayers = () => {
  return Player.findAll();
};

exports.getPlayerById = (playerId) => {
  return Player.findByPk(playerId,
      {
        include: [{
          model: Participation,
          as: 'participations',
          include: [{
            model: Tournament,
            as: 'tournament'
          }]
        }]
      });
};

exports.createPlayer = (data) => {
  const passHash = authUtil.hashPassword('password');
  const dataCopy = {
    ...data,
    password: passHash,
    role: Roles.PLAYER
  };
  if (data.birthDate === '') {
    dataCopy.birthDate = null;
  }
  if (data.email === '') {
    dataCopy.email = null;
  }
  return Player.create(dataCopy);
};

exports.updatePlayer = (playerId, data) => {
  const dataCopy = {...data};
  if (data.birthDate === '') {
    dataCopy.birthDate = null;
  }
  if (data.email === '') {
    dataCopy.email = null;
  }
  return Player.update(dataCopy, {where: {_id: playerId}});
};

exports.deletePlayer = (playerId) => {
  return Player.destroy({
    where: {_id: playerId}
  });
};

exports.findByEmail = (email) => {
  return Player.findOne({
    where: {email: email}
  });
}