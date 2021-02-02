const ParticipationRepository = require(
    '../repository/sequelize/ParticipationRepository');
const PlayerRepository = require('../repository/sequelize/PlayerRepository');
const TournamentRepository = require(
    '../repository/sequelize/TournamentRepository');
const formHelper = require('../public/js/formHelperFunctions');

exports.addParticipation = (req, res, next) => {
  ParticipationRepository.createParticipation(req.body)
  .then(newObj => {
    res.redirect(303, '/participations/details/' + newObj._id)
  })
  .catch(err => {
    let allPlayers, allTournaments;
    PlayerRepository.getPlayers()
    .then(players => {
      allPlayers = players;
      return TournamentRepository.getTournaments();
    })
    .then(tournaments => {
      allTournaments = tournaments
    })
    .then(() => {
      res.render('pages/participations/participations-form',
          {
            body: req.body,
            participation: {},
            players: allPlayers,
            tournaments: allTournaments,
            pageTitle: 'Add player to tournament',
            formMode: 'create',
            actionBtnLabel: 'Add participation',
            cancelBtnLabel: 'Cancel',
            formAction: '/participations/add/',
            navLocation: 'participation',
            validationErrors: err.errors,
            helper: formHelper
          });
    });
  });
}

exports.editParticipation = (req, res, next) => {
  ParticipationRepository.updateParticipation(req.params.participationId,
      req.body)
  .then(() => {
    res.redirect(303, '/participations/details/' + req.params.participationId)
  })
  .catch(err => {
    console.log(err)
    let allPlayers, allTournaments;
    PlayerRepository.getPlayers()
    .then(players => {
      allPlayers = players;
      return TournamentRepository.getTournaments();
    })
    .then(tournaments => {
      allTournaments = tournaments
    })
    .then(() => {
      ParticipationRepository.getParticipationById(req.params.participationId)
      .then(participation => {
        res.render('pages/participations/participations-form',
            {
              body: req.body,
              participation: participation,
              players: allPlayers,
              tournaments: allTournaments,
              pageTitle: 'Edit participation',
              formMode: 'edit',
              actionBtnLabel: 'Save changes',
              cancelBtnLabel: 'Cancel',
              formAction: '/participations/edit/' + req.params.participationId,
              navLocation: 'participation',
              validationErrors: err.errors,
              helper: formHelper
            });
      });
    });
  });
}

exports.deleteParticipation = (req, res, next) => {
  ParticipationRepository.deleteParticipation(req.params.participationId)
  .then(() => {
    res.redirect('/participations')
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}

exports.showParticipationList = (req, res, next) => {
  ParticipationRepository.getParticipations()
  .then(participations => {
    res.render('pages/participations/participations-list',
        {
          participations: participations,
          navLocation: 'participation'
        });
  });
}

exports.showAddParticipationForm = (req, res, next) => {
  let allPlayers, allTournaments;
  PlayerRepository.getPlayers()
  .then(players => {
    allPlayers = players;
    return TournamentRepository.getTournaments();
  })
  .then(tournaments => {
    allTournaments = tournaments
  })
  .then(() => {
    res.render('pages/participations/participations-form',
        {
          body: {},
          participation: {},
          players: allPlayers,
          tournaments: allTournaments,
          pageTitle: 'Add player to tournament',
          formMode: 'create',
          actionBtnLabel: 'Add participation',
          cancelBtnLabel: 'Cancel',
          formAction: '/participations/add/',
          navLocation: 'participation',
          validationErrors: [],
          helper: formHelper
        });
  });
}

exports.showEditParticipationForm = (req, res, next) => {
  let allPlayers, allTournaments;
  PlayerRepository.getPlayers()
  .then(players => {
    allPlayers = players;
    return TournamentRepository.getTournaments();
  })
  .then(tournaments => {
    allTournaments = tournaments
  })
  .then(() => {
    ParticipationRepository.getParticipationById(req.params.participationId)
    .then(participation => {
      res.render('pages/participations/participations-form',
          {
            body: {},
            participation: participation,
            players: allPlayers,
            tournaments: allTournaments,
            pageTitle: 'Edit participation',
            formMode: 'edit',
            actionBtnLabel: 'Save changes',
            cancelBtnLabel: 'Cancel',
            formAction: '/participations/edit/' + req.params.participationId,
            navLocation: 'participation',
            validationErrors: [],
            helper: formHelper
          });
    });
  });
}

exports.showParticipationDetails = (req, res, next) => {
  let allPlayers, allTournaments;
  PlayerRepository.getPlayers()
  .then(players => {
    allPlayers = players;
    return TournamentRepository.getTournaments();
  })
  .then(tournaments => {
    allTournaments = tournaments
  })
  .then(() => {
    ParticipationRepository.getParticipationById(req.params.participationId)
    .then(participation => {
      res.render('pages/participations/participations-form',
          {
            body: {},
            participation: participation,
            players: allPlayers,
            tournaments: allTournaments,
            pageTitle: 'Show participation details',
            formMode: 'details',
            actionBtnLabel: 'Edit participation',
            cancelBtnLabel: 'Go back',
            formAction: '/participations/edit/' + req.params.participationId,
            navLocation: 'participation',
            validationErrors: [],
            helper: formHelper
          });
    });
  });
}
