const TournamentRepository = require('../repository/sequelize/TournamentRepository');

exports.getTournaments = (req, res, next) => {
  TournamentRepository.getTournaments()
  .then(tournaments => {
    res.status(200).json(tournaments);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getTournamentById = (req, res, next) => {
  const tournamentId = req.params.tournamentId;
  TournamentRepository.getTournamentById(tournamentId)
  .then(tournament => {
    if (!tournament) {
      res.status(404).json({
        message: 'Tournament with id: ' + tournamentId + ' not found'
      })
    } else {
      res.status(200).json(tournament);
    }
  });
};

exports.createTournament = (req, res, next) => {
  TournamentRepository.createTournament(req.body)
  .then(newObj => {
    res.status(201).json(newObj);
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.updateTournament = (req, res, next) => {
  const tournamentId = req.params.tournamentId;
  TournamentRepository.updateTournament(tournamentId, req.body)
  .then(result => {
    res.status(200).json({message: 'Tournament updated!', tournament: result});
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });

};

exports.deleteTournament = (req, res, next) => {
  const tournamentId = req.params.tournamentId;
  TournamentRepository.deleteTournament(tournamentId)
  .then(result => {
    res.status(200).json({message: 'Removed tournament', tournament: result});
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};