const validator = require('validator');
const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Player = sequelize.define('Player', {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'notEmpty'
      },
      len: {
        args: [2, 60],
        msg: '2_60_chars'
      },
    }
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'notEmpty'
      },
      len: {
        args: [2, 60],
        msg: '2_60_chars'
      },
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true,
    validate: {
      isEmailOrEmpty(value) {
        console.log(value !== '');
        if (value !== '' && value !== null && !validator.isEmail(value)) {
          console.log('in if!')
          throw new Error('validEmail');
        }
      }
    }
  },
  licenseNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'notEmpty'
      },
      is: {
        args: [/\d{6}/],
        msg: '6_Digits'
      }
    }
  },
  birthDate: {
    type: Sequelize.DATE,
    allowNull: true,
    validate: {
      isBefore: {
        args: [new Date(new Date().setUTCFullYear(
            new Date().getUTCFullYear() - 16)).toISOString().split('T')[0]],
        msg: 'mustBe_16_YearsOld'
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'notEmpty'
      }
    }
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'notEmpty'
      }
    }
  }
});

module.exports = Player;