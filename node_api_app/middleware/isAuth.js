const jwt = require('jsonwebtoken')
const config = require("../config/auth/key")
const {Roles} = require('../model/sequelize/Roles')

exports.isAuth = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.sendStatus(401)
  }
  jwt.verify(token, config.secret, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }
    req.user = user
  })
  if (res.statusCode !== 401 && res.statusCode !== 403) {
    next()
  }
}

exports.isAdmin = (req, res, next) => {
  console.log('CHECKING_ADMIN')
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null || jwt.decode(token).role !== Roles.ADMIN) {
    return res.sendStatus(401)
  }
  jwt.verify(token, config.secret, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }
    req.user = user
  })
  if (res.statusCode !== 401 && res.statusCode !== 403) {
    next()
  }
}

exports.isAdminOrPlayer = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  const role = jwt.decode(token).role;
  if (token == null || (role !== Roles.PLAYER && role !== Roles.ADMIN)) {
    return res.sendStatus(401)
  }
  jwt.verify(token, config.secret, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }
    req.user = user
  })
  if (res.statusCode !== 401 && res.statusCode !== 403) {
    next()
  }
}

exports.isPlayer = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null || jwt.decode(token).role !== Roles.PLAYER) {
    return res.sendStatus(401)
  }
  jwt.verify(token, config.secret, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }
    req.user = user
  })
  if (res.statusCode !== 401 && res.statusCode !== 403) {
    next()
  }
}

