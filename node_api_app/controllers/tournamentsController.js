const TournamentRepository = require(
    '../repository/sequelize/TournamentRepository')
const formHelper = require('../public/js/formHelperFunctions');

exports.addTournament = (req, res, next) => {
  TournamentRepository.createTournament(req.body)
  .then(newObj => {
    res.redirect(303, '/tournaments/details/' + newObj._id)
  })
  .catch(err => {
    err.errors.forEach(e => {
      if (e.path.includes('name') && e.type === 'unique violation') {
        e.message = "Such name already exists";
      }
    });
    res.render('pages/tournaments/tournaments-form',
        {
          body: req.body,
          tournament: {},
          pageTitle: 'Add tournament',
          formMode: 'create',
          actionBtnLabel: 'Add tournament',
          cancelBtnLabel: 'Cancel',
          formAction: '/tournaments/add',
          navLocation: 'tournament',
          validationErrors: err.errors,
          helper: formHelper
        });
  });
}

exports.updateTournament = (req, res, next) => {
  TournamentRepository.updateTournament(req.params.tournamentId, req.body)
  .then(() => {
    res.redirect(303, '/tournaments/details/' + req.params.tournamentId)
  })
  .catch(err => {
    TournamentRepository.getTournamentById(req.params.tournamentId)
    .then(tournament => {
      res.render('pages/tournaments/tournaments-form',
          {
            body: req.body,
            tournament: tournament,
            pageTitle: 'Edit tournament',
            formMode: 'edit',
            actionBtnLabel: 'Save changes',
            cancelBtnLabel: 'Cancel',
            formAction: '/tournaments/edit/' + req.params.tournamentId,
            navLocation: 'tournament',
            validationErrors: err.errors,
            helper: formHelper
          });
    });
  });
}

exports.deleteTournament = (req, res, next) => {
  TournamentRepository.deleteTournament(req.params.tournamentId)
  .then(() => {
    res.redirect(303, '/tournaments')
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}

exports.showTournamentList = (req, res, next) => {
  TournamentRepository.getTournaments()
  .then(tournaments => {
    res.render('pages/tournaments/tournaments-list',
        {
          tournaments: tournaments,
          navLocation: 'tournament'
        });
  });
}

exports.showAddTournamentForm = (req, res, next) => {
  res.render('pages/tournaments/tournaments-form',
      {
        body: {},
        tournament: {},
        pageTitle: 'Add tournament',
        formMode: 'create',
        actionBtnLabel: 'Add tournament',
        cancelBtnLabel: 'Cancel',
        formAction: '/tournaments/add',
        navLocation: 'tournament',
        validationErrors: [],
        helper: formHelper
      });
}

exports.showEditTournamentForm = (req, res, next) => {
  TournamentRepository.getTournamentById(req.params.tournamentId)
  .then(tournament => {
    res.render('pages/tournaments/tournaments-form',
        {
          body: {},
          tournament: tournament,
          pageTitle: 'Edit tournament',
          formMode: 'edit',
          actionBtnLabel: 'Save changes',
          cancelBtnLabel: 'Cancel',
          formAction: '/tournaments/edit/' + req.params.tournamentId,
          navLocation: 'tournament',
          validationErrors: [],
          helper: formHelper
        });
  });
}

exports.showTournamentDetails = (req, res, next) => {
  TournamentRepository.getTournamentById(req.params.tournamentId)
  .then(tournament => {
    res.render('pages/tournaments/tournaments-form',
        {
          body: {},
          tournament: tournament,
          pageTitle: 'Tournament details',
          formMode: 'details',
          actionBtnLabel: 'Edit tournament',
          cancelBtnLabel: 'Go back',
          formAction: '/tournaments/edit/',
          navLocation: 'tournament',
          validationErrors: [],
          helper: formHelper
        });
  });
}