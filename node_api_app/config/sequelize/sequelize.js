const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-s17084', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;