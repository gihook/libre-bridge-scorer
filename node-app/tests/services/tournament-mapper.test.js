const tournamentMapper = require('../../services/tournament-mapper')
const serviceModel = require('../../data/tournaments/klubski-saleski.json')

describe('Tournament mapper:', () => {
    it('Should map type, numberOfBoards, maxMps', () => {
        let mongooseModel = tournamentMapper.translateToMongooseModel(serviceModel);

        expect(serviceModel.type).toBe(mongooseModel.type)
        expect(serviceModel.numberOfBoards).toBe(mongooseModel.numberOfBoards)
        expect(serviceModel.maxMps).toBe(mongooseModel.maxMps)
    })

    it('Should map pairs', () => {
        let mongooseModel = tournamentMapper.translateToMongooseModel(serviceModel);

        expect(serviceModel.pairs).toBe(mongooseModel.pairs)
    })

    it('Should map results for the firs pair', () => {
        let mongooseModel = tournamentMapper.translateToMongooseModel(serviceModel);

        let smResults = serviceModel.boards.filter(x => x.boardNumber == 1)[0].results;
        let mmResults = mongooseModel.results.filter(x => x.boardNumber == 1);

        let smFirstPairResult = smResults.filter(x => x.nsPair == 1 || x.ewPair == 1)[0]
        let mmFirstPairResult = mmResults.filter(x => x.nsPair == 1 || x.ewPair == 1)[0]


        expect(smFirstPairResult.nsPair).toBe(mmFirstPairResult.nsPair);
        expect(smFirstPairResult.ewPair).toBe(mmFirstPairResult.ewPair);
        expect(smFirstPairResult.contract).toBe(mmFirstPairResult.contract);
        expect(smFirstPairResult.declarer).toBe(mmFirstPairResult.declarer);
        expect(smFirstPairResult.score).toBe(mmFirstPairResult.score);
    })
})