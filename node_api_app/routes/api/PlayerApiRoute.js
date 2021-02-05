const express = require('express');
const router = express.Router();
const {isAuth, isAdmin, isAdminOrPlayer} = require('../../middleware/isAuth');

const PlayerApi = require('../../api/PlayerAPI');

router.get('/', isAuth, PlayerApi.getPlayers);
router.get('/:playerId', isAuth, PlayerApi.getPlayerById);
router.post('/', isAdmin, PlayerApi.createPlayer);
router.put('/:playerId', isAdminOrPlayer, PlayerApi.updatePlayer);
router.delete('/:playerId', isAdmin, PlayerApi.deletePlayer);

module.exports = router;