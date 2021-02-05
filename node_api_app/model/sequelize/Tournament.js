const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const AVAILABLE_RANKS = { A: 1500, "B+": 500, C: 100 };

const Tournament = sequelize.define('Tournament', {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'notEmpty'
      }
    }
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'notEmpty'
      },
      isAfter: {
        args: [new Date().toISOString().split("T")[0]],
        msg: 'futureDate'
      }
    }
  },
  prizePool: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'notEmpty'
      },
      isMinimumPrize(value){
        if(this.rank !== ''){
          const minPrize = AVAILABLE_RANKS[this.rank]
          if(value < minPrize) {
            throw new Error('minPrize')
          }
        }
      }
    }
  },
  rank: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'notEmpty'
      },
      notEmpty: {
        msg: 'notEmpty'
      },
      isCorrectRank(value) {
        if(!Object.keys(AVAILABLE_RANKS).includes(value)){
          throw new Error('validRank')
        }
      }
    }
  },
});

module.exports = Tournament;