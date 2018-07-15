const calculateMpsForSingleBoard = results => {
    let calculatedResults = []
    let totalMatchPoints = (results.length - 1) * 2
    let scores = results.map(x => x.score)

    for (let i = 0; i < scores.length; i++) {
        let nsMps = calculateMps(scores, i)
        calculatedResults.push({
            nsMps,
            ewMps: totalMatchPoints - nsMps
        })
    }

    return calculatedResults;
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
    calculateMps
}