const express = require('express');
const router = express.Router();
const tournamentsController = require('../controllers/tournamentsController');

router.get('/', tournamentsController.showTournamentList);
router.get('/add', tournamentsController.showAddTournamentForm);
router.get('/edit/:tournamentId', tournamentsController.showEditTournamentForm);
router.get('/details/:tournamentId', tournamentsController.showTournamentDetails);
router.post('/add', tournamentsController.addTournament);
router.post('/edit/:tournamentId', tournamentsController.updateTournament);
router.get('/delete/:tournamentId', tournamentsController.deleteTournament);

module.exports = router;