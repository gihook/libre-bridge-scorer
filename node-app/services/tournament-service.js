const tournamentRepository = require('../data-access/repositories/tournament-repository');
const tournamentDefinition = require('../data/tournament-definitions/howell4-28.json');

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

const enterBoardResult = (tournamentId, result) => {
    return tournamentRepository.enterBoardResult(tournamentId, result);
}

module.exports = {
    createNewTournament,
    getTournamentById,
    enterBoardResult
}