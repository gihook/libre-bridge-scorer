const toMongooseModel = serviceModel => {
    let resultsPerBoard = serviceModel.boards.map(board => {
        let boardResults = board.results;

        return boardResults.map(res => {
            return {
                boardNumber: board.boardNumber,
                nsPair: res.nsPair,
                ewPair: res.ewPair,
                contract: res.contract,
                declarer: res.declarer,
                score: res.score
            }
        })
    })

    let results = resultsPerBoard.reduce((previous, current) => {
        previous.push(...current);
        return previous;
    }, []);

    let mongooseModel = {
        type: serviceModel.type,
        numberOfBoards: serviceModel.numberOfBoards,
        maxMps: serviceModel.maxMps,
        pairs: serviceModel.pairs,
        boards: serviceModel.boards.map(b => {
            return {
                boardNumber: b.boardNumber
            }
        }),
        results: results
    };


    return mongooseModel;
}

const toServiceModel = mongooseModel => {
    let boards = mongooseModel.boards;
    let boardsWithResults = boards.map(board => {
        let results = mongooseModel.results.filter(r => r.boardNumber == board.boardNumber);
        board.results = results;

        return board;
    });

    let serviceModel = {
        type: mongooseModel.type,
        numberOfBoards: mongooseModel.numberOfBoards,
        maxMps: mongooseModel.maxMps,
        pairs: mongooseModel.pairs,
        boards: boardsWithResults
    };

    return serviceModel
}

module.exports = { 
    toMongooseModel,
    toServiceModel
}