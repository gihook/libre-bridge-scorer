const tournamentService = require('../services/tournament-service');

const getTournamentById = id => {
    return tournamentService.getTournamentById(id);
}

const createNewTournament = data => {
    return tournamentService.createNewTournament(data);
}

const enterResult = (tournamentId, result) => {
    return tournamentService.enterBoardResult(tournamentId, result);
}

const boardResults = (tournamentId, boardNumber) => {
    return tournamentService.boardResults(tournamentId, boardNumber);
}

module.exports = {
    getTournamentById, 
    createNewTournament,
    enterResult, 
    boardResults
}