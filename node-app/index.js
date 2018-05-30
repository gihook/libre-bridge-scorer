const ws = require('ws');
const http = require('http');
const express = require('express');
const testData = require('./boardMock');


let mappedTestData = testData.map(x => {
    let id = 1;
    x.results = x.results.map(r => {
        r.pair = id;
        id++;
        return r;
    })

    return x;
});

// let results = [
//     { pair: 1, score: 50 },
//     { pair: 2, score: -460 },
//     { pair: 3, score: -460 },
//     { pair: 4, score: 50 },
//     { pair: 5, score: -460 },
//     { pair: 6, score: -430 },
//     { pair: 7, score: -430 },
//     { pair: 8, score: -430 },
//     { pair: 9, score: -430 },
// ]

let testMockResults = [
    { pair: 1, score: -510 },
    { pair: 2, score: -1010 },
    { pair: 3, score: -1010 },
    { pair: 4, score: -1010 },
    { pair: 5, score: -1010 },
    { pair: 6, score: -1010 },
    { pair: 7, score: -1010 },
    { pair: 8, score: -980 },
    { pair: 9, score: -1510 },
]

function calculateMatchPoints(results, pairId) {
    let totalMps = (results.length - 1) * 2;
    let rowData = results.filter(r => r.pair === pairId)[0];
    let score = rowData.score;

    let points = 0;
    for (let result of results.filter(r => r.pair !== pairId)) {
        if (score > result.score) points += 2;
        if (score == result.score) points += 1;
    }

    let nsMps = points;
    let ewMps = totalMps - points;
    let nsPercentage = nsMps / totalMps;
    let ewPercentage = ewMps / totalMps;

    return { nsPair: rowData.nsPair, ewPair: rowData.ewPair, nsMps, ewMps, nsPercentage, ewPercentage };
}


function getResults(boardResults) {
    let resultsToReturn = [];

    for (let result of boardResults) {
        let score = calculateMatchPoints(boardResults, result.pair);
        resultsToReturn.push({
            nsPair: result.nsPair,
            ewPair: result.ewPair,
            score: result.score,
            nsPercentage: score.nsPercentage,
            ewPercentage: score.ewPercentage,
            nsMps: score.nsMps,
            ewMps: score.ewMps
        });
    }

    return resultsToReturn;
}

let resultsByBoard = testData.map(x => {
    return {
        board: x.boardNumber,
        results: getResults(x.results)
    }
});

let allPairs = resultsByBoard[0].results.reduce((a, x) => {
    a.push(x.nsPair);
    a.push(x.ewPair);
    return a;
}, []);

let completeResults = allPairs.map(name => {
    return resultsByBoard.map(x => x.results.filter(x => x.nsPair == name || x.ewPair == name)[0]);
    // return resultsByBoard.map(x => x.results.filter(x => x.nsPair == name || x.ewPair == name).reduce((a, x) => {
    //     if (x.nsPair == name) return a + x.nsMps;
    //     if (x.ewPair == name) return a + x.ewMps;
    // }));
})[0];


let name = allPairs[0];
let matchPoints = completeResults.reduce((a, x) => {
    if (x.nsPair == name) return a + x.nsMps;
    if (x.ewPair == name) return a + x.ewMps;
}, 0);

let percentage = matchPoints / (16 * 27);

let app = express();
let server = http.createServer(app);
app.use('/pairs', (request, response) => response.send(allPairs));
app.use('/results', (request, response) => response.send(resultsByBoard));
app.use('/test', (request, response) => response.send(completeResults));
app.use('/percentage', (request, response) => response.send({ name, percentage, matchPoints, perBoard: completeResults }));
app.use('/mock', (request, response) => {
    let id = 2;
    let res = calculateMatchPoints(testMockResults, id);
    response.send(res)
});
app.listen(3000);


// let webSocketServer = new ws.Server({ server });

// webSocketServer.on('connection', socket => {
//     socket.on('message', message => {
//         console.log('received: %s', message);
//         let m = JSON.parse(message);

//         let response = {
//             message: `Hello, you sent -> ${m}`,
//             data: testData.map(x => {
//                 return {
//                     board: x.boardNumber,
//                     results: getResults(x.results)
//                 }
//             })
//         };

//         socket.send(JSON.stringify(response));
//     });
// });

// server.listen(process.env.PORT || 8999, () => {
//     console.log(`Server started on port ${server.address().port} :)`);
// });