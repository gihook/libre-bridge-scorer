let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let tournamentSchema = new Schema({
    type: String,
    numberOfBoards: Number,
    maxMps: Number,
    pairs: [{
        id: String,
        players: [String]
    }],
    boards: [{
        boardNumber: Number,
        north: String,
        south: String,
        east: String,
        west: String,
    }],
    results: [{
        boardNumber: Number,
        nsPair: Number,
        ewPair: Number,
        contract: String,
        declarer: String,
        score: Number,
        nsMps: Number,
        ewMps: Number
    }]
});

let Tournament = mongoose.model('Tournament', tournamentSchema)

module.exports = Tournament;