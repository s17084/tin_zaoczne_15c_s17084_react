var validator = require('validator');
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
        msg: "Field is required"
      },
      len: {
        args: [2, 60],
        msg: "Field must contain 2-60 characters"
      },
    }
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Field is required"
      },
      len: {
        args: [2, 60],
        msg: "Field must contain 2-60 characters"
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
          throw new Error('Must be valid e-mail address');
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
        msg: "Field is required"
      },
      is: {
        args: [/\d{6}/],
        msg: "Must contain 6 digits"
      }
    }
  },
  birthDate: {
    type: Sequelize.DATE,
    allowNull: true,
    validate: {
      isBefore: {
        args: [new Date(new Date().setUTCFullYear(
            new Date().getUTCFullYear() - 16)).toISOString().split("T")[0]],
        msg: 'Must be at least 16 years old'
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Player;