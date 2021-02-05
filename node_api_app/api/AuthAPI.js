const PlayerRepository = require('../repository/sequelize/PlayerRepository');
const authUtil = require('../util/authUtils');
const jwt = require('jsonwebtoken')
const config = require("../config/auth/key")

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  PlayerRepository.findByEmail(email)
  .then(player => {
    if (!player) {
      return res.status(401).send({message: "wrongCredentials"})
    }

    authUtil.comparePasswords(password, player.password)
    .then(isEqual => {
      if (!isEqual) {
        return res.status(401).send({message: "wrongCredentials"})
      }
      const token = jwt.sign(
          {
            email: player.email,
            userId: player._id,
            firstname: player.firstname,
            lastname: player.lastname,
            role: player.role
          },
          config.secret,
          {expiresIn: '1h'}
      )
      res.status(200).json({
        token: token,
        userId: player._id,
        firstname: player.firstname,
        lastname: player.lastname,
        email: player.email
      })
    })
    .catch(err => {
      console.log(err)
      res.status(501)
    })
  })
}