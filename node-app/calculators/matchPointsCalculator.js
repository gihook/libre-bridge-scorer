const calculateMpsForSingleBoard = board => {
    let calculatedResults = []
    let totalMatchPoints = (board.results.length - 1) * 2
    let scores = board.results.map(x => x.score)

    for (let i = 0; i < scores.length; i++) {
        let nsMps = calculateMps(scores, i)
        let entry = board.results[i]
        calculatedResults.push({
            nsPair: entry.nsPair,
            ewPair: entry.ewPair,
            contract: entry.contract,
            declarer: entry.declarer,
            score: entry.score,
            nsMps,
            ewMps: totalMatchPoints - nsMps
        })
    }

    return { boardNumber: board.boardNumber, results: calculatedResults };
}

const getMatchPoints = (board, pairId) => {
    let results = board.results
    let entries = results.filter(x => x.nsPair == pairId || x.ewPair == pairId);

    if (entries.length == 0) return 0
    let entry = entries[0]
    if (entry.nsPair == pairId) return entry.nsMps
    return entry.ewMps
}

const calculateMps = (scores, index) => {
    let pairScore = scores[index]
    let totalScore = scores.reduce((a, c) => {
        if (pairScore > c) return a + 2
        if (pairScore == c) return a + 1

        return a
    }, 0)
    let nsMps = totalScore - 1

    return nsMps
}

module.exports = {
    calculateMpsForSingleBoard,
    getMatchPoints,
    calculateMps
}