const express = require('express');
const router = express.Router();

const participationApiController = require('../../api/ParticipationAPI');

router.get('/', participationApiController.getParticipations);
router.get('/:participationId', participationApiController.getParticipationById);
router.post('/', participationApiController.createParticipation);
router.put('/:participationId', participationApiController.updateParticipation);
router.delete('/:participationId', participationApiController.deleteParticipation);

module.exports = router;