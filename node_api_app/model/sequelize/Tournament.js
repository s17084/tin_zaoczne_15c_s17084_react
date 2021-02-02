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
        msg: 'Field is required'
      }
    }
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Field is required'
      },
      isAfter: {
        args: [new Date().toISOString().split("T")[0]],
        msg: 'Must be future date'
      }
    }
  },
  prizePool: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Field is required'
      },
      isMinimumPrize(value){
        if(this.rank !== ''){
          const minPrize = AVAILABLE_RANKS[this.rank]
          if(value < minPrize) {
            throw new Error('Must be at least ' + minPrize + ' PLN')
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
        msg: 'Must be valid rank: ' + Object.keys(AVAILABLE_RANKS)
      },
      notEmpty: {
        msg: 'Must be valid rank: ' + Object.keys(AVAILABLE_RANKS)
      },
      isCorrectRank(value) {
        if(!Object.keys(AVAILABLE_RANKS).includes(value)){
          throw new Error('Must be valid rank: ' + Object.keys(AVAILABLE_RANKS))
        }
      }
    }
  },
});

module.exports = Tournament;