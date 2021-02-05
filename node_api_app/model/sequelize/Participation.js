const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Participation = sequelize.define('Participation', {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  finalPosition: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  rankPointsGained: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  rankPointsOverall: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  playerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'notEmpty'
      },
      uniqueParticipation(value, next) {
        Participation.findAll({
          where: {
            playerId: value ?? -1,
            tournamentId: this.tournamentId ?? -1,
          }
        })
        .then(result => {
          if (result.length > 0) {
            return next('unique');
          }
          return next();
        })
        .catch(function (err) {
          return next(err);
        });
      }
    }
  },
  tournamentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'notEmpty'
      },
    }
  }
});

module.exports = Participation;