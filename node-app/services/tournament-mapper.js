const translateToMongooseModel = serviceModel => {
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
        results: results
    };

    return mongooseModel;
}

module.exports = { 
    translateToMongooseModel
}