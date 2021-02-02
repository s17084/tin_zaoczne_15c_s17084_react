const express = require('express');
const router = express.Router();

const PlayerApi = require('../../api/PlayerAPI');

router.get('/', PlayerApi.getPlayers);
router.get('/:playerId', PlayerApi.getPlayerById);
router.post('/', PlayerApi.createPlayer);
router.put('/:playerId', PlayerApi.updatePlayer);
router.delete('/:playerId', PlayerApi.deletePlayer);

module.exports = router;