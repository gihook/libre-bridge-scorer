const tournamentMapper = require('../../services/tournament-mapper')

const mockServiceModel = require('../../data/tournaments/mock-service-data.json')
const mockMongooseModel = require('../../data/tournaments/mock-mongoose-data.json');
const mongooseModel = tournamentMapper.translateToMongooseModel(mockServiceModel);

describe('Tournament mapper:', () => {
    it('translateToMongooseModel should map type, numberOfBoards, maxMps', () => {
        expect(mockServiceModel.type).toBe(mongooseModel.type)
        expect(mockServiceModel.numberOfBoards).toBe(mongooseModel.numberOfBoards)
        expect(mockServiceModel.maxMps).toBe(mongooseModel.maxMps)
    })

    it('translateToMongooseModel should map pairs', () => {
        expect(mockServiceModel.pairs).toEqual(mongooseModel.pairs)
    })

    it('translateToMongooseModel should map results for the first pair', () => {
        let smResults = mockServiceModel.boards.filter(x => x.boardNumber == 1)[0].results;
        let mmResults = mongooseModel.results.filter(x => x.boardNumber == 1);

        let smFirstPairResult = smResults.filter(x => x.nsPair == 1 || x.ewPair == 1)[0]
        let mmFirstPairResult = mmResults.filter(x => x.nsPair == 1 || x.ewPair == 1)[0]


        expect(smFirstPairResult.nsPair).toBe(mmFirstPairResult.nsPair);
        expect(smFirstPairResult.ewPair).toBe(mmFirstPairResult.ewPair);
        expect(smFirstPairResult.contract).toBe(mmFirstPairResult.contract);
        expect(smFirstPairResult.declarer).toBe(mmFirstPairResult.declarer);
        expect(smFirstPairResult.score).toBe(mmFirstPairResult.score);
    })

    it('translateToServiceModel should map type, numberOfBoards, maxMps', () => {
        let serviceModel = tournamentMapper.translateToServiceModel(mockMongooseModel);

        expect(serviceModel.type).toBe(mongooseModel.type)
        expect(serviceModel.numberOfBoards).toBe(mongooseModel.numberOfBoards)
        expect(serviceModel.maxMps).toBe(mongooseModel.maxMps)
    })


    it('translateToServiceModel should map pairs', () => {
        let serviceModel = tournamentMapper.translateToServiceModel(mockMongooseModel);

        expect(serviceModel.pairs).toEqual(mongooseModel.pairs)
    })

    it('translateToServiceModel should map results for the firs pair', () => {
        let serviceModel = tournamentMapper.translateToServiceModel(mockMongooseModel);

        let smResults = serviceModel.boards.filter(x => x.boardNumber == 1)[0].results;
        let mmResults = mockMongooseModel.results.filter(x => x.boardNumber == 1);

        let smFirstPairResult = smResults.filter(x => x.nsPair == 1 || x.ewPair == 1)[0]
        let mmFirstPairResult = mmResults.filter(x => x.nsPair == 1 || x.ewPair == 1)[0]


        expect(smFirstPairResult.nsPair).toBe(mmFirstPairResult.nsPair);
        expect(smFirstPairResult.ewPair).toBe(mmFirstPairResult.ewPair);
        expect(smFirstPairResult.contract).toBe(mmFirstPairResult.contract);
        expect(smFirstPairResult.declarer).toBe(mmFirstPairResult.declarer);
        expect(smFirstPairResult.score).toBe(mmFirstPairResult.score);
    })
})