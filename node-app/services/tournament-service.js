const tournamentRepository = require('../data-access/repositories/tournament-repository');
const tournamentDefinitionProvider = require('../providers/tournament-definition-provider');
const _ = require('underscore');

const createNewTournament = data => {
    const numberOfBoards = data.numberOfBoards;
    data.boards = [];
    data.results = [];

    for (let i = 1; i <= numberOfBoards; i++)
        data.boards.push({ boardNumber: i });

    const tournamentDefinition = tournamentDefinitionProvider.getDefinition(data.type);

    for (let table of tournamentDefinition.tables) {
        for (let round of table.rounds) {
            const boardNumbers = getBoardNumbers(round.boards);
            for (const boardNumber of boardNumbers) {
                data.results.push({
                    boardNumber: boardNumber,
                    nsPair: round.ns,
                    ewPair: round.ew,
                });
            }
        }
    }

    return tournamentRepository.saveTournament(data);
}

const getBoardNumbers = boardRange => {
    const regex = new RegExp('(.*)-(.*)'); // TODO make more precise regex
    const matches = regex.exec(boardRange);
    const lower = matches[1];
    const upper = matches[2];

    return _.range(Number(lower), Number(upper) + 1);
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