const tournamentRepository = require('../data-access/repositories/tournament-repository');

const createNewTournament = data => {
    let numberOfBoards = data.numberOfBoards;
    data.boards = [];
    for (let i = 1; i <= numberOfBoards; i++)
        data.boards.push({ boardNumber: i });

    return tournamentRepository.saveTournament(data);
}

const getTournamentById = id => {
    return tournamentRepository.getTournamentById(id);
}

module.exports = { createNewTournament, getTournamentById }