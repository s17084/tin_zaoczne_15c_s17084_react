const PlayerRepository = require('../repository/sequelize/PlayerRepository');
const formHelper = require('../public/js/formHelperFunctions');

manageErrors = (err) => {
  err.errors.forEach(e => {
    if (e.path.includes('licenseNumber') && e.type === 'unique violation') {
      e.message = "Such license already exists";
    }
    if (e.path.includes('email') && e.type === 'unique violation') {
      e.message = "Such email already exists";
    }
  });
}

exports.addPlayer = (req, res, next) => {
  PlayerRepository.createPlayer(req.body)
  .then(newObj => {
    const playerId = newObj._id;
    res.redirect(303, '/players/details/' + playerId)
  })
  .catch(err => {
    manageErrors(err);
    res.render('pages/players/players-form',
        {
          body: req.body,
          player: {},
          pageTitle: 'Add player',
          formMode: 'create',
          actionBtnLabel: 'Add player',
          cancelBtnLabel: 'Cancel',
          formAction: '/players/add',
          navLocation: 'player',
          validationErrors: err.errors,
          helper: formHelper
        });
  });
};

exports.updatePlayer = (req, res, next) => {
  PlayerRepository.updatePlayer(req.params.playerId, req.body)
  .then(() => {
    res.redirect(303, '/players/details/' + req.params.playerId);
  })
  .catch(err => {
    manageErrors(err);
    PlayerRepository.getPlayerById(req.params.playerId)
    .then(player => {
      res.render('pages/players/players-form',
          {
            body: req.body,
            player: player,
            pageTitle: 'Edit player',
            formMode: 'edit',
            actionBtnLabel: 'Save changes',
            cancelBtnLabel: 'Cancel',
            formAction: '/players/edit/' + req.params.playerId,
            navLocation: 'player',
            validationErrors: err.errors,
            helper: formHelper
          });
    });
  });
};

exports.deletePlayer = (req, res, next) => {
  const playerId = req.params.playerId;
  PlayerRepository.deletePlayer(playerId)
  .then(() => {
    res.redirect(303, '/players')
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.showPlayersList = (req, res, next) => {
  PlayerRepository.getPlayers()
  .then(players => {
    res.render('pages/players/players-list', {
      players: players,
      navLocation: 'player'
    })
  })
}

exports.showAddPlayerForm = (req, res, next) => {
  res.render('pages/players/players-form',
      {
        body: {},
        player: {},
        pageTitle: 'Add player',
        formMode: 'create',
        actionBtnLabel: 'Add player',
        cancelBtnLabel: 'Cancel',
        formAction: '/players/add',
        navLocation: 'player',
        validationErrors: [],
        helper: formHelper
      });
}

exports.showEditPlayerForm = (req, res, next) => {
  PlayerRepository.getPlayerById(req.params.playerId)
  .then(player => {
    res.render('pages/players/players-form',
        {
          body: {},
          player: player,
          pageTitle: 'Edit player',
          formMode: 'edit',
          actionBtnLabel: 'Save changes',
          cancelBtnLabel: 'Cancel',
          formAction: '/players/edit/' + req.params.playerId,
          navLocation: 'player',
          validationErrors: [],
          helper: formHelper
        });
  })
}

exports.showPlayerDetails = (req, res, next) => {
  PlayerRepository.getPlayerById(req.params.playerId)
  .then(player => {
        res.render('pages/players/players-form',
            {
              body: {},
              player: player,
              pageTitle: 'Player details',
              formMode: 'details',
              actionBtnLabel: 'Edit player',
              cancelBtnLabel: 'Go back',
              formAction: '/players/edit/',
              navLocation: 'player',
              validationErrors: [],
              helper: formHelper
            });
      }
  )
}