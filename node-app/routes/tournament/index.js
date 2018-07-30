const express = require('express');
const c = require('../../util/controller-handler');
const tournmentController = require('../../controllers/tournament-controller');

const router = express.Router();

router.get('/tournament/:id', c(tournmentController.getTournamentById, request => [
    request.params['id']
]));

router.post('/tournament', c(tournmentController.createNewTournament, request => [
    request.body
]));

router.post('/tournament/:tournamentId/board', c(tournmentController.enterResult, request => [
    request.params['tournamentId'],
    request.body
]));

router.get('/tournament/:tournamentId/board/:boardNumber', c(tournmentController.boardResults, request => [
    request.params['tournamentId'], request.body
]));

module.exports = router;