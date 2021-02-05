const sequelize = require('./sequelize');
const authUtil = require('../../util/authUtils');

const Player = require('../../model/sequelize/Player');
const Tournament = require('../../model/sequelize/Tournament');
const Participation = require('../../model/sequelize/Participation');
const {Roles} = require('../../model/sequelize/Roles')

const passHash = authUtil.hashPassword('password');

module.exports = () => {
  Player.hasMany(Participation,
      {
        as: 'participations',
        foreignKey: {name: 'playerId', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
      })
  Participation.belongsTo(Player,
      {as: 'player', foreignKey: {name: 'playerId', allowNull: false}})
  Tournament.hasMany(Participation, {
    as: 'participations',
    foreignKey: {name: 'tournamentId', allowNull: false},
    constraints: true,
    onDelete: 'CASCADE'
  })
  Participation.belongsTo(Tournament,
      {as: 'tournament', foreignKey: {name: 'tournamentId', allowNull: false}})

  let allPlayers, allTournaments;
  return sequelize.sync(
      {force: true}
  )
  .then(() => {
    return Player.findAll();
  })
  .then(players => {
    if (!players || players.length === 0) {
      return Player.bulkCreate([
        {
          firstname: 'Dariusz',
          lastname: 'Kulig',
          email: 'dariusz@kulig.pl',
          licenseNumber: 123456,
          birthDate: new Date(Date.UTC(1990, 10, 10)),
          password: passHash,
          role: Roles.ADMIN
        },
        {
          firstname: 'Piotr',
          lastname: 'Piotrowski',
          email: 'piotr@piotrowski.pl',
          licenseNumber: 654321,
          birthDate: new Date(Date.UTC(1992, 11, 11)),
          password: passHash,
          role: Roles.PLAYER
        },
        {
          firstname: 'Adam',
          lastname: 'Adamowicz',
          email: 'adam@adamowicz.pl',
          licenseNumber: 112233,
          birthDate: new Date(Date.UTC(1988, 8, 8)),
          password: passHash,
          role: Roles.PLAYER
        }
      ])
      .then(() => {
        return Player.findAll();
      })
    } else {
      return players;
    }
  })
  .then(players => {
    allPlayers = players;
    return Tournament.findAll();
  })
  .then(tournaments => {
    if (!tournaments || tournaments.length === 0) {
      return Tournament.bulkCreate([
        {
          name: 'Minionek pazdziernikowy',
          date: new Date(Date.UTC(2020, 0, 1, 9, 0)),
          prizePool: 1000.0,
          rank: 'C'
        },
        {
          name: 'Mistrzostwa wielkopolski',
          date: new Date(Date.UTC(2021, 2, 4, 10, 30)),
          prizePool: 5000.0,
          rank: 'A'
        },
        {
          name: 'Kahuna Tour vol. 2',
          date: new Date(Date.UTC(2021, 4, 9, 13, 0)),
          prizePool: 3000.0,
          rank: 'B+'
        }
      ])
    } else {
      return tournaments;
    }
  })
  .then(tournaments => {
    allTournaments = tournaments;
    return Participation.findAll();
  })
  .then(participations => {
    if (!participations || participations.length === 0) {
      Participation.bulkCreate([
        {
          playerId: allPlayers[0]._id,
          tournamentId: allTournaments[0]._id,
          finalPosition: 1,
          rankPointsGained: 300,
          rankPointsOverall: 1300
        },
        {
          playerId: allPlayers[1]._id,
          tournamentId: allTournaments[0]._id,
          finalPosition: 2,
          rankPointsGained: 200,
          rankPointsOverall: 1000
        },
        {
          playerId: allPlayers[1]._id,
          tournamentId: allTournaments[1]._id,
          finalPosition: 3,
          rankPointsGained: 450,
          rankPointsOverall: 2340
        },
        {
          playerId: allPlayers[2]._id,
          tournamentId: allTournaments[1]._id,
          finalPosition: 4,
          rankPointsGained: 250,
          rankPointsOverall: 930
        }
      ])
    } else {
      return participations
    }
  })

}