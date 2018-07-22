const express = require('express');
const tournamentService = require('../../services/tournament-service');

const router = express.Router();

router.get('/tournament/:type/rounds', (request, response) => {
    let tournamentType = request.params['type'];
    const rounds = require('./data/tournament-definitions/howell4-28');

    response.send(rounds);
});

router.get('/tournament/:id', (request, response) => {
    let id = request.params['id'];
    tournamentService.getTournamentById(id)
        .then((model) => {
            response.status(200).send(model);
        })
        .catch(error => {
            response.status(404).send(error);
        });
});

router.post('/tournament', (request, response) => {
    let data = request.body;
    tournamentService.createNewTournament(data)
        .then((model) => {
            response.status(201).send(model);
        })
        .catch(error => {
            response.status(400).send(error);
        });
});

router.post('/tournament/:tournamentId/board', (request, response) => {
    let tournamentId = request.params['tournamentId'];
    let result = request.body;
    tournamentService.enterBoardResult(tournamentId, result)
        .then((model) => {
            response.status(201).send(model);
        })
        .catch(error => {
            response.status(400).send(error);
        });
});

module.exports = router;