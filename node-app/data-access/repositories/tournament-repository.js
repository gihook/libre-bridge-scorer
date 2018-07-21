const Tournament = require('../models/tournament');

const saveTournament = tournamentData => {
    let tournament = new Tournament(tournamentData);

    return new Promise((resolve, reject) => {
        tournament.save((error, model) => {
            if (error) reject(error);

            resolve(model);
        });
    });
}

const getTournamentById = id => {
    return new Promise((resolve, reject) => {
        Tournament.findById(id, (error, model) => {
            if (error) reject(error);

            resolve(model);
        });
    })
}

const enterBoardResult = (tournamentId, result) => {
    return new Promise((resolve, reject) => {
        Tournament.findByIdAndUpdate(tournamentId, {
            "$push": {
                "boards[0].results": {
                    result
                }
            }
        }, {
                upsert: true,
                safe: true,
                new: true
            }, (error, model) => {
                if (error) reject(error);

                resolve(model);
            });
    });
}

module.exports = {
    saveTournament,
    getTournamentById,
    enterBoardResult
}