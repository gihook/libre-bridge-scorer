const express = require('express');

const router = express.Router();

router.get('/tournament/rounds/:type', (request, response) => {
    let tournamentType = request.params['type'];
    const rounds = require('../../../data/tournament-definitions/howell4-28.json');

    response.send(rounds);
});

module.exports = router;
