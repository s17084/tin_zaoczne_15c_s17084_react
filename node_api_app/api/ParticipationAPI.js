const ParticipationRepository = require('../repository/sequelize/ParticipationRepository');

exports.getParticipations = (req, res, next) => {
  ParticipationRepository.getParticipations()
  .then(participations => {
    res.status(200).json(participations);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getParticipationById = (req, res, next) => {
  const participationId = req.params.participationId;
  ParticipationRepository.getParticipationById(participationId)
  .then(participation => {
    if (!participation) {
      res.status(404).json({
        message: 'Participation with id: ' + participationId + ' not found'
      })
    } else {
      res.status(200).json(participation);
    }
  });
};

exports.createParticipation = (req, res, next) => {
  ParticipationRepository.createParticipation(req.body)
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

exports.updateParticipation = (req, res, next) => {
  const participationId = req.params.participationId;
  ParticipationRepository.updateParticipation(participationId, req.body)
  .then(result => {
    res.status(200).json({message: 'Participation updated!', participation: result});
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.deleteParticipation = (req, res, next) => {
  const participationId = req.params.participationId;
  ParticipationRepository.deleteParticipation(participationId)
  .then(result => {
    res.status(200).json({message: 'Removed participation', participation: result});
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};