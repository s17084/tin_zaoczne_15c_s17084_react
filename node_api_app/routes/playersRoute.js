const express = require('express');
const router = express.Router();
const playersController = require('../controllers/playersController');

router.get('/', playersController.showPlayersList);
router.get('/add', playersController.showAddPlayerForm);
router.get('/edit/:playerId', playersController.showEditPlayerForm);
router.get('/details/:playerId', playersController.showPlayerDetails);
router.post('/add', playersController.addPlayer);
router.post('/edit/:playerId', playersController.updatePlayer);
router.get('/delete/:playerId', playersController.deletePlayer);

module.exports = router;