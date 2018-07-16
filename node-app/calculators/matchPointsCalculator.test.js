const mpCalculator = require('./matchPointsCalculator');

const calculateMpsForSingleBoard = mpCalculator.calculateMpsForSingleBoard
const calculateMps = mpCalculator.calculateMps

describe('matchPointsCalculator test', () => {
    it('should calculate MPs for single entry', () => {
        let boardResults = [
            { score: 420, nsMps: 3, ewMps: 1 },
            { score: 170, nsMps: 0, ewMps: 4 },
            { score: 420, nsMps: 3, ewMps: 1 },
        ]
        let scores = boardResults.map(x => x.score)

        for (let i = 0; i < boardResults.length; i++) {
            result = calculateMps(scores, i)
            expect(result).toBe(boardResults[i].nsMps)
        }
    })

    it('should correctly calculate results for single board', () => {
        let boardResults = [
            { score: 420, nsMps: 3, ewMps: 1 },
            { score: 170, nsMps: 0, ewMps: 4 },
            { score: 420, nsMps: 3, ewMps: 1 },
        ]
        let results = calculateMpsForSingleBoard(boardResults.map(x => {
            return {
                score: x.score
            }
        }))

        expect(boardResults.length).toBe(results.length)

        for (let i = 0; i < boardResults.length; i++) {
            expect(results[i].nsMps).toBe(boardResults[i].nsMps)
            expect(results[i].ewMps).toBe(boardResults[i].ewMps)
        }
    })
})