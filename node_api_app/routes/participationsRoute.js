const express = require('express');
const router = express.Router();
const participationsController = require(
    '../controllers/participationsController');

router.get('/', participationsController.showParticipationList);
router.get('/add', participationsController.showAddParticipationForm);
router.get('/edit/:participationId',
    participationsController.showEditParticipationForm);
router.get('/details/:participationId',
    participationsController.showParticipationDetails);
router.post('/add', participationsController.addParticipation);
router.post('/edit/:participationId',
    participationsController.editParticipation);
router.get('/delete/:participationId',
    participationsController.deleteParticipation);

module.exports = router;