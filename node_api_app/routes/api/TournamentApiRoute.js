const express = require('express');
const router = express.Router();

const tournamentApiController = require('../../api/TournamentAPI');

router.get('/', tournamentApiController.getTournaments);
router.get('/:tournamentId', tournamentApiController.getTournamentById);
router.post('/', tournamentApiController.createTournament);
router.put('/:tournamentId', tournamentApiController.updateTournament);
router.delete('/:tournamentId', tournamentApiController.deleteTournament);

module.exports = router;