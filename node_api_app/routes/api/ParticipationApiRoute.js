const express = require('express');
const router = express.Router();
const {isAuth, isAdmin, isAdminOrPlayer} = require('../../middleware/isAuth');

const ParticipationAPI = require('../../api/ParticipationAPI');

router.get('/', ParticipationAPI.getParticipations);
router.get('/:participationId', ParticipationAPI.getParticipationById);
router.post('/', ParticipationAPI.createParticipation);
router.put('/:participationId', ParticipationAPI.updateParticipation);
router.delete('/:participationId', ParticipationAPI.deleteParticipation);

module.exports = router;