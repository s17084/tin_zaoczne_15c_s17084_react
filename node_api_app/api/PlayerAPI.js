const PlayerRepository = require('../repository/sequelize/PlayerRepository');

exports.getPlayers = (req, res, next) => {
  PlayerRepository.getPlayers()
  .then(players => {
    res.status(200).json(players);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getPlayerById = (req, res, next) => {
  const playerId = req.params.playerId;
  PlayerRepository.getPlayerById(playerId)
  .then(player => {
    if (!player) {
      res.status(404).json({
        message: 'Player with id: ' + playerId + ' not found'
      })
    } else {
      res.status(200).json(player);
    }
  });
};

manageErrors = (err) => {
  err.errors.forEach(e => {
    if(e.type === 'notNull Violation'){
      e.message = 'notNull'
    }
    if (e.type === 'unique violation') {
      e.message = "unique";
    }
  });
}

exports.createPlayer = (req, res, next) => {
  console.log('CREATING_PLAYER')
  PlayerRepository.createPlayer(req.body)
  .then(newObj => {
    res.status(201).json(newObj);
  })
  .catch(err => {
    manageErrors(err)
    res.status(500).json(err.errors)
  });
};

exports.updatePlayer = (req, res, next) => {
  const playerId = req.params.playerId;
  PlayerRepository.updatePlayer(playerId, req.body)
  .then(result => {
    res.status(200).json({message: 'Player updated!', player: result});
  })
  .catch(err => {
    manageErrors(err)
    res.status(500).json(err.errors)
  });
};

exports.deletePlayer = (req, res, next) => {
  const playerId = req.params.playerId;
  PlayerRepository.deletePlayer(playerId)
  .then(result => {
    res.status(200).json({message: 'Removed player', player: result});
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};